# Feature: Dashboard and Upcoming Appointments Management

## 1. Feature Overview
This feature provides the primary interface for doctors to manage daily consultations. The dashboard aggregates chronological lists of confirmed and pending appointments, lists patient details, and monitors live cancellation/booking events.

## 2. Acceptance Criteria
- AC1: The doctor dashboard displays upcoming appointments sorted chronologically by date and time.
- AC2: Each appointment item on the dashboard displays the patient's name, date, time, and current payment status.
- AC3: The dashboard updates appointment details dynamically when a cancellation or booking event occurs.

## 3. UI/UX Requirements
- **Visuals:** Centered main layout dashboard panel, distinct cards for today's agenda vs upcoming weeks, payment status indicator badges.
- **Accessibility:** Clear structure using tables or list rows with clean header labels.
- **Interactions:** Live-updating dashboard notifications when booking events occur (polling or web sockets).

## 4. API Endpoints Required

### `GET /api/doctors/appointments`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
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

## 5. Data Models / Schema
- Leverages the `Appointment` and `User` collections.

## 6. State Management Notes
- **Local State:** Active list filters, sorting methods, dashboard expansion tags.
- **Polling:** Sets up client-side polling every 30 seconds to fetch `/api/doctors/appointments` and update dashboard listings dynamically.

## 7. Edge Cases
- **Stale Appointment Status:** Payment status changes while the doctor is viewing the page. Resolved by live polling intervals updating dashboard lists.
- **Null Patient Profiles:** Patient account was deleted or flagged. Handled by checking database relationships and rendering "Deactivated Patient" gracefully.

## 8. Dependencies on Other Features
- Feature 01: Registration and Login (to establish doctor identity).
- Feature 03: Slot Selection and Payment Checkout (creates appointment logs).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/DoctorDashboard.test.jsx`
- Backend API tests: `src/tests/api/doctor_appointments.test.js`

## 10. Out of Scope for This Feature
- Direct patient medical record uploads (managed in dedicated consultation/records features).
- Doctor calendar export functions.
