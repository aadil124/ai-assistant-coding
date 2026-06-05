import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: Candidate Exam Workspace UI (FEAT-003)
 * COVERAGE: API, Database, Security, Edge Cases
 */

describe('FEAT-003: Candidate Workspace Sessions API', () => {
  let candidateToken: string;

  beforeAll(async () => {
    candidateToken = 'Bearer valid_jwt_candidate_sarah';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-003-01: API - Retrieve Sanitized Exam Questions
   * Requirement Mapping: FR-3.2
   * Priority: P0
   */
  test('TC-BE-003-01: GET session returns active questions with correct answers omitted', async () => {
    const examId = 'ex_biology_final_uuid';

    const response = await request(app)
      .get(`/api/v1/exams/${examId}/session`)
      .set('Authorization', candidateToken);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('session_id');
    expect(response.body.questions.length).toBeGreaterThan(0);
    
    // SECURITY check: Ensure answers/rubrics are NOT exposed in client response
    const questionObj = response.body.questions[0];
    expect(questionObj.correct_answers).toBeUndefined();
    expect(questionObj.rubric_notes).toBeUndefined();
  });

  /**
   * TC-BE-003-02: API/Database - Invalidate session on final submission
   * Requirement Mapping: FR-3.1
   * Priority: P0
   */
  test('TC-BE-003-02: POST submit finalizes exam session status in database', async () => {
    const sessionId = 'sess_temp_verify_submission_uuid';

    // Insert active session first
    await db.query(
      "INSERT INTO exam_sessions (id, user_id, exam_id, status) VALUES ($1, 'usr_candidate_id', 'ex_biology_final_uuid', 'active')",
      [sessionId]
    );

    const response = await request(app)
      .post(`/api/v1/exams/session/${sessionId}/submit`)
      .set('Authorization', candidateToken);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');

    // Database check
    const query = await db.query('SELECT status, submitted_at FROM exam_sessions WHERE id = $1', [sessionId]);
    expect(query.rows[0].status).toBe('submitted');
    expect(query.rows[0].submitted_at).not.toBeNull();
  });

  /**
   * TC-BE-003-03: Security - Prevent unauthorized session retrieval
   * Requirement Mapping: SEC-3.2
   * Priority: P1
   */
  test('TC-BE-003-03: Reject session retrieval from mismatched candidate token', async () => {
    const intruderToken = 'Bearer valid_jwt_candidate_intruder';
    const examId = 'ex_biology_final_uuid';

    const response = await request(app)
      .get(`/api/v1/exams/${examId}/session`)
      .set('Authorization', intruderToken);

    expect(response.status).toBe(403);
  });
});
