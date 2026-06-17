# Feature: Video Consultation Host Session

## 1. Feature Overview
This feature enables doctors to host and manage the WebRTC video consultation call. It activates the host controls 10 minutes prior to scheduled slots, generates host signaling tokens, configures local audio/video feeds, and transitions status to "Completed" when the session ends.

## 2. Acceptance Criteria
- AC1: The "Start Call" button becomes active for the doctor exactly 10 minutes before the appointment start time.
- AC2: The system generates a host WebRTC room token and successfully establishes the video and audio streams.
- AC3: The doctor can end the consultation session, which updates the appointment status to "Completed".

## 3. UI/UX Requirements
- **Visuals:** Full-screen host console, sidebar containing patient details card, active timers, microphone and camera toggles, and end call button.
- **Accessibility:** Text alternatives for microphone toggles. Keyboard shortcut sequences for muting streams.
- **Interactions:** Dynamic device input picker overlays allowing doctors to hot-swap cameras/microphones mid-call.

## 4. API Endpoints Required

### `POST /api/consultations/:appointmentId/host`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "roomId": "room_neo_health_70e1a2b3",
    "hostToken": "webrtc_host_tok_abc123xyz_sec_token_909",
    "provider": "daily.co",
    "expiresAt": "2026-06-11T09:45:00.000Z"
  }
}
```

### `POST /api/consultations/:appointmentId/end`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "message": "Consultation ended and marked as Completed."
}
```

## 5. Data Models / Schema
- Leverages the `Appointment` collection.

## 6. State Management Notes
- **Local State:** Audio mute flags, video toggle statuses, active patient card metadata, active timer intervals.
- **Context:** Global layout controls are hidden when host screen triggers full-screen mode.

## 7. Edge Cases
- **Early Session Termination:** Doctor accidentally clicks "End Call" mid-session. System prompts confirmation dialog: "Are you sure you want to end this consultation and mark it as Completed?"
- **Lost Token Sig:** Host token expires during call. Handled by background refresh triggers validating doctor JWT session.

## 8. Dependencies on Other Features
- Feature 03: Dashboard and Upcoming Appointments Management (provides host launcher page).
- Feature 01: Registration and Login (authenticates doctor status).

## 9. Testing Requirements
- Frontend integration tests: `src/tests/components/VideoHost.test.jsx`
- Backend API tests: `src/tests/api/consultation_host.test.js`

## 10. Out of Scope for This Feature
- Video session archiving or call recordings.
- Client screen sharing.
