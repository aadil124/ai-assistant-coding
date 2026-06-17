# Neo-Health API Schema & Design Document

## 1. Overview
- **Base URL:** `/api/v1`
- **Versioning:** URL path-based versioning (`/v1`).
- **Authentication:** Stateless JSON Web Token (JWT) session-based authentication passed in the HTTP header.
- **Default Response Format:** All responses are returned in JSON format.
  * **Success Envelope:**
    ```json
    {
      "success": true,
      "data": {}
    }
    ```
  * **Error Envelope:**
    ```json
    {
      "success": false,
      "error": {
        "message": "Error details go here"
      }
    }
    ```

## 2. Authentication & Authorization

### Auth Flow Description
1. User (Patient or Doctor) registers through `POST /api/v1/auth/register`. The account is created. For doctors, `isVerified` defaults to `false`.
2. User authenticates via `POST /api/v1/auth/login`.
3. If successful, the server signs and returns a JWT token.
4. The client stores this token in local storage and includes it in all protected requests as `Authorization: Bearer <token>`.
5. Admins log in via `POST /api/v1/auth/admin/login` using dedicated backend credentials.
6. Server validates authorization claims using middleware `requireRole(['admin', 'doctor', 'patient'])`.

### Token Structure
Header:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
Payload:
```json
{
  "userId": "60d07e6180f12423d82a7f5a",
  "role": "patient",
  "iat": 1612345678,
  "exp": 1612349278
}
```

### Protected vs Public Routes
- **Public Routes:**
  * `POST /api/v1/auth/register`
  * `POST /api/v1/auth/login`
  * `POST /api/v1/auth/admin/login`
  * `POST /api/v1/payments/webhook`
- **Protected Routes (requires valid JWT):**
  * All other routes require an `Authorization` header containing a valid Bearer token.
  * Admin-only routes require the JWT payload role to be `admin`.
  * Doctor-only routes require the JWT payload role to be `doctor`.

## 3. Database Schema

### `User` Collection
- `_id`: ObjectId (Primary Key)
- `email`: String (Required, Unique, Lowercase, Indexed)
- `password`: String (Required, Hashed)
- `fullName`: String (Required)
- `role`: String (Required, Enum: `['patient', 'doctor', 'admin']`)
- `birthdate`: Date (Required only for `role === 'patient'`)
- `isSuspended`: Boolean (Required, Default: `false`)
- `createdAt`: Date
- `updatedAt`: Date

### `DoctorProfile` Collection
- `_id`: ObjectId (Primary Key)
- `userId`: ObjectId (Required, Ref: `User`, Unique, Indexed)
- `specialty`: String (Required, Indexed)
- `biography`: String (Required)
- `profilePhoto`: String (Required)
- `consultationFee`: Number (Required)
- `averageRating`: Number (Required, Default: `0`, Indexed)
- `reviewsCount`: Number (Required, Default: `0`)
- `isVerified`: Boolean (Required, Default: `false`, Indexed)
- `availableSlots`: Array
  * `slotId`: String (Required)
  * `start`: Date (Required)
  * `end`: Date (Required)
  * `status`: String (Required, Enum: `['Available', 'Locked', 'Booked']`, Default: `'Available'`)
- `createdAt`: Date
- `updatedAt`: Date

### `Appointment` Collection
- `_id`: ObjectId (Primary Key)
- `doctorId`: ObjectId (Required, Ref: `User`, Indexed)
- `patientId`: ObjectId (Required, Ref: `User`, Indexed)
- `slotId`: String (Required, Indexed)
- `status`: String (Required, Enum: `['Pending Payment', 'Confirmed', 'Cancelled', 'Completed', 'Refunded']`, Default: `'Pending Payment'`, Indexed)
- `expiresAt`: Date (Required, TTL index set for document deletion if pending payment)
- `createdAt`: Date
- `updatedAt`: Date

### `MedicalRecord` Collection
- `_id`: ObjectId (Primary Key)
- `patientId`: ObjectId (Required, Ref: `User`, Indexed)
- `doctorId`: ObjectId (Required, Ref: `User`, Indexed)
- `type`: String (Required, Enum: `['Prescription', 'Lab Report', 'Clinical Note']`)
- `fileName`: String (Required)
- `fileKey`: String (Required)
- `createdAt`: Date
- `updatedAt`: Date

