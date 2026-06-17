# Feature: Doctor Reviews Submission

## 1. Feature Overview
This feature allows patients to rate and review doctors after consultation completion. It provides interactive feedback forms, verifies appointment completion status before submission, and calculates doctor ratings dynamically.

## 2. Acceptance Criteria
- AC1: Patients can submit a rating (1 to 5 stars) and a text review only for appointments with a "Completed" status.
- AC2: Submitting a review calls `POST /api/reviews` and returns an HTTP 201 Created status.
- AC3: Submitting a review for a non-completed or non-existent appointment returns an HTTP 400 Bad Request status.

## 3. UI/UX Requirements
- **Visuals:** Inline review button in past appointments table triggering a clean modal dialog. Dynamic 5-star interactive input showing gold stars on hover.
- **Accessibility:** Ensure the interactive star ratings have correct labels and keyboard focus handlers.
- **Interactions:** Character counter showing remaining characters for text comments (up to 500 characters). Disable submit button upon execution to prevent duplicate submissions.

## 4. API Endpoints Required

### `POST /api/reviews`
- **Request Body:**
```json
{
  "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
  "rating": 5,
  "comment": "Dr. Sarah was highly informative, punctual, and helpful during our call."
}
```
- **Response (HTTP 201 Created):**
```json
{
  "success": true,
  "data": {
    "reviewId": "40a1b2c3d4e5f6g7",
    "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
    "doctorId": "60d07e6180f12423d82a7f5b",
    "patientId": "60d07e6180f12423d82a7f5a",
    "rating": 5,
    "comment": "Dr. Sarah was highly informative, punctual, and helpful during our call."
  }
}
```

## 5. Data Models / Schema

### `Review` Collection (Mongoose Schema)
```javascript
const ReviewSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true, unique: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, maxlength: 500 }
}, { timestamps: true });
```

## 6. State Management Notes
- **Local State:** Selected star rating value, comment text string, and form errors are stored in the modal's component state.
- **Async State:** Reducer updates the local list item when review is successfully submitted.

## 7. Edge Cases
- **Duplicate Reviews:** Patient attempts to submit multiple reviews for a single appointment. Handled by Mongoose unique indexing on `appointmentId`, rejecting duplicate entries.
- **Unfinished Appointment Submission:** Attempting to review an appointment with a status of "Scheduled" or "Pending Payment". Evaluated on backend checking:
  `appointment.status === "Completed"`. If false, returns HTTP 400 Bad Request.
- **Profanity & Script Injections:** Escaping comments before database saves.

## 8. Dependencies on Other Features
- Feature 11: Video Consultation Host Session / Feature 05: Video Consultation Access (to transition appointments to "Completed").
- Feature 01: Registration and Login (to authenticate patient author context).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/ReviewModal.test.jsx`
- Backend API tests: `src/tests/api/reviews.test.js`

## 10. Out of Scope for This Feature
- Doctor replies or comments.
- Moderation workflow within this feature (handled in Admin portal).
