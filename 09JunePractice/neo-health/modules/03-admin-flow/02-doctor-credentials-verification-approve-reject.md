# Feature: Doctor Credentials Verification (Approve/Reject)

## 1. Feature Overview
This feature manages doctor validation profiles. Admins review pending registrations, download submitted credentials documents (e.g. certificates, medical licenses), and execute verification decisions. Approval publishes profiles, whereas rejection hides profiles and triggers emails.

## 2. Acceptance Criteria
- AC1: Admins can view a list of all doctors with "Pending Verification" status and download their credentials files.
- AC2: Approving a doctor updates their status to "Verified" and makes their profile public in searches.
- AC3: Rejecting a doctor updates their status to "Rejected" and sends an automated notification email to the doctor.

## 3. UI/UX Requirements
- **Visuals:** Grid of verification item cards showing doctor name, license number, and a download button for the license file. Sidebar displaying "Approve" (green) and "Reject" (red) actions.
- **Accessibility:** Alert modals must contain appropriate focus traps. Add descriptive screen reader labels for download actions.
- **Interactions:** Dynamic status badge changes in real-time. Confirmation modal dialogs before submitting choices.

## 4. API Endpoints Required

### `GET /api/admin/doctors/pending`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "doctorId": "60d07e6180f12423d82a7f5b",
      "fullName": "Dr. Sarah Jenkins",
      "specialty": "Cardiologist",
      "licenseFileUrl": "https://storage.googleapis.com/neo-health-records/licenses/doc_license_909.pdf"
    }
  ]
}
```

### `POST /api/admin/doctors/:id/verify`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "status": "Verified" // or "Rejected"
}
```
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "message": "Doctor status updated to Verified successfully."
}
```

## 5. Data Models / Schema
- Modifies `DoctorProfile` collection (updating `isVerified: true` or `isVerified: false`).

## 6. State Management Notes
- **Local State:** Selected doctor registration items, active action triggers, confirmation modals toggles.
- **Async State:** Appends verified/rejected doctor lists items, and filters out the matching pending queues elements.

## 7. Edge Cases
- **Re-Verification Operations:** Admin attempts to verify an already verified profile. Backend controller validates:
  `profile.isVerified !== true`. If already verified, rejects duplicate updates.
- **Lost/Invalid License Links:** License file URL returns a broken link. Admin UI disables the approve button if link is malformed.

## 8. Dependencies on Other Features
- Feature 08: Doctor Profile Setup (creates the pending verification records).
- Feature 01: Registration and Login (authorizes admin status).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/VerificationPanel.test.jsx`
- Backend API tests: `src/tests/api/verification.test.js`

## 10. Out of Scope for This Feature
- Background checks automations via third-party licensing databases.
- Custom rejection comments.