### `Review` Collection
- `_id`: ObjectId (Primary Key)
- `appointmentId`: ObjectId (Required, Ref: `Appointment`, Unique, Indexed)
- `doctorId`: ObjectId (Required, Ref: `User`, Indexed)
- `patientId`: ObjectId (Required, Ref: `User`, Indexed)
- `rating`: Number (Required, Min: `1`, Max: `5`)
- `comment`: String (Required, Max length: `500`)
- `createdAt`: Date
- `updatedAt`: Date

### `AuditLog` Collection
- `_id`: ObjectId (Primary Key)
- `adminId`: ObjectId (Required, Ref: `User`, Indexed)
- `action`: String (Required)
- `targetId`: ObjectId (Required)
- `details`: String (Optional)
- `createdAt`: Date

### `Notification` Collection
- `_id`: ObjectId (Primary Key)
- `recipientId`: ObjectId (Required, Ref: `User`, Indexed)
- `title`: String (Required)
- `message`: String (Required)
- `read`: Boolean (Required, Default: `false`)
- `createdAt`: Date

---

## 4. API Endpoints

### Patient Flow Module

#### `POST /api/v1/auth/register`
- **Description:** Registers a new patient or doctor account.
- **Auth Required:** No
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  * `email` (String, Required): Valid email format
  * `password` (String, Required): Min 8 characters, alphanumeric
  * `fullName` (String, Required): User's name
  * `role` (String, Required): `patient` or `doctor`
  * `birthdate` (String, Required only if `role === 'patient'`): `YYYY-MM-DD`
  * `specialty` (String, Required only if `role === 'doctor'`)
  * `biography` (String, Required only if `role === 'doctor'`)
  * `consultationFee` (Number, Required only if `role === 'doctor'`)
  * `licenseFileUrl` (String, Required only if `role === 'doctor'`)
- **Success Response (HTTP 201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "userId": "60d07e6180f12423d82a7f5a",
      "email": "patient.test@example.com",
      "fullName": "John Doe",
      "role": "patient"
    }
  }
  ```
- **Error Responses:**
  * `400 Bad Request`: `{"success": false, "error": {"message": "Validation failed: 'email' must be valid."}}`
  * `409 Conflict`: `{"success": false, "error": {"message": "Email is already registered."}}`
- **Business Rules:**
  * Email must be unique.
  * Doctors are registered with `isVerified: false`.

#### `POST /api/v1/auth/login`
- **Description:** Log in to account and receive session token.
- **Auth Required:** No
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  * `email` (String, Required)
  * `password` (String, Required)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature",
      "user": {
        "userId": "60d07e6180f12423d82a7f5a",
        "email": "patient.test@example.com",
        "fullName": "John Doe",
        "role": "patient"
      }
    }
  }
  ```
- **Error Responses:**
  * `401 Unauthorized`: `{"success": false, "error": {"message": "Invalid email or password."}}`
- **Business Rules:**
  * Suspended accounts are blocked and return `403 Forbidden` with a "This account is suspended" message.

#### `GET /api/v1/doctors`
- **Description:** Search and filter verified doctor profiles.
- **Auth Required:** Yes
- **Request Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  * `specialty` (String, Optional)
  * `minRating` (Number, Optional)
  * `availableDate` (String, Optional, `YYYY-MM-DD`)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "doctorId": "60d07e6180f12423d82a7f5b",
        "fullName": "Dr. Sarah Jenkins",
        "specialty": "Cardiologist",
        "biography": "Board-certified cardiologist.",
        "profilePhoto": "https://example.com/dr-jenkins.jpg",
        "consultationFee": 150.00,
        "averageRating": 4.8,
        "reviewsCount": 24,
        "availableSlots": [
          {
            "slotId": "90a1b2c3",
            "start": "2026-06-11T09:00:00.000Z",
            "end": "2026-06-11T09:30:00.000Z"
          }
        ]
      }
    ]
  }
  ```
- **Error Responses:**
  * `400 Bad Request`: `{"success": false, "error": {"message": "Invalid query parameters."}}`

#### `POST /api/v1/appointments`
- **Description:** Request a temporary time slot reservation.
- **Auth Required:** Yes (Patient role only)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  * `doctorId` (String, Required)
  * `slotId` (String, Required)
- **Success Response (HTTP 201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
      "doctorId": "60d07e6180f12423d82a7f5b",
      "patientId": "60d07e6180f12423d82a7f5a",
      "slotId": "90a1b2c3",
      "status": "Pending Payment",
      "expiresAt": "2026-06-14T04:10:00.000Z"
    }
  }
  ```
