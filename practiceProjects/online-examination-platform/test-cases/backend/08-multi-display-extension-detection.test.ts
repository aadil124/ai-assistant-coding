import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: Multi-Display & Extension Detection (FEAT-008)
 * COVERAGE: API, Database, Security
 */

describe('FEAT-008: Multi-Screen & Extension API Logs', () => {
  let candidateToken: string;

  beforeAll(async () => {
    candidateToken = 'Bearer valid_jwt_candidate_sarah';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-008-01: API/Database - Log Multi-Display Anomaly
   * Requirement Mapping: FR-8.1, FR-8.3
   * Priority: P0
   */
  test('TC-BE-008-01: POST log-anomaly registers SECONDARY_DISPLAY_DETECTED in database', async () => {
    const sessionId = 'sess_882a-bc923';

    const response = await request(app)
      .post(`/api/v1/proctor/session/${sessionId}/log-anomaly`)
      .set('Authorization', candidateToken)
      .send({
        anomaly_type: 'SECONDARY_DISPLAY_DETECTED',
        details: 'Screen count: 2 detected via Presentation API',
        timestamp: Math.floor(Date.now() / 1000)
      });

    expect(response.status).toBe(200);
    expect(response.body.should_lock_exam).toBe(true);

    // Database verification
    const dbRecord = await db.query(
      "SELECT details FROM proctoring_logs WHERE session_id = $1 AND anomaly_type = 'SECONDARY_DISPLAY_DETECTED'",
      [sessionId]
    );
    expect(dbRecord.rows[0].details).toContain('Screen count: 2');
  });

  /**
   * TC-BE-008-02: API/Database - Log Extension Mutation
   * Requirement Mapping: FR-8.4
   * Priority: P1
   */
  test('TC-BE-008-02: POST log-anomaly registers DOM_MUTATION_DETECTED in database', async () => {
    const sessionId = 'sess_882a-bc923';

    const response = await request(app)
      .post(`/api/v1/proctor/session/${sessionId}/log-anomaly`)
      .set('Authorization', candidateToken)
      .send({
        anomaly_type: 'DOM_MUTATION_DETECTED',
        details: 'Injected translation bubble detected in body',
        timestamp: Math.floor(Date.now() / 1000)
      });

    expect(response.status).toBe(200);
    expect(response.body.should_lock_exam).toBe(true);

    const dbRecord = await db.query(
      "SELECT details FROM proctoring_logs WHERE session_id = $1 AND anomaly_type = 'DOM_MUTATION_DETECTED'",
      [sessionId]
    );
    expect(dbRecord.rows[0].details).toContain('Injected translation bubble');
  });
});
