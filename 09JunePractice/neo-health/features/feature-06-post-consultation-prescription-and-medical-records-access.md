## Feature ID: 06
## Feature Name: Post-Consultation Prescription and Medical Records Access
## Module: Module 1: Patient Flow
## Description: Provides secure role-based access for patients to view and download their signed prescriptions and medical record attachments.

## User Story
As a patient, I want to view and download my digital prescriptions and uploaded clinical records from my dashboard so that I can refer to my clinical history and purchase medications.

## Acceptance Criteria
- AC1: Patients can view and download signed digital prescriptions as read-only PDF files from their dashboard.
- AC2: Patients can view and download uploaded medical records associated with their profile.
- AC3: Accessing another patient's medical records or prescriptions must be blocked and return an HTTP 403 Forbidden status.

## API Endpoints

### 1. Fetch Patient Medical History & Prescriptions
* **Method:** `GET`
* **Path:** `/api/medical-records`
* **Request Headers:**
  * `Authorization: Bearer <token>`
* **Success Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "recordId": "50f1a2b3c4d5",
      "type": "Prescription",
      "doctorName": "Dr. Sarah Jenkins",
      "date": "2026-06-11T09:30:00.000Z",
      "fileName": "prescription_20260611_doe.pdf",
      "downloadUrl": "https://storage.googleapis.com/neo-health-records/prescriptions/50f1a2b3c4d5.pdf"
    },
    {
      "recordId": "50f1a2b3c4d6",
      "type": "Lab Report",
      "doctorName": "Dr. Sarah Jenkins",
      "date": "2026-06-11T09:35:00.000Z",
      "fileName": "blood_panel_doe.pdf",
      "downloadUrl": "https://storage.googleapis.com/neo-health-records/reports/50f1a2b3c4d6.pdf"
    }
  ]
}
```

### 2. Fetch Single File Download URL (Secure Signature Access)
* **Method:** `GET`
* **Path:** `/api/medical-records/:recordId/download`
* **Request Headers:**
  * `Authorization: Bearer <token>`
* **Success Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "signedUrl": "https://storage.googleapis.com/neo-health-records/prescriptions/50f1a2b3c4d5.pdf?GoogleAccessId=service-account@test.iam.gserviceaccount.com&Expires=1612349278&Signature=signature_payload"
  }
}
```
* **Error Response - Unauthorized Record Access (HTTP 403 Forbidden):**
```json
{
  "success": false,
  "error": {
    "message": "Access denied: You do not have permission to access this medical document."
  }
}
```

## UI Components

### 1. `MedicalHistoryTab` (Container component)
* Content panel inside Patient Dashboard rendering lists of prescriptions and diagnostic files.

### 2. `PrescriptionCard` (Functional component)
* Card layout displaying date, doctor's name, diagnosis summary, list of prescribed medications, and a "Download Signed PDF" button.

### 3. `DiagnosticFileRow` (Functional component)
* File row listing document title, upload timestamp, size, and a download icon.

## State / Data Flow

1. **Dashboard Load:** Patient clicks the "Medical History" navigation item.
2. **API Fetch:** Client dispatches `GET /api/medical-records`.
3. **Authorization & Query Execution:**
   * Backend extracts `userId` from the JWT token.
   * Node controller queries the MongoDB Records collection via Mongoose 8 matching:
     `{ patientId: userId }`.
   * DB returns the list, and the controller maps secure static links, returning HTTP 200.
4. **File Download:**
   * Patient clicks "Download".
   * Client calls `/api/medical-records/:recordId/download`.
   * Backend verifies ownership. If verified, generates a secure, short-lived Cloud Storage signed URL (valid for 5 minutes) and returns it.
   * Client opens the URL to prompt native browser download.

## Edge Cases
* **ID Harvesting (Direct URL access):** An authenticated patient tries to access records by typing another patient's `recordId` directly into the path `/api/medical-records/other_user_id/download`. Prevented by checking the `patientId` associated with the requested `recordId` against the requester's `userId` decrypted from the JWT token, rejecting non-matches with HTTP 403.
* **Expired Signed URL Retry:** Patient attempts to click a saved download link after 5 minutes. Resolved because Cloud Storage automatically rejects expired token signatures. Patient must click "Download" again in the UI to generate a new signed URL.

## Dependencies
* Feature 12 (Prescription Generation and Record Uploads - which generates the files).
* Feature 01 (Registration and Login - to verify credentials and ownership).

## Out of Scope for This Feature
* **File Uploads by Patients:** Patients uploading self-collected clinical records (only doctors can upload).
* **Document Categorization/Folders:** Custom patient-defined folder structures.
