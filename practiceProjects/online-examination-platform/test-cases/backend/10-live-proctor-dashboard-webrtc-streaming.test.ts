import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: Live Proctor Dashboard & WebRTC Streaming (FEAT-010)
 * COVERAGE: API, Database, Security, Edge Cases
 */

describe('FEAT-010: Live Proctor Session Overrides REST API tests', () => {
  let proctorToken: string;

  beforeAll(async () => {
    proctorToken = 'Bearer valid_jwt_proctor_david';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-010-01: API/Security - Restrict endpoints to Proctor Role
   * Requirement Mapping: SEC-10.1
   * Priority: P0
   */
  test('TC-BE-010-01: Reject live sessions list query if token does not carry Proctor role privileges', async () => {
    const candidateToken = 'Bearer valid_jwt_candidate_sarah';

    const response = await request(app)
      .get('/api/v1/proctor/sessions')
      .set('Authorization', candidateToken);

    expect(response.status).toBe(403);
  });

  /**
   * TC-BE-010-02: API/Database - Force Terminate Exam Session
   * Requirement Mapping: FR-10.4, BRL-003
   * Priority: P0
   */
  test('TC-BE-010-02: POST session/terminate updates session status to invalidated and logs reason in database', async () => {
    const sessionId = 'sess_terminate_test_active_uuid';

    // Insert active test session
    await db.query(
      "INSERT INTO exam_sessions (id, user_id, exam_id, status) VALUES ($1, 'usr_candidate_id', 'ex_biology_final_uuid', 'active')",
      [sessionId]
    );

    const response = await request(app)
      .post(`/api/v1/proctor/session/${sessionId}/terminate`)
      .set('Authorization', proctorToken)
      .send({
        reason_code: 'SECONDARY_DEVICE_USE',
        notes: 'Terminated due to phone visibility'
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('terminated');

    // Database verification: Verify session is invalidated and audit reason is written
    const dbSession = await db.query('SELECT status, total_score FROM exam_sessions WHERE id = $1', [sessionId]);
    expect(dbSession.rows[0].status).toBe('invalidated');

    const dbLog = await db.query(
      "SELECT anomaly_type, details FROM proctoring_logs WHERE session_id = $1 AND anomaly_type = 'SESSION_TERMINATED_BY_PROCTOR'",
      [sessionId]
    );
    expect(dbLog.rows.length).toBeGreaterThan(0);
    expect(dbLog.rows[0].details).toContain('phone visibility');
  });
});
