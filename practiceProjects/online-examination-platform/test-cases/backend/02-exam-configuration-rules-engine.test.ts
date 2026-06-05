import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';

/**
 * FEATURE: Exam Configuration & Rules Engine (FEAT-002)
 * COVERAGE: API, Database, Security, Validation, Edge Cases
 */

describe('FEAT-002: Exam Configuration API & Database Integrations', () => {
  let examinerToken: string;

  beforeAll(async () => {
    examinerToken = 'Bearer valid_jwt_examiner_token';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-002-01: Validation - Block invalid start/end window timestamps
   * Requirement Mapping: VAL-2.3
   * Priority: P0
   */
  test('TC-BE-002-01: Reject exam configuration with start date in the past', async () => {
    const pastDate = new Date(Date.now() - 3600000).toISOString(); // 1 hour ago
    const futureDate = new Date(Date.now() + 86400000).toISOString(); // 1 day future

    const response = await request(app)
      .post('/api/v1/exams')
      .set('Authorization', examinerToken)
      .send({
        title: 'Past Start Window Test',
        duration_minutes: 60,
        pass_threshold_percent: 50,
        start_window: pastDate,
        end_window: futureDate,
        navigation_mode: 'free',
        randomize_options: true,
        rules: []
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Start window must be in the future');
  });

  /**
   * TC-BE-002-02: Validation - Rule constraints checking
   * Requirement Mapping: VAL-2.4
   * Priority: P0
   */
  test('TC-BE-002-02: Return error 400 when dynamic pool size request fails entropy limits', async () => {
    // Algebra tag contains exactly 10 questions in bank
    // Requesting 6 questions violates the "pool size must be <= 50% of available questions" rule (meaning max 5 allowed)
    const response = await request(app)
      .post('/api/v1/exams')
      .set('Authorization', examinerToken)
      .send({
        title: 'Entropy Violation Exam',
        duration_minutes: 60,
        pass_threshold_percent: 50,
        start_window: new Date(Date.now() + 86400000).toISOString(),
        end_window: new Date(Date.now() + 172800000).toISOString(),
        navigation_mode: 'free',
        randomize_options: true,
        rules: [
          {
            pool_type: 'dynamic',
            tag: 'Algebra',
            difficulty: 'Medium',
            count: 6 // Violates entropy limit (6/10 = 60% > 50%)
          }
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('exceeds allowed entropy threshold of 50%');
  });

  /**
   * TC-BE-002-03: Database - JSONB mapping verify
   * Requirement Mapping: FR-2.1
   * Priority: P1
   */
  test('TC-BE-002-03: Successfully save custom configurations into JSONB column in postgres', async () => {
    const payload = {
      title: 'Postgres JSONB Integration Test',
      duration_minutes: 45,
      pass_threshold_percent: 60,
      start_window: new Date(Date.now() + 86400000).toISOString(),
      end_window: new Date(Date.now() + 172800000).toISOString(),
      navigation_mode: 'sequential',
      randomize_options: true,
      rules: []
    };

    const response = await request(app)
      .post('/api/v1/exams')
      .set('Authorization', examinerToken)
      .send(payload);

    expect(response.status).toBe(201);
    const examId = response.body.exam_id;

    // Direct Database check
    const queryResult = await db.query('SELECT duration_minutes, lockdown_config FROM exams WHERE id = $1', [examId]);
    expect(queryResult.rows[0].duration_minutes).toBe(45);
    expect(queryResult.rows[0].lockdown_config.navigation_mode).toBe('sequential');
    expect(queryResult.rows[0].lockdown_config.randomize_options).toBe(true);
  });

  /**
   * TC-BE-002-04: Edge Case - Exam scheduling window overlap hard close
   * Requirement Mapping: FR-2.1
   * Priority: P2
   */
  test('TC-BE-002-04: Enforce exam window end date constraint when session expires early', async () => {
    // Pre-seeded exam ending in 10 minutes, but duration config is 60 minutes
    const examId = 'ex_closing_soon_uuid';
    
    // Call GET session to simulate candidate loading exam
    const response = await request(app)
      .get(`/api/v1/exams/${examId}/session`)
      .set('Authorization', 'Bearer valid_jwt_candidate_token');

    expect(response.status).toBe(200);
    // Validate session duration returned is restricted to remaining validity window time (600 seconds, not 3600)
    expect(response.body.time_remaining_seconds).toBeLessThanOrEqual(600);
  });
});
