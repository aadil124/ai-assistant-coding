# Feature: Schedule Availability and Consultation Fees Configuration

## 1. Feature Overview
This feature allows verified doctors to configure their availability. Doctors define weekly recurring slots, add custom date slots, and configure their consultation rates. Already-booked slots are protected from deletion.

## 2. Acceptance Criteria
- AC1: Doctors can define and update their weekly available time slots in the dashboard.
- AC2: Setting or changing consultation fees takes effect immediately for all subsequent appointment bookings.
- AC3: The system prevents doctors from deleting time slots that have already been booked and paid for by patients.

## 3. UI/UX Requirements
- **Visuals:** Visual calendar schedule dashboard interface, toggles for active slots, input parameters for consultation fees.
- **Accessibility:** Ensure buttons for deleting slots have clear focus rings and descriptive labels warning if slots are locked.
- **Interactions:** Dynamic slot creation grid allowing multiple slot selection in one drag. Fee input formatted in local currency.

## 4. API Endpoints Required

### `POST /api/doctors/availability`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "slots": [
    {
      "start": "2026-06-15T09:00:00.000Z",
      "end": "2026-06-15T09:30:00.000Z"
    }
  ]
}
```
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "slotsCreated": 1
  }
}
```

### `DELETE /api/doctors/availability/:slotId`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "message": "Slot deleted successfully."
}
```
- **Response - Cannot Delete Booked Slot (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Cannot delete slot: This slot has an active, confirmed booking associated with it."
  }
}
```

## 5. Data Models / Schema
- Modifies the `DoctorProfile` collection's `availableSlots` array status parameters.

## 6. State Management Notes
- **Local State:** Date selection pointers, temporary slots buffer arrays, consultation rate input fields.
- **Async State:** Calendar view components update slots list state on demand.

## 7. Edge Cases
- **Deleting Confirmed Slot:** Doctor requests deletion of a slot that has `status: "Booked"`. Backend controller checks:
  `slot.status !== 'Booked'`. If booked, rejects request returning HTTP 400.
- **Overlapping Slot Timeframes:** Creating a slot that overlaps with an existing slot. Solved by range validations before inserting.

## 8. Dependencies on Other Features
- Feature 08 (Doctor Registration and Profile Setup - verification is pre-requisite).

## 9. Testing Requirements
- Frontend integration tests: `src/tests/components/ScheduleConfig.test.jsx`
- Backend API tests: `src/tests/api/availability.test.js`

## 10. Out of Scope for This Feature
- Auto-syncing calendar interfaces with external calendars.
- Dynamic slot pricing recommendations.
