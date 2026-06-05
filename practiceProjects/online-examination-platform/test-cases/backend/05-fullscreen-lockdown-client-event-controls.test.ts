import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: Fullscreen Lockdown & Client Event Controls (FEAT-005)
 * COVERAGE: API, Database, Security, Edge Cases
 */

describe('FEAT-005: Fullscreen Anomaly Logs APIs', () => {
  let candidateToken: string;

  beforeAll(async () => {
    candidateToken = 'Bearer valid_jwt_candidate_sarah';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-005-01: API/Database - Log Fullscreen Exit Anomaly
   * Requirement Mapping: FR-5.3
   * Priority: P0
   */
  test('TC-BE-005-01: POST log-anomaly writes FULLSCREEN_EXIT to database and returns remaining warnings count', async () => {
    const sessionId = 'sess_882a-bc923';

    const response = await request(app)
      .post(`/api/v1/proctor/session/${sessionId}/log-anomaly`)
      .set('Authorization', candidateToken)
      .send({
        anomaly_type: 'FULLSCREEN_EXIT',
        details: 'User escaped fullscreen mode',
        timestamp: Math.floor(Date.now() / 1000)
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('anomaly_id');
    expect(response.body.remaining_warnings).toBeLessThanOrEqual(2);
    expect(response.body.should_terminate).toBe(false);

    // Database check
    const query = await db.query(
      'SELECT anomaly_type FROM proctoring_logs WHERE session_id = $1 AND anomaly_type = $2',
      [sessionId, 'FULLSCREEN_EXIT']
    );
    expect(query.rows.length).toBeGreaterThan(0);
  });

  /**
   * TC-BE-005-02: Edge Case - Exceed warning limits triggers session kill
   * Requirement Mapping: VAL-5.1
   * Priority: P0
   */
  test('TC-BE-005-02: Trigger session termination when warnings limit is exceeded on 4th POST log-anomaly', async () => {
    const sessionId = 'sess_warnings_exhausted_uuid';

    // Insert session with 3 pre-existing warnings in db
    await db.query(
      "INSERT INTO exam_sessions (id, user_id, exam_id, status) VALUES ($1, 'usr_candidate_id', 'ex_biology_final_uuid', 'active')",
      [sessionId]
    );
    for (let i = 0; i < 3; i++) {
      await db.query(
        "INSERT INTO proctoring_logs (session_id, anomaly_type, logged_at) VALUES ($1, 'FULLSCREEN_EXIT', NOW())",
        [sessionId]
      );
    }

    const response = await request(app)
      .post(`/api/v1/proctor/session/${sessionId}/log-anomaly`)
      .set('Authorization', candidateToken)
      .send({
        anomaly_type: 'FULLSCREEN_EXIT',
        details: 'User escaped fullscreen 4th time',
        timestamp: Math.floor(Date.now() / 1000)
      });

    expect(response.status).toBe(200);
    expect(response.body.should_terminate).toBe(true);
    expect(response.body.remaining_warnings).toBe(0);

    // Confirm session status is marked submitted or locked in db
    const query = await db.query('SELECT status FROM exam_sessions WHERE id = $1', [sessionId]);
    expect(query.rows[0].status).toBe('submitted');
  });
});
