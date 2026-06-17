# Feature: Doctor Registration, Verification, and Profile Setup

## 1. Feature Overview
This feature manages doctor onboarding. Doctors register by supplying specialty, biography, professional credentials, and consultation fee. Registrations remain in a "Pending Verification" state, preventing them from appearing in searches. Verified doctors can edit profile fields (bio, photo, and fees) via a secure update endpoint.

## 2. Acceptance Criteria
- AC1: Doctors can register by submitting name, specialty, bio, credentials/license files, and consultation fees.
- AC2: Registrations are set to a "Pending Verification" status and do not appear in search results until approved by an admin.
- AC3: Verified doctors can configure their profile bio, photo, and fees via `PUT /api/doctors/:id`, returning HTTP 200 on success.

## 3. UI/UX Requirements
- **Visuals:** Form panels splitting personal information from licensing documentation. Image crop tool for profile photos.
- **Accessibility:** Ensure file inputs have keyboard focus support, and error elements describe upload restrictions clearly.
- **Interactions:** PDF file upload dropzone showing progress bars. Inline update states for editing profile fields.

## 4. API Endpoints Required

### `POST /api/auth/register` (Combined registration endpoint, Doctor parameters)
- **Request Body:**
```json
{
  "email": "doctor.test@example.com",
  "password": "SecurePassword123!",
  "fullName": "Dr. Sarah Jenkins",
  "role": "doctor",
  "specialty": "Cardiologist",
  "biography": "Board-certified cardiologist with 10+ years of experience.",
  "consultationFee": 150.00,
  "licenseFileUrl": "https://storage.googleapis.com/neo-health-records/licenses/doc_license_909.pdf"
}
```
- **Response (HTTP 201 Created):**
```json
{
  "success": true,
  "data": {
    "userId": "60d07e6180f12423d82a7f5b",
    "email": "doctor.test@example.com",
    "fullName": "Dr. Sarah Jenkins",
    "role": "doctor",
    "isVerified": false,
    "specialty": "Cardiologist",
    "biography": "Board-certified cardiologist with 10+ years of experience.",
    "consultationFee": 150.00
  }
}
```

### `PUT /api/doctors/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "biography": "Updated cardiologist biography text.",
  "profilePhoto": "https://example.com/images/new-photo.jpg",
  "consultationFee": 160.00
}
```
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "doctorId": "60d07e6180f12423d82a7f5b",
    "biography": "Updated cardiologist biography text.",
    "profilePhoto": "https://example.com/images/new-photo.jpg",
    "consultationFee": 160.00
  }
}
```

## 5. Data Models / Schema
- Leverages the `User` and `DoctorProfile` collections described in previous specifications.
- Registration creates a `User` entry and an associated `DoctorProfile` document with `isVerified: false`.

## 6. State Management Notes
- **Local State:** File upload status indicators, profile editing toggle flags, input forms error arrays.
- **Global Context:** Auth Context updates to cache doctor validation state status.

## 7. Edge Cases
- **Unverified Access:** Attempting to call `PUT /api/doctors/:id` on an unverified doctor account. Restrict via middleware verifying that `profile.isVerified === true` before updating details.
- **Invalid Fee Ranges:** Doctor sets consultation fees below a minimum floor or above a ceiling limit. Enforce schema validations.

## 8. Dependencies on Other Features
- Feature 01: Registration and Login (base user session model).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/DoctorProfileSetup.test.jsx`
- Backend API tests: `src/tests/api/doctor_profile.test.js`

## 10. Out of Scope for This Feature
- Verification mechanics (moderated in Admin Flow).
- Bank payouts setup and direct debit verification.
