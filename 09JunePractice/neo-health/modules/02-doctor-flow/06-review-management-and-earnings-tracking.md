# Feature: Review Management and Earnings Tracking

## 1. Feature Overview
This feature allows doctors to view ratings/reviews submitted by patients, and track consultation earnings. The dashboard aggregates fees, applies commissions, and offers monthly filtration for logging outputs in under 1.5 seconds.

## 2. Acceptance Criteria
- AC1: Doctors can view all reviews and ratings submitted by patients on their profile.
- AC2: The doctor dashboard displays total platform earnings calculated as sum of completed consultation fees minus admin commission.
- AC3: Earnings logs can be filtered by month, loading results in under 1.5 seconds.

## 3. UI/UX Requirements
- **Visuals:** Visual review list feed showing patient names, star-badges, and timestamp headers. Earnings tracking cards highlighting total balance, pending balances, and net payouts.
- **Accessibility:** Ensure tab structures for separating reviews from earnings are accessible.
- **Interactions:** Monthly dropdown selector returning values without full page refresh.

## 4. API Endpoints Required

### `GET /api/doctors/reviews`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
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

### `GET /api/doctors/earnings`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:** `month` (optional, format `YYYY-MM`)
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "totalEarnings": 1200.00,
    "commissionDeducted": 300.00,
    "netEarnings": 900.00,
    "transactions": [
      {
        "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
        "date": "2026-06-11",
        "gross": 150.00,
        "net": 112.50
      }
    ]
  }
}
```

## 5. Data Models / Schema
- Leverages the `Review` and `Appointment` collections.

## 6. State Management Notes
- **Local State:** Selected month query, expanded reviews text views, active list tab states.
- **Async State:** Reviews list feeds and transaction logs data objects.

## 7. Edge Cases
- **No Reviews/Earnings State:** Displays clear empty states with custom typography: "No reviews submitted yet" and "$0.00 total earnings."
- **Commission Calculations:** Ensuring commissions align with configurations (e.g. 20% platform cut) before displaying balances.

## 8. Dependencies on Other Features
- Feature 07: Doctor Reviews Submission (creates reviews).
- Feature 03: Slot Selection and Payment Checkout (creates appointment billing logs).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/DoctorEarnings.test.jsx`
- Backend API tests: `src/tests/api/doctor_earnings.test.js`

## 10. Out of Scope for This Feature
- Manual payouts trigger mechanisms (managed automatically in staging/live bank accounts).
- Review disputing workflows.
