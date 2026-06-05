import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';
import path from 'path';

/**
 * FEATURE: Visual & Audio AI Proctoring Engine (FEAT-009)
 * COVERAGE: API, Database, Security, Validation, Edge Cases
 */

describe('FEAT-009: AI Proctoring Media Engine API tests', () => {
  let candidateToken: string;

  beforeAll(async () => {
    candidateToken = 'Bearer valid_jwt_candidate_sarah';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-009-01: API/Database - Upload WebM Video Chunk
   * Requirement Mapping: FR-9.1, FR-9.3
   * Priority: P0
   */
  test('TC-BE-009-01: POST media-chunk uploads WebM file, processes AI, and logs audio transcript anomalies', async () => {
    const sessionId = 'sess_882a-bc923';
    const chunkPath = path.join(__dirname, '../fixtures/audio_talking_spike.webm');

    const response = await request(app)
      .post(`/api/v1/proctor/session/${sessionId}/media-chunk`)
      .set('Authorization', candidateToken)
      .attach('video_chunk', chunkPath)
      .field('sequence', 12);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('received');
    expect(response.body.anomalies_detected.length).toBeGreaterThan(0);
    
    // Verify transcription matched speech
    const anomalyObj = response.body.anomalies_detected[0];
    expect(anomalyObj.type).toBe('TALKING');
    expect(anomalyObj.transcript).toContain('answer');

    // Database check: Verify anomaly is written to proctoring_logs table
    const dbLog = await db.query(
      'SELECT anomaly_type, media_reference_url FROM proctoring_logs WHERE session_id = $1 AND anomaly_type = $2',
      [sessionId, 'TALKING']
    );
    expect(dbLog.rows.length).toBeGreaterThan(0);
    expect(dbLog.rows[0].media_reference_url).toContain('secureexam-s3');
  });

  /**
   * TC-BE-009-02: Security - Private S3 URL verification
   * Requirement Mapping: SEC-9.1, SEC-003
   * Priority: P0
   */
  test('TC-BE-009-02: Verify stored media references yield time-limited signed S3 URLs rather than public endpoints', async () => {
    const sessionId = 'sess_882a-bc923';

    // Retrieve media reference URL from database
    const dbLog = await db.query(
      'SELECT media_reference_url FROM proctoring_logs WHERE session_id = $1 AND anomaly_type = $2 LIMIT 1',
      [sessionId, 'TALKING']
    );
    const mediaUrl = dbLog.rows[0].media_reference_url;

    // Check query params contain SAS token indicators (Signature, Expiry)
    expect(mediaUrl).toContain('Signature=');
    expect(mediaUrl).toContain('Expires=');
    
    // Try to access raw object URL without signing parameters (should return AccessDenied)
    const rawUrl = mediaUrl.split('?')[0];
    const rawResponse = await request(rawUrl).get('/');
    expect(rawResponse.status).toBe(403);
  });
});