- **Error Responses:**
  * `409 Conflict`: `{"success": false, "error": {"message": "This slot is currently locked or booked."}}`

#### `POST /api/v1/payments/checkout`
- **Description:** Creates a Stripe Checkout Session for appointment billing.
- **Auth Required:** Yes (Patient role only)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  * `appointmentId` (String, Required)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "sessionId": "cs_test_b1d2e3f4",
      "checkoutUrl": "https://checkout.stripe.com/pay/cs_test_b1d2e3f4"
    }
  }
  ```
- **Error Responses:**
  * `400 Bad Request`: `{"success": false, "error": {"message": "Appointment reservation has expired."}}`

#### `POST /api/v1/payments/webhook`
- **Description:** Stripe integration webhook validating session completions.
- **Auth Required:** No
- **Request Headers:** `Stripe-Signature`
- **Request Body:** Raw Stripe webhook event payload
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "message": "Webhook processed, appointment confirmed."
  }
  ```
- **Error Responses:**
  * `400 Bad Request`: `{"success": false, "error": {"message": "Invalid webhook signature."}}`

#### `GET /api/v1/notifications`
- **Description:** Retrieve notification alerts for the dashboard feed.
- **Auth Required:** Yes
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "notificationId": "80a1b2c3d4e5",
        "title": "Appointment Confirmed",
        "message": "Your appointment is confirmed.",
        "read": false,
        "createdAt": "2026-06-10T11:32:00.000Z"
      }
    ]
  }
  ```

#### `POST /api/v1/consultations/:appointmentId/join`
- **Description:** Fetches WebRTC token for video session connection.
- **Auth Required:** Yes (Patient or Doctor involved in appointment)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "roomId": "room_neo_health_70e1a2b3",
      "videoToken": "webrtc_tok_abc123xyz_sec_token_909",
      "provider": "daily.co",
      "expiresAt": "2026-06-11T09:45:00.000Z"
    }
  }
  ```
- **Error Responses:**
  * `403 Forbidden`: `{"success": false, "error": {"message": "Access denied: Consultation is only active 10 minutes prior to scheduled start."}}`

#### `GET /api/v1/medical-records`
- **Description:** Fetch patient clinical record listing.
- **Auth Required:** Yes (Patient or authorized Doctor)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "recordId": "50f1a2b3c4d5",
        "type": "Prescription",
        "doctorName": "Dr. Sarah Jenkins",
        "date": "2026-06-11T09:30:00.000Z",
        "fileName": "prescription_70e1a2b3.pdf",
        "downloadUrl": "https://storage.googleapis.com/neo-health-records/prescriptions/50f1a2b3c4d5.pdf"
      }
    ]
  }
  ```

#### `GET /api/v1/medical-records/:recordId/download`
- **Description:** Generate short-lived signed link for file download.
- **Auth Required:** Yes (Patient owner or authorized Doctor)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "signedUrl": "https://storage.googleapis.com/neo-health-records/prescriptions/50f1a2b3c4d5.pdf?Expires=1612349278&Signature=payload"
    }
  }
  ```
- **Error Responses:**
  * `403 Forbidden`: `{"success": false, "error": {"message": "Access denied: You do not have permission to view this file."}}`

#### `POST /api/v1/reviews`
- **Description:** Submit rating/review for a completed consultation.
- **Auth Required:** Yes (Patient only)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  * `appointmentId` (String, Required)
  * `rating` (Number, Required, 1-5)
  * `comment` (String, Required, max 500 chars)
