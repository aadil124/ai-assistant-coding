# Feature: Refund Handling and Policy Violation Management

## 1. Feature Overview
This feature manages monetary refunds and account suspension enforcement. Admins trigger Stripe refunds for cancelled bookings, updating status to "Refunded" and releasing slots. Admins also flag/suspend violating doctor or patient profiles.

## 2. Acceptance Criteria
- AC1: Admins can trigger stripe refunds for cancelled appointments, returning HTTP 200 on successful refund.
- AC2: Refunding an appointment updates the appointment status to "Refunded" and releases any locked database fields.
- AC3: Admins can flag or temporarily suspend doctor or patient profiles violating system policies.

## 3. UI/UX Requirements
- **Visuals:** Booking detail overlay containing a "Refund Appointment" action panel, profile management page highlighting suspension toggles.
- **Accessibility:** Ensure refund triggers have warning dialog confirmation panels.
- **Interactions:** Dynamic color badge indicators (e.g. "Suspended" accounts display in dark red).

## 4. API Endpoints Required

### `POST /api/admin/appointments/:id/refund`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "message": "Refund processed successfully via Stripe. Booking status updated to Refunded."
}
```

### `POST /api/admin/users/:id/suspend`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "isSuspended": true
}
```
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "message": "User account suspension status updated successfully."
}
```

## 5. Data Models / Schema
- Leverages the `User` and `Appointment` collections. Adds an `isSuspended` boolean field to the User schema:
  `isSuspended: { type: Boolean, default: false }`.

## 6. State Management Notes
- **Local State:** Confirmation modals states, selected suspension options, load transitions toggles.
- **Async State:** Refreshed user and transaction records array maps.

## 7. Edge Cases
- **Refunding Unpaid Bookings:** Admin attempts to execute refund calls on bookings where the status was never "Confirmed". Resolved by checking:
  `appointment.status === 'Confirmed' && appointment.paymentStatus === 'Paid'` before executing the Stripe refund request.
- **Double Refund Execution:** Handled by checking appointment status beforehand. If already "Refunded", reject immediately.

## 8. Dependencies on Other Features
- Feature 03: Slot Selection and Payment Checkout (creates payment transactions).
- Feature 01: Registration and Login (admin validation checks).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/SuspensionControls.test.jsx`
- Backend API tests: `src/tests/api/refunds.test.js`

## 10. Out of Scope for This Feature
- Customer dispute management integration with Stripe dashboard.
- Automated suspension triggers based on algorithmic profiling.
