# Feature: Slot Selection and Payment Checkout

## 1. Feature Overview
This feature handles the selection of available time slots on doctor profiles, initiates a database transaction to temporarily reserve the slot, and processes payment collection via Stripe Checkout.

## 2. Acceptance Criteria
- AC1: Patients can select an available doctor time slot, placing a temporary reservation lock on that slot for 5 minutes.
- AC2: Initiating checkout redirects the user to Stripe Checkout with the correct consultation fee parameter.
- AC3: If the checkout is not completed within 5 minutes, the slot is unlocked and made available to other users.

## 3. UI/UX Requirements
- **Visuals:** Grid of slot chips, styled disabled states for locked/booked slots, modal summary containing item details, fee breakdown, and countdown timer.
- **Accessibility:** Ensure screen readers announce the slot lock countdown time remaining, keyboard-navigable time slot grid.
- **Interactions:** Live 5-minute countdown clock showing minutes and seconds. Dynamic card state updates.
- **Redirections:** Smooth load transitions leading up to Stripe redirect.

## 4. API Endpoints Required

### `POST /api/appointments`
- **Request Body:**
```json
{
  "doctorId": "60d07e6180f12423d82a7f5b",
  "slotId": "90a1b2c3"
}
```
- **Response (HTTP 201 Created):**
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

### `POST /api/payments/checkout`
- **Request Body:**
```json
{
  "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1"
}
```
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "sessionId": "cs_test_b1d2e3f4",
    "checkoutUrl": "https://checkout.stripe.com/pay/cs_test_b1d2e3f4"
  }
}
```

## 5. Data Models / Schema

### `Appointment` Collection (Mongoose Schema)
```javascript
const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slotId: { type: String, required: true },
  status: { type: String, enum: ['Pending Payment', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending Payment' },
  expiresAt: { type: Date, required: true } // TTL field for 5 minute lock
}, { timestamps: true });

// TTL index to automatically trigger document deletion or expiry processing
AppointmentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

## 6. State Management Notes
- **Local State:** Currently selected slot data object, checkout process loaders, countdown clock timer instance.
- **Routing State:** Selected appointment record identifiers are passed through state context between screens.

## 7. Edge Cases
- **Simultaneous Selection:** Two patients select the exact same slot at the same second. Resolved via Mongoose transaction or atomic update checking:
  `DoctorProfile.updateOne({ _id: doctorId, "availableSlots.slotId": slotId, "availableSlots.status": "Available" }, { "$set": { "availableSlots.$.status": "Locked" } })`
  If `nModified` is 0, the request is rejected with HTTP 409 Conflict.
- **Payment Gateway Interruption:** User closes browser inside Stripe page. Database TTL will clean up and release the locked slot within 5 minutes.

## 8. Dependencies on Other Features
- Feature 02: Doctor Search and Filters (required to locate doctor profiles and select slots).
- Feature 01: Registration and Login (to associate patient IDs with appointments).

## 9. Testing Requirements
- Frontend integration tests: `src/tests/components/SlotBooking.test.jsx`
- Backend API tests: `src/tests/api/booking.test.js`

## 10. Out of Scope for This Feature
- Webhook confirmations (moved to Booking Confirmation feature).
- Rescheduling of locked/booked slots.
