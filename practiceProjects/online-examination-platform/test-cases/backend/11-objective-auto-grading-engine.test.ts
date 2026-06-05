import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: Objective Auto-Grading Engine (FEAT-011)
 * COVERAGE: API, Database, Validation, Edge Cases
 */

describe('FEAT-011: Server-Side Auto-Grading calculations', () => {
  
  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-011-01: Functional - MCQ Auto-Grading calculations
   * Requirement Mapping: FR-11.1
   * Priority: P0
   */
  test('TC-BE-011-01: Correctly calculate score and mark database record when MCQ answer is correct', async () => {
    const sessionId = 'sess_auto_grade_mcq_uuid';
    
    // Seed candidate correct answer choice in db
    await db.query(
      "INSERT INTO candidate_responses (session_id, question_id, candidate_answer) VALUES ($1, 'q_mcq_correct_option', 'opt_a')",
      [sessionId]
    );

    const response = await request(app)
      .post(`/api/v1/exams/session/${sessionId}/grade`)
      .set('Authorization', 'Bearer valid_jwt_system_internal');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('graded_provisional');

    // Database check: Verify response item has correct awarded_score (e.g. 5 points)
    const dbResponse = await db.query(
      "SELECT awarded_score, graded_by FROM candidate_responses WHERE session_id = $1 AND question_id = 'q_mcq_correct_option'",
      [sessionId]
    );
    expect(dbResponse.rows[0].awarded_score).toBe(5);
    expect(dbResponse.rows[0].graded_by).toBe('auto');
  });

  /**
   * TC-BE-011-02: Validation - Partial credit calculations with penalties
   * Requirement Mapping: FR-11.2, VAL-11.1
   * Priority: P0
   */
  test('TC-BE-011-02: Grade MSQ choice applying fractional points and negative option penalties', async () => {
    const sessionId = 'sess_auto_grade_msq_uuid';
    // MSQ Correct options are [A, B] (2 points each = 4 points total)
    // Candidate selected [A, C] (A is correct (+2), C is incorrect (-2))
    await db.query(
      "INSERT INTO candidate_responses (session_id, question_id, candidate_answer) VALUES ($1, 'q_msq_partial_options', '[\"opt_a\", \"opt_c\"]')",
      [sessionId]
    );

    const response = await request(app)
      .post(`/api/v1/exams/session/${sessionId}/grade`)
      .set('Authorization', 'Bearer valid_jwt_system_internal');

    expect(response.status).toBe(200);

    const dbResponse = await db.query(
      "SELECT awarded_score FROM candidate_responses WHERE session_id = $1 AND question_id = 'q_msq_partial_options'",
      [sessionId]
    );
    // Awarded score must equal 0 (2 - 2 = 0) and must not fall to negative values
    expect(dbResponse.rows[0].awarded_score).toBe(0);
  });

  /**
   * TC-BE-011-03: Edge Case - Normalizing Short Text spelling distance
   * Requirement Mapping: FR-11.3
   * Priority: P1
   */
  test('TC-BE-011-03: Award partial marks on short text response containing minor spelling typo', async () => {
    const sessionId = 'sess_auto_grade_text_typo_uuid';
    // Correct answer is "mitochondria". Candidate writes "mitocondria" (Levenshtein distance = 1)
    await db.query(
      "INSERT INTO candidate_responses (session_id, question_id, candidate_answer) VALUES ($1, 'q_short_text_spelling', 'mitocondria')",
      [sessionId]
    );

    const response = await request(app)
      .post(`/api/v1/exams/session/${sessionId}/grade`)
      .set('Authorization', 'Bearer valid_jwt_system_internal');

    expect(response.status).toBe(200);

    const dbResponse = await db.query(
      "SELECT awarded_score FROM candidate_responses WHERE session_id = $1 AND question_id = 'q_short_text_spelling'",
      [sessionId]
    );
    // Verified partial marks awarded (e.g. 50% of 10 points = 5 points)
    expect(dbResponse.rows[0].awarded_score).toBe(5);
  });
});
