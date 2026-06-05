import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: Verifiable Certificate Generator & Verification Portal (FEAT-013)
 * COVERAGE: API, Database, Security, Edge Cases
 */

describe('FEAT-013: Certificate Generation and Signature Verification APIs', () => {
  let candidateToken: string;

  beforeAll(async () => {
    candidateToken = 'Bearer valid_jwt_candidate_sarah';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-013-01: Validation - Passing mark verification
   * Requirement Mapping: VAL-13.1
   * Priority: P0
   */
  test('TC-BE-013-01: Reject certificate download request if exam score is below passing threshold', async () => {
    // Session 999 belongs to failed exam attempts (Score: 40/100, Pass threshold: 70/100)
    const sessionId = 'sess_failed_exam_attempt_uuid';
    
    await db.query(
      "INSERT INTO exam_sessions (id, user_id, exam_id, status, total_score) VALUES ($1, 'usr_candidate_id', 'ex_biology_final_uuid', 'submitted', 40)",
      [sessionId]
    );

    const response = await request(app)
      .get(`/api/v1/certificates/sess_${sessionId}/download`)
      .set('Authorization', candidateToken);

    expect(response.status).toBe(403);
    expect(response.body.error).toContain('Certificate not generated. Score below passing threshold');
  });

  /**
   * TC-BE-013-02: API/Database - Public verification check
   * Requirement Mapping: FR-13.2, FR-13.4, VAL-13.2
   * Priority: P0
   */
  test('TC-BE-013-02: GET verify/{credential_id} returns verification details matching database records', async () => {
    const credId = 'cert_772a-99cd3';

    // Insert cert record into DB
    await db.query(
      "INSERT INTO certificates (id, session_id, user_id, certificate_hash, is_revoked) VALUES ($1, 'sess_882a-bc923', 'usr_sarah_id', 'cryptographic_hash_sig_val', false)",
      [credId]
    );

    const response = await request(app)
      .get(`/api/v1/verify/${credId}`);

    expect(response.status).toBe(200);
    expect(response.body.credential_id).toBe(credId);
    expect(response.body.status).toBe('active');
    expect(response.body.cryptographic_verification).toBe('verified');
  });

  /**
   * TC-BE-013-03: Edge Case - Certificate Revoked state check
   * Requirement Mapping: FR-13.4
   * Priority: P1
   */
  test('TC-BE-013-03: GET verify/{credential_id} returns status revoked when is_revoked equals true in database', async () => {
    const credId = 'cert_revoked_test_uuid';

    // Insert revoked cert record into DB
    await db.query(
      "INSERT INTO certificates (id, session_id, user_id, certificate_hash, is_revoked) VALUES ($1, 'sess_revoked_session', 'usr_sarah_id', 'cryptographic_hash_sig_val_rev', true)",
      [credId]
    );

    const response = await request(app)
      .get(`/api/v1/verify/${credId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('revoked');
    expect(response.body.cryptographic_verification).toBe('verified'); // Signature is still mathematically valid
  });
});
