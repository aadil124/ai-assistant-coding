import request from 'supertest';
import app from '../../src/app'; // Mock Express app root
import db from '../../src/db';   // Database pool references

/**
 * FEATURE: Assessment Authoring & Question Bank (FEAT-001)
 * COVERAGE: API, Security, Database, Validation, Edge Cases
 */

describe('FEAT-001: Question Bank REST API Endpoint tests', () => {
  let examinerToken: string;
  let candidateToken: string;

  beforeAll(async () => {
    // Generate valid tokens with roles
    examinerToken = 'Bearer valid_jwt_examiner_token';
    candidateToken = 'Bearer valid_jwt_candidate_token';
  });

  afterAll(async () => {
    await db.end(); // Close DB pool
  });

  /**
   * TC-BE-001-01: Security - Block Candidate accessing examiner API
   * Requirement Mapping: SEC-1.1
   * Priority: P0
   */
  test('TC-BE-001-01: Reject POST question request when token holds Candidate role', async () => {
    const response = await request(app)
      .post('/api/v1/questions')
      .set('Authorization', candidateToken)
      .send({
        type: 'mcq',
        body: 'Find derivative of $x^3$',
        difficulty: 'Medium',
        points: 5
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toContain('Access denied');
  });

  /**
   * TC-BE-001-02: Validation - API Payload options limits checks
   * Requirement Mapping: VAL-1.1
   * Priority: P0
   */
  test('TC-BE-001-02: Return error 400 when options count is less than 2', async () => {
    const response = await request(app)
      .post('/api/v1/questions')
      .set('Authorization', examinerToken)
      .send({
        type: 'mcq',
        body: 'Validate options count',
        difficulty: 'Easy',
        points: 5,
        options: [
          { id: 'opt_1', text: 'Single Option', is_correct: true } // Only 1
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('MCQ/MSQ must contain at least 2 options');
  });

  /**
   * TC-BE-001-03: Security - Input sanitation and XSS block validation
   * Requirement Mapping: SEC-1.2
   * Priority: P1
   */
  test('TC-BE-001-03: Strip malicious script elements from question body inputs', async () => {
    const maliciousInput = 'What is cellular respiration? <script>alert("XSS")</script>';
    const response = await request(app)
      .post('/api/v1/questions')
      .set('Authorization', examinerToken)
      .send({
        type: 'essay',
        body: maliciousInput,
        difficulty: 'Medium',
        points: 10
      });

    expect(response.status).toBe(201);
    
    // Verify sanitized body is written to the database
    const savedQuestion = await db.query('SELECT body FROM questions WHERE id = $1', [response.body.question_id]);
    expect(savedQuestion.rows[0].body).not.toContain('<script>');
    expect(savedQuestion.rows[0].body).toContain('What is cellular respiration?');
  });

  /**
   * TC-BE-001-04: Database - Soft delete validation
   * Requirement Mapping: FR-1.1
   * Priority: P1
   */
  test('TC-BE-001-04: DELETE sets is_deleted flag true without removing database row', async () => {
    // Insert a temp question
    const qInsert = await db.query(
      "INSERT INTO questions (type, body, points) VALUES ('essay', 'Delete Check', 5) RETURNING id"
    );
    const qId = qInsert.rows[0].id;

    const response = await request(app)
      .delete(`/api/v1/questions/${qId}`)
      .set('Authorization', examinerToken);

    expect(response.status).toBe(200);

    // Verify row still exists but has is_deleted flag true
    const dbRecord = await db.query('SELECT is_deleted FROM questions WHERE id = $1', [qId]);
    expect(dbRecord.rows[0].is_deleted).toBe(true);
  });

  /**
   * TC-BE-001-05: Edge Case - Versioning on active exam item modification
   * Requirement Mapping: FR-1.1
   * Priority: P2
   */
  test('TC-BE-001-05: Modifying an assigned question clones it and updates version count', async () => {
    // Insert question assigned to active exam
    const questionId = 'q_active_assigned_uuid'; // Pre-seeded
    
    const response = await request(app)
      .put(`/api/v1/questions/${questionId}`)
      .set('Authorization', examinerToken)
      .send({
        type: 'mcq',
        body: 'Updated text for assigned question',
        points: 5,
        options: [
          { id: 'opt_1', text: 'Updated option', is_correct: true },
          { id: 'opt_2', text: 'Option 2', is_correct: false }
        ]
      });

    expect(response.status).toBe(200);
    // Verify original question remains unchanged, and new version (clone) has been made
    const origQuery = await db.query('SELECT version FROM questions WHERE id = $1', [questionId]);
    expect(origQuery.rows[0].version).toBe(1);

    const newQuery = await db.query('SELECT version FROM questions WHERE body = $1', ['Updated text for assigned question']);
    expect(newQuery.rows.length).toBe(1);
    expect(newQuery.rows[0].version).toBe(2);
  });
});
