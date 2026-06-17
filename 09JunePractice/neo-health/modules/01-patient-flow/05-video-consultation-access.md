# Feature: Video Consultation Access

## 1. Feature Overview
This feature facilitates entry to the virtual video consultation room using WebRTC technology. It dynamically enables the entry action in the UI, fetches active session tokens from the backend signaling service, and manages connection recovery/reconnection loops.

## 2. Acceptance Criteria
- AC1: The "Join Call" button becomes active and clickable exactly 10 minutes prior to the scheduled appointment start time.
- AC2: Clicking the "Join Call" button fetches a WebRTC token and redirects the user to the active video call room.
- AC3: If a connection drops, the patient can rejoin the consultation room using the same link as long as the session time has not expired.

## 3. UI/UX Requirements
- **Visuals:** Full-screen video interface overlay containing a local participant frame, remote doctor stream, call controls panel, and audio/video activity graphs.
- **Accessibility:** Large, high-contrast mute/unmute and camera toggle icons with distinct keyboard shortcuts.
- **Interactions:** Dynamic toggle actions. Loading state overlay while connecting. Dialog banner advising reconnection when network disruptions occur.

## 4. API Endpoints Required

### `POST /api/consultations/:appointmentId/join`
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "roomId": "room_neo_health_70e1a2b3",
    "videoToken": "webrtc_tok_abc123xyz_sec_token_909",
    "provider": "daily.co",
    "expiresAt": "2026-06-11T09:45:00.000Z"
  }
}
```

## 5. Data Models / Schema
- No new database models are introduced. Leverages the `Appointment` collection status states and scheduling timestamps.

## 6. State Management Notes
- **Local State:** Hardware mute flags, local camera stream object reference, video room state, network latency counters.
- **Global Context:** App header states are hidden when entering the full-screen consultation layout.

## 7. Edge Cases
- **Early Entry Attempt:** User attempts to trigger API call before the 10-minute threshold. Backend verifies and rejects requests with HTTP 403 Forbidden.
- **Hardware Access Denied:** Browser blocks microphone or webcam inputs. Trapped and resolved by rendering a clear guidelines UI teaching user how to reset permission settings.
- **Mid-Call Disconnection:** Connection is disrupted. WebRTC listeners attempt auto-reconnect workflows while displaying a loading banner.

## 8. Dependencies on Other Features
- Feature 04: Booking Confirmation and Notifications (verifies that status is "Confirmed").
- Feature 01: Registration and Login (authorizes entry credentials).

## 9. Testing Requirements
- Frontend mock component tests: `src/tests/components/VideoConsultation.test.jsx`
- Backend API tests: `src/tests/api/consultation.test.js`

## 10. Out of Scope for This Feature
- In-call text messaging logs or real-time document sharing.
- Audio/video call record storage (calls are peer-to-peer and not recorded).
