# Feature: Admin Authentication and Dashboard Access

## 1. Feature Overview
This feature governs access to the Admin Portal. Only verified admin users can authenticate. The admin landing dashboard displays key aggregates: total platform user counts, active/verified doctors, booked appointment statistics, and gross platform revenue.

## 2. Acceptance Criteria
- AC1: Admin users must log in using dedicated admin credentials.
- AC2: Non-admin users attempting to access the Admin Portal must be rejected with an HTTP 403 Forbidden status.
- AC3: The admin dashboard displays total platform user count, active doctor count, booked appointment counts, and overall platform revenue.

## 3. UI/UX Requirements
- **Visuals:** Dark sidebar interface with distinct data KPI tiles, colorful icon badges, and clean tabular layouts.
- **Accessibility:** Ensure high contrast between dark sidebar colors and text. Label aggregate panels clearly.
- **Interactions:** Live animated counter digits loading up stats when the dashboard mounts.

## 4. API Endpoints Required

### `POST /api/auth/admin/login`
- **Request Body:**
```json
{
  "email": "admin@neohealth.com",
  "password": "SuperSecureAdminPassword123!"
}
```
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin_payload.signature",
    "user": {
      "userId": "60d07e6180f12423d82a7f5c",
      "email": "admin@neohealth.com",
      "role": "admin"
    }
  }
}
```

### `GET /api/admin/dashboard`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
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

## 5. Data Models / Schema
- Leverages the `User` collection schema (verifying `role === 'admin'`).

## 6. State Management Notes
- **Local State:** Admin credentials text fields, error indicators, dashboard data objects.
- **Global Context:** Auth Context updates to set `role: "admin"`.

## 7. Edge Cases
- **Role Hijack Entry:** Patient or doctor accounts attempting to query `/api/admin/dashboard` by manually appending headers. Middleware strictly intercepts protecting paths via:
  `requireRole(['admin'])`. Non-admin accounts are rejected with HTTP 403 Forbidden.
- **Null Revenue Calculation:** Calculations fail if database contains zero completed appointments. Solved by placing fallbacks inside MongoDB aggregation outputs.

## 8. Dependencies on Other Features
- Feature 01: Registration and Login (base user schema and JWT generator middleware).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/AdminDashboard.test.jsx`
- Backend API tests: `src/tests/api/admin_auth.test.js`

## 10. Out of Scope for This Feature
- Creating supplementary admin sub-accounts with limited permissions (only global admin is in scope).
- Automated reporting outputs (e.g. exporting csv spreadsheets).
