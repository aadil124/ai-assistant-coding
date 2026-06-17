# Feature: Post-Consultation Prescription and Medical Records Access

## 1. Feature Overview
This feature allows patients to access clinical documentation associated with their profile. This includes viewing/downloading signed digital prescriptions and reviewing medical history files uploaded by their doctor.

## 2. Acceptance Criteria
- AC1: Patients can view and download signed digital prescriptions as read-only PDF files from their dashboard.
- AC2: Patients can view and download uploaded medical records associated with their profile.
- AC3: Accessing another patient's medical records or prescriptions must be blocked and return an HTTP 403 Forbidden status.

## 3. UI/UX Requirements
- **Visuals:** Grid-style list displaying document rows, categorizing files into "Prescriptions" vs "Medical Records".
- **Accessibility:** Ensure all document cards and lists have descriptive tab index sequences and alt attributes for visual asset indicators.
- **Interactions:** "Download" icon turns into a loading indicator while generating secure signed URLs, and returns to normal state once download starts.

## 4. API Endpoints Required

### `GET /api/medical-records`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
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
    }
  ]
}
```

### `GET /api/medical-records/:recordId/download`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "signedUrl": "https://storage.googleapis.com/neo-health-records/prescriptions/50f1a2b3c4d5.pdf?GoogleAccessId=service-account@test.iam.gserviceaccount.com&Expires=1612349278&Signature=signature_payload"
  }
}
```

## 5. Data Models / Schema

### `MedicalRecord` Collection (Mongoose Schema)
```javascript
const MedicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Prescription', 'Lab Report', 'Clinical Note'], required: true },
  fileName: { type: String, required: true },
  fileKey: { type: String, required: true } // Key in Cloud Storage bucket
}, { timestamps: true });
```

## 6. State Management Notes
- **Local State:** File list array, loading indicators, selected document filters (all, prescriptions, lab reports).
- **Redirection:** No external redirection, runs within patient dashboard layout container.

## 7. Edge Cases
- **Unauthorized ID Access:** Patient modifies the `recordId` parameter in the download API call to access files belonging to another patient. Solved by backend verification checking that:
  `record.patientId.toString() === req.user.userId`. If not a match, returns HTTP 403 Forbidden.
- **Link Expiry:** The signed URL expires after 5 minutes, preventing bookmarking and caching access leaks.

## 8. Dependencies on Other Features
- Feature 12: Digital Prescription Generation and Medical Record Uploads (required to create records).
- Feature 01: Registration and Login (to establish patient ID context).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/MedicalRecordsList.test.jsx`
- Backend API tests: `src/tests/api/records.test.js`

## 10. Out of Scope for This Feature
- Document search/categorization by custom folders.
- Patient-initiated file uploads.
