# Feature: Platform Oversight and Activity Monitoring

## 1. Feature Overview
This feature provides platform auditing. Admins monitor all booked appointments, review list feeds, and moderate feedback. Flagging or deleting inappropriate comments is tracked inside an administrative audit log.

## 2. Acceptance Criteria
- AC1: Admins can view a listing of all appointments booked on the platform.
- AC2: Admins can view and moderate user-submitted reviews, with the ability to flag or delete inappropriate comments.
- AC3: The system logs all administrative actions in an audit trail database collection.

## 3. UI/UX Requirements
- **Visuals:** Grid table mapping appointments, pagination controls, review management interface containing moderation alerts ("Flag" or "Delete").
- **Accessibility:** Alert modals must contain appropriate focus traps. Add descriptive screen reader labels for moderation buttons.
- **Interactions:** Table cell updates happen instantly upon clicking confirmation actions.

## 4. API Endpoints Required

### `GET /api/admin/appointments`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "appointmentId": "70e1a2b3c4d5e6f7a8b9c0d1",
      "patientName": "John Doe",
      "doctorName": "Dr. Sarah Jenkins",
      "date": "2026-06-15",
      "status": "Confirmed"
    }
  ]
}
```

### `DELETE /api/admin/reviews/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "message": "Review deleted successfully and event logged."
}
```

## 5. Data Models / Schema

### `AuditLog` Collection (Mongoose Schema)
```javascript
const AuditLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g. "DELETE_REVIEW", "APPROVE_DOCTOR"
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  details: { type: String }
}, { timestamps: true });
```

## 6. State Management Notes
- **Local State:** Active list filters, pagination indexes, target review pointers, log modal alerts.
- **Async State:** Appointment arrays and reviews streams.

## 7. Edge Cases
- **Auditing Integrity:** Ensures that even if a review document is deleted, the `AuditLog` remains intact and references the action history permanently.
- **Deleting Non-Existent Reviews:** Handled by returning HTTP 404 cleanly.

## 8. Dependencies on Other Features
- Feature 03: Slot Selection and Payment Checkout (creates appointments).
- Feature 07: Doctor Reviews Submission (creates reviews).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/AuditPanel.test.jsx`
- Backend API tests: `src/tests/api/audit_monitoring.test.js`

## 10. Out of Scope for This Feature
- Auto-ban filters monitoring profanities (moderation decisions require manual admin input).
- Review editing capabilities (admins can delete reviews, but cannot modify text content).
