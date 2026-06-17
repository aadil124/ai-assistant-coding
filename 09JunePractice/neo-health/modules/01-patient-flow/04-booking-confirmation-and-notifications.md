# Feature: Booking Confirmation and Notifications

## 1. Feature Overview
This feature completes the appointment booking loop. It listens for Stripe checkout success webhooks, transitions the appointment status in the database to "Confirmed", locks doctor availability slots, and initiates automated email notifications and dashboard alerts.

## 2. Acceptance Criteria
- AC1: After successful payment, the appointment status updates to "Confirmed" in the database within 2 seconds.
- AC2: The system dispatches an automated email confirmation to the patient containing the appointment details within 5 seconds.
- AC3: A booking confirmation notification is pushed to the patient's dashboard interface.

## 3. UI/UX Requirements
- **Visuals:** Booking Success Page with animated green shield and checkmark. Notification bell in nav displaying unread badge count. Dropdown list showing confirmation details.
- **Accessibility:** Alert screenreader users when unread notifications increase. Provide clear alt-text for status iconography.
- **Interactions:** Dynamic notifications feed updating without manual page refresh. Action link inside notification leading directly to booking details page.

## 4. API Endpoints Required

### `POST /api/payments/webhook`
- **Request Headers:** `Stripe-Signature: t=1612345678,v1=abc123xyz` (verified endpoint)
- **Request Body:** Raw Stripe webhook event object
```json
{
  "id": "evt_1234567890",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_b1d2e3f4",
      "payment_status": "paid",
      "metadata": {
        "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1"
      }
    }
  }
}
```
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "message": "Webhook processed, appointment confirmed."
}
```

### `GET /api/notifications`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "notificationId": "80a1b2c3d4e5",
      "title": "Appointment Confirmed",
      "message": "Your appointment with Dr. Sarah Jenkins on 2026-06-11 at 09:00 AM is confirmed.",
      "read": false,
      "createdAt": "2026-06-10T11:32:00.000Z"
    }
  ]
}
```

## 5. Data Models / Schema

### `Notification` Collection (Mongoose Schema)
```javascript
const NotificationSchema = new mongoose.Schema({
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });
```

## 6. State Management Notes
- **Global Context:** Unread notification count and list array stored in a shared global State provider or Context.
- **Polling/WebSocket:** Bell component runs fetch queries on interval (e.g., every 30 seconds) or establishes a persistent connection to keep alert counts fresh.

## 7. Edge Cases
- **Delayed Stripe Webhook:** Webhook is delayed causing the user to land on the Success screen before confirmation database update. Resolved by initiating a client-side polling state (up to 5 retries, 2-second intervals) checking `/api/appointments/:id/status`.
- **Stripe Webhook Duplication:** Duplicate event signals from Stripe retries. Handled by checking event id history to ensure idempotent operations.

## 8. Dependencies on Other Features
- Feature 03: Slot Selection and Payment Checkout (creates checkout session and locks slots).
- Feature 01: Registration and Login (to restrict profile and notification fetches).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/NotificationBell.test.jsx`
- Backend API webhook tests: `src/tests/api/webhook.test.js`

## 10. Out of Scope for This Feature
- SMS or physical text message alerts.
- Automated calendars sync integrations (Google Calendar, Outlook).
