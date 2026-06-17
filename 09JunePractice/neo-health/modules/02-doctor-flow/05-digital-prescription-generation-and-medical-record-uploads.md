# Feature: Digital Prescription Generation and Medical Record Uploads

## 1. Feature Overview
This feature allows doctors to generate structured prescriptions and upload diagnostic records. Doctors enter patient medications, sign them digitally (saving them as read-only PDF assets), and upload clinical attachment files (up to 10MB) securely.

## 2. Acceptance Criteria
- AC1: Doctors can generate and digitally sign prescriptions containing medication name, dosage, and instructions.
- AC2: Signed prescriptions are saved as immutable PDF files and cannot be edited.
- AC3: Doctors can upload clinical medical records (PDF/images up to 10MB) to the patient's record store.

## 3. UI/UX Requirements
- **Visuals:** Form lists containing medication name, dosage frequency, and duration inputs. File upload drag-and-drop zone. Success badges once PDF is generated.
- **Accessibility:** Label inputs clearly. Ensure file upload status is read aloud by screen readers.
- **Interactions:** "Add Medication" button dynamically appends new input rows.

## 4. API Endpoints Required

### `POST /api/medical-records/prescriptions`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "patientId": "60d07e6180f12423d82a7f5a",
  "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Three times daily",
      "duration": "7 days"
    }
  ]
}
```
- **Response (HTTP 201 Created):**
```json
{
  "success": true,
  "data": {
    "recordId": "50f1a2b3c4d5",
    "type": "Prescription",
    "fileName": "prescription_70e1a2b3.pdf",
    "downloadUrl": "https://storage.googleapis.com/neo-health-records/prescriptions/50f1a2b3c4d5.pdf"
  }
}
```

### `POST /api/medical-records/upload`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:** Multipart/form-data containing files and metadata parameters
```json
{
  "patientId": "60d07e6180f12423d82a7f5a",
  "type": "Lab Report",
  "file": "BinaryFileBuffer"
}
```
- **Response (HTTP 201 Created):**
```json
{
  "success": true,
  "data": {
    "recordId": "50f1a2b3c4d6",
    "fileName": "blood_panel_doe.pdf",
    "type": "Lab Report"
  }
}
```

## 5. Data Models / Schema
- Leverages the `MedicalRecord` collection.

## 6. State Management Notes
- **Local State:** Array list of medications, file upload progress meters, inline confirmation state flags.

## 7. Edge Cases
- **Oversized Uploads:** Doctor attempts to upload a PDF larger than 10MB. Solved by placing file-size limit checks inside frontend dropzones and backend Multer middleware.
- **Editing Signed Prescription:** Attempting to alter a prescription after generation. Database fields are immutable, and PDF files are locked with write protection.

## 8. Dependencies on Other Features
- Feature 01: Registration and Login (authenticates doctor and verifies role).
- Feature 04: Video Consultation Host Session (provides active appointment context).

## 9. Testing Requirements
- Frontend integration tests: `src/tests/components/PrescriptionForm.test.jsx`
- Backend API tests: `src/tests/api/uploads.test.js`

## 10. Out of Scope for This Feature
- Auto-faxing prescriptions to external pharmacy stores.
- Patient-initiated upload tools (only doctors can upload files).
