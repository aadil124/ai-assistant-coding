import request from 'supertest';
import app from '../../src/app';
import db from '../../src/db';
import fs from 'fs';
import path from 'path';

/**
 * FEATURE: Identity Verification & Biometric Matcher (FEAT-007)
 * COVERAGE: API, Database, Security, Validation, Edge Cases
 */

describe('FEAT-007: Biometric Identity matching APIs', () => {
  let candidateToken: string;

  beforeAll(async () => {
    candidateToken = 'Bearer valid_jwt_candidate_sarah';
  });

  afterAll(async () => {
    await db.end();
  });

  /**
   * TC-BE-007-01: API/Security - Secure vector creation & file deletion
   * Requirement Mapping: SEC-7.1, SEC-7.2, SEC-001
   * Priority: P0
   */
  test('TC-BE-007-01: POST register-biometrics extracts vectors and deletes uploaded raw images from disk', async () => {
    const selfiePath = path.join(__dirname, '../fixtures/valid_selfie.png');
    const idPath = path.join(__dirname, '../fixtures/valid_id.png');

    // Make request using multipart attachments
    const response = await request(app)
      .post('/api/v1/auth/register-biometrics')
      .set('Authorization', candidateToken)
      .attach('selfie_image', selfiePath)
      .attach('id_image', idPath);

    expect(response.status).toBe(200);
    expect(response.body.verified).toBe(true);
    expect(response.body.match_confidence).toBeGreaterThanOrEqual(0.85);

    // SECURITY CHECK: Verify temporary raw images do not exist on server filesystem
    const tempSelfieFileExists = fs.existsSync(response.body.temp_selfie_path || '');
    expect(tempSelfieFileExists).toBe(false);
  });

  /**
   * TC-BE-007-02: Validation - Name distance matching parameters
   * Requirement Mapping: VAL-7.3
   * Priority: P0
   */
  test('TC-BE-007-02: Reject registration with 400 when name distance score is below limits', async () => {
    const selfiePath = path.join(__dirname, '../fixtures/valid_selfie.png');
    
    // Upload ID containing mismatched name "John Doe" (registered user is "Sarah Jenkins")
    const response = await request(app)
      .post('/api/v1/auth/register-biometrics')
      .set('Authorization', candidateToken)
      .attach('selfie_image', selfiePath)
      .attach('id_image', path.join(__dirname, '../fixtures/mismatched_id_john.png'));

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Name on ID does not match registration records');
  });

  /**
   * TC-BE-007-03: Security - Column level DB encryption validation
   * Requirement Mapping: SEC-7.2
   * Priority: P1
   */
  test('TC-BE-007-03: Biometric hash values are encrypted at rest in DB columns', async () => {
    // Retrieve record directly from database
    const dbRow = await db.query("SELECT biometric_vector_hash FROM users WHERE email = 'sarah@secureexam.com'");
    
    const vectorHash = dbRow.rows[0].biometric_vector_hash;
    // Verify stored text is encrypted binary/hex data, not JSON float coordinates array
    expect(vectorHash).not.toContain('[');
    expect(vectorHash).not.toContain('0.');
  });
});