- **Success Response (HTTP 201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "reviewId": "40a1b2c3d4e5f6g7",
      "rating": 5,
      "comment": "Great consultation."
    }
  }
  ```
- **Error Responses:**
  * `400 Bad Request`: `{"success": false, "error": {"message": "Review rejected: Appointment must be Completed."}}`

---

### Doctor Flow Module

#### `PUT /api/v1/doctors/:id`
- **Description:** Update profile bio details, photo link, or fees.
- **Auth Required:** Yes (Doctor role matching target ID)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  * `biography` (String, Optional)
  * `profilePhoto` (String, Optional)
  * `consultationFee` (Number, Optional)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "doctorId": "60d07e6180f12423d82a7f5b",
      "biography": "Updated cardiologist biography text.",
      "consultationFee": 160.00
    }
  }
  ```
- **Error Responses:**
  * `403 Forbidden`: `{"success": false, "error": {"message": "Action denied: Only verified doctors can update profiles."}}`

#### `POST /api/v1/doctors/availability`
- **Description:** Add available consultation slots.
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  * `slots` (Array of objects, Required)
    * `start` (String, Required, ISO Date)
    * `end` (String, Required, ISO Date)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "slotsCreated": 1
    }
  }
  ```

#### `DELETE /api/v1/doctors/availability/:slotId`
- **Description:** Delete an availability slot.
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "message": "Slot deleted successfully."
  }
  ```
- **Error Responses:**
  * `400 Bad Request`: `{"success": false, "error": {"message": "Cannot delete slot: This slot has an active confirmed booking."}}`

#### `GET /api/v1/doctors/appointments`
- **Description:** View daily appointment listings.
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
        "patientName": "John Doe",
        "date": "2026-06-15",
        "time": "09:00 AM - 09:30 AM",
        "paymentStatus": "Paid",
        "status": "Confirmed"
      }
    ]
  }
  ```

#### `POST /api/v1/consultations/:appointmentId/host`
- **Description:** Establish host credentials for WebRTC call.
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "roomId": "room_neo_health_70e1a2b3",
      "hostToken": "webrtc_host_tok_abc123xyz_sec_token_909",
      "provider": "daily.co"
    }
  }
  ```

#### `POST /api/v1/consultations/:appointmentId/end`
- **Description:** Terminate call session and set appointment status to "Completed".
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "message": "Consultation ended and marked as Completed."
  }
  ```

#### `POST /api/v1/medical-records/prescriptions`
- **Description:** Writes new digital signed prescription document.
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  * `patientId` (String, Required)
  * `appointmentId` (String, Required)
  * `medications` (Array of objects, Required)
    * `name` (String, Required)
    * `dosage` (String, Required)
    * `frequency` (String, Required)
    * `duration` (String, Required)
- **Success Response (HTTP 201 Created):**
  ```json
  {
    "success": true,
    "data": {
      "recordId": "50f1a2b3c4d5",
      "type": "Prescription",
      "fileName": "prescription_70e1a2b3.pdf"
    }
  }
  ```

#### `POST /api/v1/medical-records/upload`
- **Description:** Upload diagnostic files (PDF/images up to 10MB).
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Request Body (Multipart):**
  * `patientId` (String, Required)
  * `type` (String, Required, Enum: `['Lab Report', 'Clinical Note']`)
  * `file` (Binary File, Required)
- **Success Response (HTTP 201 Created):**
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

#### `GET /api/v1/doctors/reviews`
- **Description:** View ratings feedback logs.
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "reviewId": "40a1b2c3d4e5f6g7",
        "rating": 5,
        "comment": "Highly informative consultation.",
        "createdAt": "2026-06-11T10:00:00.000Z"
      }
    ]
  }
  ```

#### `GET /api/v1/doctors/earnings`
- **Description:** Track payout earnings.
- **Auth Required:** Yes (Doctor only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `month` (Optional, `YYYY-MM`)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "totalEarnings": 1200.00,
      "commissionDeducted": 300.00,
      "netEarnings": 900.00
    }
  }
  ```

---

### Admin Flow Module

#### `POST /api/v1/auth/admin/login`
- **Description:** Admin authorization access login.
- **Auth Required:** No
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
  * `email` (String, Required)
  * `password` (String, Required)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature"
    }
  }
  ```

