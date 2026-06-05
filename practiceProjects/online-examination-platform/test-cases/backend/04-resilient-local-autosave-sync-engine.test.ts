import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';
import crypto from 'crypto';

/**
 * FEATURE: Resilient Local Autosave & Sync Engine (FEAT-004)
 * COVERAGE: API, Database, Security, Edge Cases
 */

describe('FEAT-004: Autosave Sync API validations', () => {
  let candidateToken: string;
  let sessionKey: string;

  beforeAll(async () => {
    candidateToken = 'Bearer valid_jwt_candidate_sarah';
    sessionKey = 'dynamic_session_salt_key_123'; // Pre-seeded
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-004-01: Security - Signed Sync verification
   * Requirement Mapping: SEC-4.1, SEC-4.2
   * Priority: P0
   */
  test('TC-BE-004-01: Accept sync payload when X-Sync-Signature HMAC matches content', async () => {
    const sessionId = 'sess_882a-bc923';
    const payload = {
      session_id: sessionId,
      client_timestamp: 1780658751,
      sequence_number: 10,
      answers: [
        {
          question_id: 'q_essay_respiration',
          answer_value: 'Cellular respiration details',
          modified_at: 1780658750
        }
      ]
    };

    // Calculate HMAC signature
    const hmac = crypto.createHmac('sha256', sessionKey);
    hmac.update(JSON.stringify(payload));
    const signature = hmac.digest('hex');

    const response = await request(app)
      .post(`/api/v1/exams/session/${sessionId}/sync`)
      .set('Authorization', candidateToken)
      .set('X-Sync-Signature', signature)
      .send(payload);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.last_synced_sequence).toBe(10);
  });

  /**
   * TC-BE-004-02: Security - Block modified sync payload
   * Requirement Mapping: SEC-004
   * Priority: P0
   */
  test('TC-BE-004-02: Reject sync request when payload body is altered (HMAC mismatch)', async () => {
    const sessionId = 'sess_882a-bc923';
    const payload = {
      session_id: sessionId,
      client_timestamp: 1780658751,
      sequence_number: 11,
      answers: [{ question_id: 'q_essay_respiration', answer_value: 'Legitimate value' }]
    };

    const hmac = crypto.createHmac('sha256', sessionKey);
    hmac.update(JSON.stringify(payload));
    const signature = hmac.digest('hex');

    // Alter payload value after calculating HMAC
    payload.answers[0].answer_value = 'Altered malicious value';

    const response = await request(app)
      .post(`/api/v1/exams/session/${sessionId}/sync`)
      .set('Authorization', candidateToken)
      .set('X-Sync-Signature', signature)
      .send(payload);

    expect(response.status).toBe(401);
    expect(response.body.error).toContain('Invalid HMAC signature');
  });

  /**
   * TC-BE-004-03: Edge Case - Sequence replay protection
   * Requirement Mapping: SEC-4.2
   * Priority: P1
   */
  test('TC-BE-004-03: Reject sync payload with duplicate or lower sequence number', async () => {
    const sessionId = 'sess_882a-bc923';
    const payload = {
      session_id: sessionId,
      client_timestamp: 1780658751,
      sequence_number: 5, // Already synced sequence 10 previously
      answers: [{ question_id: 'q_essay_respiration', answer_value: 'Late packet value' }]
    };

    const hmac = crypto.createHmac('sha256', sessionKey);
    hmac.update(JSON.stringify(payload));
    const signature = hmac.digest('hex');

    const response = await request(app)
      .post(`/api/v1/exams/session/${sessionId}/sync`)
      .set('Authorization', candidateToken)
      .set('X-Sync-Signature', signature)
      .send(payload);

    expect(response.status).toBe(409); // Conflict status
    expect(response.body.error).toContain('Out-of-order sequence');
  });
});
