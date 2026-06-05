import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: System Pre-flight Readiness Check (FEAT-006)
 * COVERAGE: API, Database, Security, Edge Cases
 */

describe('FEAT-006: System Readiness API logs', () => {
  let candidateToken: string;

  beforeAll(async () => {
    candidateToken = 'Bearer valid_jwt_candidate_sarah';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-006-01: API/Database - Save System check status
   * Requirement Mapping: FR-6.1, FR-6.2
   * Priority: P0
   */
  test('TC-BE-006-01: POST session/readiness writes parameters to database and generates eligibility token', async () => {
    const examId = 'ex_biology_final_uuid';

    const response = await request(app)
      .post(`/api/v1/exams/${examId}/session/readiness`)
      .set('Authorization', candidateToken)
      .send({
        camera_passed: true,
        microphone_passed: true,
        network_upload_mbps: 1.82,
        screen_resolution: '1440x900',
        browser_agent: 'Chrome 120'
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.allowed_to_verify).toBe(true);
    expect(response.body).toHaveProperty('readiness_token');

    // Database verification: Verify session has readiness check stored
    const sessionDetails = await db.query(
      "SELECT readiness_status, readiness_details FROM exam_sessions WHERE user_id = 'usr_sarah_id' AND exam_id = $1",
      [examId]
    );
    expect(sessionDetails.rows[0].readiness_status).toBe(true);
    expect(sessionDetails.rows[0].readiness_details.screen_resolution).toBe('1440x900');
  });

  /**
   * TC-BE-006-02: Validation - Reject session pre-flight on bad network speeds
   * Requirement Mapping: VAL-6.2
   * Priority: P0
   */
  test('TC-BE-006-02: POST session/readiness rejects request with allowed_to_verify false if upload is < 1Mbps', async () => {
    const examId = 'ex_biology_final_uuid';

    const response = await request(app)
      .post(`/api/v1/exams/${examId}/session/readiness`)
      .set('Authorization', candidateToken)
      .send({
        camera_passed: true,
        microphone_passed: true,
        network_upload_mbps: 0.65, // Below 1.0 Mbps limit
        screen_resolution: '1440x900',
        browser_agent: 'Chrome 120'
      });

    expect(response.status).toBe(200);
    expect(response.body.allowed_to_verify).toBe(false);
    expect(response.body.readiness_token).toBeUndefined();
  });
});