#### `GET /api/v1/admin/dashboard`
- **Description:** Fetch platform dashboard core metrics.
- **Auth Required:** Yes (Admin only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "totalUsersCount": 1250,
      "activeDoctorsCount": 45,
      "bookedAppointmentsCount": 320,
      "totalRevenue": 48000.00
    }
  }
  ```

#### `GET /api/v1/admin/doctors/pending`
- **Description:** List pending doctor registration files.
- **Auth Required:** Yes (Admin only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "doctorId": "60d07e6180f12423d82a7f5b",
        "fullName": "Dr. Sarah Jenkins",
        "specialty": "Cardiologist",
        "licenseFileUrl": "https://storage.googleapis.com/neo-health-records/licenses/doc_license.pdf"
      }
    ]
  }
  ```

#### `POST /api/v1/admin/doctors/:id/verify`
- **Description:** Verify or reject doctor profile credentials.
- **Auth Required:** Yes (Admin only)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  * `status` (String, Required, Enum: `['Verified', 'Rejected']`)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "message": "Doctor status updated successfully."
  }
  ```

#### `GET /api/v1/admin/appointments`
- **Description:** List all system bookings.
- **Auth Required:** Yes (Admin only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
        "patientName": "John Doe",
        "doctorName": "Dr. Sarah Jenkins",
        "date": "2026-06-15",
        "status": "Confirmed"
      }
    ]
  }
  ```

#### `DELETE /api/v1/admin/reviews/:id`
- **Description:** Delete/moderate inappropriate doctor reviews.
- **Auth Required:** Yes (Admin only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "message": "Review deleted successfully and event logged."
  }
  ```

#### `POST /api/v1/admin/appointments/:id/refund`
- **Description:** Process Stripe checkout refunds for cancelled bookings.
- **Auth Required:** Yes (Admin only)
- **Request Headers:** `Authorization: Bearer <token>`
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "message": "Refund processed successfully via Stripe."
  }
  ```

#### `POST /api/v1/admin/users/:id/suspend`
- **Description:** Suspend or flag user account profiles violating policy.
- **Auth Required:** Yes (Admin only)
- **Request Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`
- **Request Body:**
  * `isSuspended` (Boolean, Required)
- **Success Response (HTTP 200 OK):**
  ```json
  {
    "success": true,
    "message": "User account suspension status updated successfully."
  }
  ```

---

## 5. Shared/Common Schemas

### Error Envelope Schema
```json
{
  "success": false,
  "error": {
    "message": "Error details go here"
  }
}
```

### Dynamic User Profile Schema
```json
{
  "userId": "ObjectIdString",
  "email": "user@example.com",
  "fullName": "Name String",
  "role": "patient/doctor/admin"
}
```

---

## 6. Error Code Reference Table

| HTTP Status | Error Message/Condition | Cause |
| :--- | :--- | :--- |
| `400` | Validation failed: [Details] | Input parameters malformed or failing schema limits. |
| `401` | Invalid email or password. | User input credentials do not match DB values. |
| `401` | Unauthorized: Token is missing or invalid. | Protect middleware rejects session JWT. |
| `403` | Access denied: Role not authorized. | Requesting role lacks permissions. |
| `403` | Account is suspended. | User is flagged in database as suspended. |
| `404` | Resources not found. | Target ID parameters do not reference active DB logs. |
| `409` | Conflict: Duplicate entries detected. | Unique index collisions (double booking, duplicate email). |
| `500` | Internal Server Error. | Server crash or unhandled error state. |

---

## 7. Rate Limiting & Security Notes
- **Rate Limiting:** IP-based requests are restricted using `express-rate-limit`. Public authentication routes (`POST /api/v1/auth/login`, `POST /api/v1/auth/register`) are capped at 5 requests per minute. General endpoints are restricted to 100 requests per 15 minutes.
- **Cors Hardening:** Allowed origins restricted exclusively to Vercel production deployment URLs.
- **Secure Headers:** Express services configure Helmet headers preventing XSS and frame hijacking.
- **Data sanitization:** Strict Mongo queries validation protecting collections from NoSQL operator injection attacks.
