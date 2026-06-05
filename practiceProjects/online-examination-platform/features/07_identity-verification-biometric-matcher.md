# Feature Specification: Identity Verification & Biometric Matcher

## Feature ID
`FEAT-007` (Priority 7)

## Purpose
Secures the examination process against impersonation by scanning the candidate's government ID, capturing a live selfie, extracting facial vectors, and running verification checks before exam entry.

## User Stories
* **US-01-01:** As a Candidate, I want the system to register my facial biometrics using my webcam before the exam so that the system can confirm I am the person taking the test.
* **US-01-02:** As a Candidate, I want to scan my government-issued photo ID card so that the system can match my registration data.

## Functional Requirements
1. **FR-7.1: Selfie Capture & Face Extractor:** Crop and capture the candidate's face from the webcam stream. Extract face coordinates and generate a 512-dimensional vector embedding.
2. **FR-7.2: ID Card Document Scanner:** Scan ID document using OCR to extract user's name, expiration date, and ID number. Crop the ID portrait image automatically.
3. **FR-7.3: Biometric Matcher Engine:** Compare the live selfie vector with the cropped ID portrait vector. Calculate a similarity percentage score.
4. **FR-7.4: Verification Decision Logger:** Approve if match similarity $\ge 85\%$ ($BRL-001$). If match is $<85\%$ or OCR name matching fails, route candidate to the manual approval queue.

## Validation Rules
1. **VAL-7.1:** The captured selfie must pass facial liveliness checks (e.g. request candidate blink or look at a specific dot) to prevent presentation attacks using photos/videos.
2. **VAL-7.2:** The ID expiration date extracted by OCR must be in the future.
3. **VAL-7.3:** The candidate's name parsed from the ID card must match the registered user account name by a Jaro-Winkler distance metric of $\ge 0.88$.

## Edge Cases
1. **Name Mismatches from OCR:** Candidates with middle names omitted or suffixes in their registration details. Allow manual correction with validation checks, or direct escalation to a live proctor for override.
2. **Poor Illumination during Selfie Capture:** If ambient lighting is low, display tips on-screen (e.g. "Move to a brighter room" or "Ensure light is in front of you") and trigger capture again.
3. **Duplicate Biometrics:** If a candidate's biometric vector matches an existing session belonging to a *different* candidate, trigger a security lockout and alert system admins.

## Dependencies
* `FEAT-06` (System Pre-flight Readiness Check).

## API Requirements

### POST `/api/v1/auth/register-biometrics`
* **Description:** Uploads registration images to generate face match vectors.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>`
* **Request Payload:** Multi-part form-data
  * `selfie_image`: File binary
  * `id_image`: File binary
* **Response (200 OK):**
```json
{
  "status": "success",
  "biometric_token": "bio_tkn_8f93a20d4c",
  "match_confidence": 0.942,
  "verified": true,
  "details": {
    "name_matched": true,
    "id_valid": true
  }
}
```

## Database Impact
* **Entity:** `USER` & `EXAM_SESSION`
  * Updates `USER` table: writes `biometric_vector_hash` (secure cryptographic representation, not raw vectors).
  * Updates `EXAM_SESSION`: sets `identity_verified` status to true and logs verification score.

## UI Components
1. **Camera Framing Overlay:** Semi-transparent face-shaped oval outline on-screen ensuring correct head alignment.
2. **ID Target Guide:** Rectangular bounding box guide on webcam viewport to assist ID card alignment.
3. **Status Spinner/Verification results:** Animated transition showing OCR scanning, face alignment, biometric checking, and validation checks.

## Security Requirements
1. **SEC-7.1 (Privacy Compliance):** Raw images of candidate face and ID must be processed in volatile container memory and deleted immediately after vector extraction. Do not write raw images to permanent SQL database ($SEC-001$).
2. **SEC-7.2 (AES Encryption at Rest):** Extracted biometric vector coordinates must be stored in PostgreSQL using Column-Level Encryption (AES-GCM-256) with keys stored in AWS KMS.

## Acceptance Criteria
* **Scenario: Biometric Match Meets Threshold**
  * **Given** a candidate has completed hardware check,
  * **When** they scan their ID and capture a live selfie,
  * **And** the comparison confidence reports `92%` (greater than $85\%$),
  * **Then** the system marks the session as `identity_verified: true` and redirects to the exam portal.
* **Scenario: Low biometric similarity triggers proctor queue**
  * **Given** a candidate uploads a blurred ID card,
  * **When** the similarity confidence returns `62%`,
  * **Then** the portal halts, displaying: `"Identity match low. A Proctor has been notified to verify your identity. Please wait."`

## Definition of Done (DoD)
* [ ] Biometric matching accuracy validated against test mock sets.
* [ ] OCR data extraction verified on sample IDs.
* [ ] Biometric vector encryption confirmed at the DB layer.
* [ ] GDPR consent modal added to registration.
* [ ] Penetration testing confirms no raw photo bypasses exist.
