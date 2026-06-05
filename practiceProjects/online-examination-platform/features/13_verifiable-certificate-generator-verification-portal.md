# Feature Specification: Verifiable Certificate Generator & Verification Portal

## Feature ID
`FEAT-013` (Priority 13)

## Purpose
Builds and distributes tamper-proof PDF certificates to successful candidates and provides a public verification portal where third parties can confirm the authenticity of issued credentials.

## User Stories
* **US-07-01:** As a successful Candidate, I want to receive a digital certificate in PDF format featuring my exam score, credential ID, and a verification QR code.
* **US-07-02:** As a third-party Employer, I want to scan a certificate QR code or visit a public URL to verify that the certificate is authentic, issued by the system, and has not been altered.

## Functional Requirements
1. **FR-13.1: Cryptographic PDF Generator:** Programmatically assemble PDF certificates containing candidate metadata, completion dates, and a unique Credential UUID.
2. **FR-13.2: Digital Signature Builder:** Generate a SHA-256 hash of the certificate content and sign it using the platform's private key (RSA-2048 or ECDSA). Embed this signature within the PDF metadata block.
3. **FR-13.3: QR Code Generator:** Embed a high-contrast QR code on the certificate PDF. Scanning the QR code directs users to the public verification URL.
4. **FR-13.4: Public Verification Portal:** Provide a public, unauthenticated web portal that accepts a Credential UUID and displays the matching verification status and candidate details ($FR-702$).

## Validation Rules
1. **VAL-13.1:** Certificates are generated *only* if the final grade is $\ge$ the exam's passing score.
2. **VAL-13.2:** Public verification requests must return a `"Signature Valid"` status only if the signature hash matches the decrypted signature block.

## Edge Cases
1. **Revoked Certifications:** If a certificate is revoked (due to post-exam cheating discovery or administrative decisions), the database status must change to `revoked: true`. The verification portal must display a red warning: `"Warning: This credential was revoked on [Date]"`.
2. **Database Downtime Fallback:** If the database is offline, the verification portal can run client-side cryptographic check by letting the user upload their PDF, decrypting the embedded metadata block using the system's public key, and confirming hash consistency.
3. **Template Changes:** If an organization modifies its logo or templates, previously generated certificates must preserve their original design assets. Cache static certificate files permanently in S3.

## Dependencies
* `FEAT-12` (Double-Blind Essay Grading & Moderation Portal).

## API Requirements

### GET `/api/v1/certificates/{certificate_id}/download`
* **Description:** Downloads the signed PDF certificate document.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Candidate/Owner scope)
* **Response (200 OK):** File stream (`Content-Type: application/pdf`)

### GET `/api/v1/verify/{credential_id}`
* **Description:** Public route to verify certificate credentials. No authentication required.
* **Response (200 OK):**
```json
{
  "credential_id": "cert_772a-99cd3",
  "status": "active",
  "recipient_name": "Sarah Jenkins",
  "exam_title": "Biology Final",
  "score_achieved": 92.5,
  "issued_at": "2026-06-05T11:29:11Z",
  "issuer": "SecureExam Certification Body",
  "cryptographic_verification": "verified"
}
```

## Database Impact
* **Entity:** `CERTIFICATE`
  * Inserts record with columns `id` (UUID), `user_id`, `session_id`, `certificate_hash` (signed hash), `pdf_storage_url`, `issued_at`, and `is_revoked`.
  * Index on `certificate_hash` to handle public verification lookup queries.

## UI Components
1. **Certificate Viewer:** Modal containing inline PDF rendering (using PDF.js) and a download button on the candidate dashboard.
2. **Public Verification Page:** Clean, mobile-responsive portal displaying a card with verification details, issue dates, and signature verification status.

## Security Requirements
1. **SEC-13.1 (Key Management):** Private signing keys must be stored in AWS Key Management Service (KMS) or HSMs. Direct file system access to private keys is prohibited.
2. **SEC-13.2 (CORS Restrictions):** Limit CORS policies on public verification APIs to allow lookup requests from any origin, facilitating portal embedding on employer sites.

## Acceptance Criteria
* **Scenario: Verify Valid Certificate**
  * **Given** an employer scans a QR code from a candidate's PDF,
  * **When** they load the verification page,
  * **Then** the portal queries the signature, verifies it against the database, displays a green verified checkmark, and prints the candidate's name.
* **Scenario: Block Invalid Credential ID**
  * **Given** a visitor enters an invalid or altered credential ID,
  * **When** they submit the lookup form,
  * **Then** the page displays a red alert: `"Credential Not Found. Verify the ID number and try again."`

## Definition of Done (DoD)
* [ ] Cryptographic signing functions verified against public keys.
* [ ] PDF generation verified for layout consistency.
* [ ] Verification portal tested for mobile responsiveness and scan performance.
* [ ] Database models and indices implemented.
* [ ] Security and audit reviews approved.
