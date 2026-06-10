## Feature ID: 03
## Feature Name: Slot Selection and Payment Checkout
## Module: Module 1: Patient Flow
## Description: Provides slot booking selection, initiates a 5-minute temporary reservation lock on the database, and processes payments via Stripe integration.

## User Story
As a patient, I want to select an available consultation slot and pay for it securely using a card so that my appointment reservation is locked in and confirmed.

## Acceptance Criteria
- AC1: Patients can select an available doctor time slot, placing a temporary reservation lock on that slot for 5 minutes.
- AC2: Initiating checkout redirects the user to Stripe Checkout with the correct consultation fee parameter.
- AC3: If the checkout is not completed within 5 minutes, the slot is unlocked and made available to other users.

## API Endpoints

### 1. Request Appointment Slot Lock
* **Method:** `POST`
* **Path:** `/api/appointments`
* **Request Headers:**
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* **Request Body:**
```json
{
  "doctorId": "60d07e6180f12423d82a7f5b",
  "slotId": "90a1b2c3"
}
```
* **Success Response (HTTP 201 Created):**
```json
{
  "success": true,
  "data": {
    "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
    "doctorId": "60d07e6180f12423d82a7f5b",
    "patientId": "60d07e6180f12423d82a7f5a",
    "slotId": "90a1b2c3",
    "status": "Pending Payment",
    "expiresAt": "2026-06-10T11:35:00.000Z"
  }
}
```
* **Error Response - Slot Already Booked/Locked (HTTP 409 Conflict):**
```json
{
  "success": false,
  "error": {
    "message": "This slot is currently locked or booked by another user."
  }
}
```

### 2. Initialize Payment Session
* **Method:** `POST`
* **Path:** `/api/payments/checkout`
* **Request Headers:**
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* **Request Body:**
```json
{
  "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1"
}
```
* **Success Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "sessionId": "cs_test_b1d2e3f4",
    "checkoutUrl": "https://checkout.stripe.com/pay/cs_test_b1d2e3f4"
  }
}
```
* **Error Response - Session Expired (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Appointment reservation has expired. Please select the slot again."
  }
}
```

## UI Components

### 1. `SlotSelectionWidget` (Functional component)
* Grid rendering time-slot chips representing doctor availability.
* Disabled slots display with distinct styling to signify they are unavailable/locked.

### 2. `BookingCheckoutModal` (Functional component)
* Displays selected appointment summary details (doctor name, specialty, date, time, consultation fee).
* Shows a 5-minute countdown timer representing the temporary slot lock.

### 3. `StripePayButton` (Functional component)
* Triggers checkout redirection and handles loading states during API call execution.

## State / Data Flow

1. **Slot Action:** Patient clicks an active slot chip.
2. **Database Lock Request:** Client triggers `POST /api/appointments` to request a slot lock.
3. **Database Execution:**
   * Mongoose checks if `slotId` has a status of "Available".
   * If yes, atomic update changes slot status to "Locked", inserts a document into `Appointments` collection with `status: "Pending Payment"`, and establishes a TTL field `expiresAt` set to `Date.now() + 5 minutes`.
4. **Redirection to Stripe:**
   * Patient clicks "Proceed to Payment".
   * Client calls `/api/payments/checkout`. Backend communicates with Stripe SDK, creates a Stripe Session with line items mapping the doctor's consultation fee, and returns `checkoutUrl`.
   * Client window redirects to the Stripe Checkout page.
5. **Lock Expiration Daemon:**
   * A scheduled database index or cron-like model sweeps through `Appointments` every minute. If `expiresAt` < current time and status is still "Pending Payment", Mongoose updates the slot status back to "Available" and updates the appointment status to "Cancelled".

## Edge Cases
* **Simultaneous Booking Double-Click:** Two clients submit a reservation request for slot `90a1b2c3` in the same millisecond. Handled using an atomic MongoDB update:
  `{ "$set": { "status": "Locked" } }` on the slot document where `status = "Available"`. The write locks the slot for the first request, while the second returns `nModified: 0` and fails with HTTP 409.
* **Redirection Dropout:** Patient closes the tab while on the Stripe checkout page. The lock daemon naturally cleans up the stale database slot after 5 minutes.

## Dependencies
* Feature 02 (Doctor Search and Filters - for slot selection interfaces).
* Feature 01 (Registration and Login - authentication verification).

## Out of Scope for This Feature
* **Alternative Payment Methods:** Supporting Apple Pay, PayPal, or local banking systems directly (only Stripe card payments are in scope).
* **Booking Rescheduling:** Patients changing slots after booking (cancellations/refunds are handled in Admin Portal).
