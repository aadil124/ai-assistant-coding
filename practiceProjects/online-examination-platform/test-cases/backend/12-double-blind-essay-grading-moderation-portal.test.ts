import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: Double-Blind Essay Grading & Moderation Portal (FEAT-012)
 * COVERAGE: API, Database, Security, Edge Cases
 */

describe('FEAT-012: Double-Blind Grading & Moderation APIs', () => {
  let graderAToken: string;
  let graderBToken: string;
  let moderatorToken: string;

  beforeAll(async () => {
    graderAToken = 'Bearer valid_jwt_grader_a_miller';
    graderBToken = 'Bearer valid_jwt_grader_b_jones';
    moderatorToken = 'Bearer valid_jwt_moderator_boss';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-012-01: Security - Double-Blind Score Isolation
   * Requirement Mapping: FR-12.2
   * Priority: P0
   */
  test('TC-BE-012-01: Query queue does not expose scores submitted by previous grader', async () => {
    const queueItemId = 'qi_99a82d-ef33';

    // Grader A submits their score first
    await request(app)
      .post('/api/v1/grading/submit')
      .set('Authorization', graderAToken)
      .send({
        queue_item_id: queueItemId,
        assigned_scores: [{ criteria: 'Accuracy', awarded: 8 }],
        feedback_notes: 'Grader A feedback notes'
      });

    // Grader B fetches the queue item
    const response = await request(app)
      .get('/api/v1/grading/queue')
      .set('Authorization', graderBToken);

    expect(response.status).toBe(200);
    
    // Check original response item does NOT leak Grader A score or feedback details
    const targetItem = response.body.queue_item_id === queueItemId ? response.body : null;
    if (targetItem) {
      expect(targetItem.previously_assigned_score).toBeUndefined();
      expect(targetItem.other_grader_notes).toBeUndefined();
    }
  });

  /**
   * TC-BE-012-02: Edge Case/Validation - Score Delta escalation
   * Requirement Mapping: FR-12.4, BRL-006
   * Priority: P0
   */
  test('TC-BE-012-02: Submitting grades with discrepancy > 15% marks session status as disputed and routes to moderator', async () => {
    const queueItemId = 'qi_disputed_grade_test';
    // Max points = 20. 15% discrepancy limit = 3 points.
    // Grader A gave 18 points. Grader B gives 12 points (Delta = 6 points = 30%)
    
    // Grader A submission
    await db.query(
      "INSERT INTO manual_grade_submissions (queue_item_id, grader_id, score) VALUES ($1, 'grader_a_id', 18)",
      [queueItemId]
    );

    // Grader B submits
    const response = await request(app)
      .post('/api/v1/grading/submit')
      .set('Authorization', graderBToken)
      .send({
        queue_item_id: queueItemId,
        assigned_scores: [{ criteria: 'Accuracy', awarded: 6 }, { criteria: 'Grammar', awarded: 6 }], // 12 total
        feedback_notes: 'Average work.'
      });

    expect(response.status).toBe(200);
    expect(response.body.is_disputed).toBe(true);

    // Verify database row status
    const dbRecord = await db.query('SELECT status FROM candidate_responses WHERE id = $1', [queueItemId]);
    expect(dbRecord.rows[0].status).toBe('Disputed');
  });

  /**
   * TC-BE-012-03: Functional - Moderator override scoring
   * Requirement Mapping: FR-12.4
   * Priority: P1
   */
  test('TC-BE-012-03: POST grading/arbitrate overrides both grader scores and finalizes candidate score', async () => {
    const queueItemId = 'qi_disputed_grade_test';

    const response = await request(app)
      .post('/api/v1/grading/arbitrate')
      .set('Authorization', moderatorToken)
      .send({
        queue_item_id: queueItemId,
        final_score: 15,
        moderator_notes: 'Resolution score'
      });

    expect(response.status).toBe(200);

    // Check final score written to candidate_responses table
    const dbRecord = await db.query(
      "SELECT awarded_score, status, graded_by FROM candidate_responses WHERE id = $1",
      [queueItemId]
    );
    expect(dbRecord.rows[0].awarded_score).toBe(15);
    expect(dbRecord.rows[0].status).toBe('graded_final');
    expect(dbRecord.rows[0].graded_by).toBe('moderator_boss');
  });
});
