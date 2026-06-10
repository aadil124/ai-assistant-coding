## Feature ID: 07
## Feature Name: Doctor Reviews Submission
## Module: Module 1: Patient Flow
## Description: Enables patients to submit star ratings and textual feedback for doctors, restricting submissions to verified, completed appointments.

## User Story
As a patient, I want to submit feedback and a rating for my doctor after my consultation is finished so that I can share my experience and help other patients choose their providers.

## Acceptance Criteria
- AC1: Patients can submit a rating (1 to 5 stars) and a text review only for appointments with a "Completed" status.
- AC2: Submitting a review calls `POST /api/reviews` and returns an HTTP 201 Created status.
- AC3: Submitting a review for a non-completed or non-existent appointment returns an HTTP 400 Bad Request status.

## API Endpoints

### 1. Submit Doctor Review
* **Method:** `POST`
* **Path:** `/api/reviews`
* **Request Headers:**
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`
* **Request Body:**
```json
{
  "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
  "rating": 5,
  "comment": "Dr. Sarah was highly informative, punctual, and helpful during our call."
}
```
* **Success Response (HTTP 201 Created):**
```json
{
  "success": true,
  "data": {
    "reviewId": "40a1b2c3d4e5f6g7",
    "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
    "doctorId": "60d07e6180f12423d82a7f5b",
    "patientId": "60d07e6180f12423d82a7f5a",
    "rating": 5,
    "comment": "Dr. Sarah was highly informative, punctual, and helpful during our call.",
    "createdAt": "2026-06-11T10:00:00.000Z"
  }
}
```
* **Error Response - Appointment Not Completed (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Review submission rejected: You can only review doctors for appointments with 'Completed' status."
  }
}
```
* **Error Response - Invalid Rating Range (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed: 'rating' must be an integer between 1 and 5."
  }
}
```

## UI Components

### 1. `ReviewFormModal` (Functional component)
* Renders dynamically when patient clicks "Leave Review" from past appointment listing.
* Text area with character counter (max 500 characters).

### 2. `StarRatingInput` (Functional component)
* Interactive star rating input (1-5 stars) displaying active golden stars on hover.

### 3. `ReviewSubmitButton` (Functional component)
* Triggers submission handler, showing inline loaders.

## State / Data Flow

1. **Trigger:** User clicks "Leave Review" from a past appointment item displaying a "Completed" badge.
2. **Review Dialog:** The `ReviewFormModal` opens, locking in `appointmentId` as a local state parameter.
3. **Submission:** Patient selects 5 stars, enters comment, and clicks Submit.
4. **Backend Processing:**
   * Express route interceptor checks authentication.
   * Controller verifies the `appointmentId` exists in the database.
   * Checks if `appointment.status === "Completed"` and `appointment.patientId === req.user.id`. If condition fails, returns HTTP 400.
   * Checks if a review document already exists matching the `appointmentId`. If yes, rejects duplicates (HTTP 400).
   * Saves review document, recalculates Doctor average rating, and returns HTTP 201.
5. **Dashboard Transition:** React closes modal, clears form state, and marks the appointment row review button as "Review Submitted" (disabled).

## Edge Cases
* **Duplicate Submission Attacks:** Patient attempts to bypass UI block and send multiple POST requests for the same `appointmentId`. Checked on the database using a compound unique index constraint on `{ appointmentId: 1 }` ensuring Mongo rejects duplicate inserts.
* **Profanity / Script Injection:** User submits HTML/JS script strings inside the review comment. Handled on backend by sanitizing and escaping strings prior to database insertion.

## Dependencies
* Feature 11 / 05 (Video Consultation - to complete consultations and mark status "Completed").
* Feature 01 (Registration and Login - to verify session).

## Out of Scope for This Feature
* **Doctor Replies:** Doctors replying to user reviews.
* **Review Flagging/Reporting:** Patient flag mechanics (moderation is handled exclusively via Admin Portal).
