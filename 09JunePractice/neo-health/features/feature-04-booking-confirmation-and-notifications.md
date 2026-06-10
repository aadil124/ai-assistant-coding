## Feature ID: 04
## Feature Name: Booking Confirmation and Notifications
## Module: Module 1: Patient Flow
## Description: Processes Stripe checkout success webhooks, finalizes database appointment confirmation, and dispatches automated email/dashboard notifications.

## User Story
As a patient, I want to receive an immediate booking confirmation in the UI, an email containing appointment details, and dashboard notification counts so that I am assured my consultation is confirmed.

## Acceptance Criteria
- AC1: After successful payment, the appointment status updates to "Confirmed" in the database within 2 seconds.
- AC2: The system dispatches an automated email confirmation to the patient containing the appointment details within 5 seconds.
- AC3: A booking confirmation notification is pushed to the patient's dashboard interface.

## API Endpoints

### 1. Stripe Payment Event Webhook
* **Method:** `POST`
* **Path:** `/api/payments/webhook`
* **Request Headers:**
  * `Stripe-Signature: t=1612345678,v1=abc123xyz`
* **Request Body:** Raw Stripe webhook payload representing a `checkout.session.completed` event containing metadata values:
```json
{
  "id": "evt_1234567890",
  "object": "event",
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
* **Success Response (HTTP 200 OK):**
```json
{
  "success": true,
  "message": "Webhook processed, appointment confirmed."
}
```
* **Error Response - Signature Verification Failed (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid webhook signature."
  }
}
```

### 2. Fetch Dashboard Notifications
* **Method:** `GET`
* **Path:** `/api/notifications`
* **Request Headers:**
  * `Authorization: Bearer <token>`
* **Success Response (HTTP 200 OK):**
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

## UI Components

### 1. `BookingSuccessPage` (Container component)
* Landing screen patient is redirected to post-checkout.
* Queries backend for confirmation status; displays animated green success shield and appointment summary block.

### 2. `NotificationBell` (Functional component)
* Placed in navigation header. Displays red indicator badge with unread counts.
* Toggles `NotificationDropdown` on hover/click.

### 3. `NotificationDropdown` (Functional component)
* Card displaying unread notification list items. Allows clicking "Mark all as read".

## State / Data Flow

1. **Webhook Reception:** Patient completes Stripe payment. Stripe triggers a secure POST `/api/payments/webhook` call to the Neo-Health backend server.
2. **Webhook Authentication:**
   * Express middleware verifies the request body hash against the `Stripe-Signature` using the Stripe endpoint secret.
3. **Database Update:**
   * Backend extracts `appointmentId` from session metadata.
   * Executes a database update setting `status = "Confirmed"` and clears TTL fields.
   * Simultaneously sets doctor availability slot to `status = "Booked"`.
4. **Notification Dispatch:**
   * Backend triggers SMTP service (using a mailer module) to email the patient.
   * Appends a notification document to MongoDB for the patient dashboard list.
5. **UI Updates:**
   * If the user is on the `BookingSuccessPage`, the client polls the API (or receives a WebSocket event) confirming the status update. The UI updates from a loading spinner to a success confirmation view.

## Edge Cases
* **Delayed Webhook Execution:** Webhook arrives after the patient is redirected back to the `BookingSuccessPage`. Resolved by initiating a client-side polling state (up to 5 attempts, once every 2 seconds) querying `/api/appointments/:id/status` to handle transition delays gracefully.
* **Duplicate Webhook Payload:** Stripe sends the same webhook event twice due to retry policies. Prevented by keeping a ledger of processed Stripe event IDs in MongoDB. If event ID exists, return HTTP 200 immediately without repeating logic.

## Dependencies
* Feature 03 (Slot Selection and Checkout - provides Stripe session data and locks).
* Feature 01 (Registration and Login - authenticates dashboard view queries).

## Out of Scope for This Feature
* **SMS Notifications:** Sending confirmation notifications to physical phone numbers.
* **Rescheduling Notifications:** Triggers for updating or editing booking timestamps.
