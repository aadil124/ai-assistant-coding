## Feature ID: 05
## Feature Name: Video Consultation Access
## Module: Module 1: Patient Flow
## Description: Manages the instantiation and entry of WebRTC video consultation sessions for patients and doctors, starting exactly 10 minutes prior to the scheduled appointment.

## User Story
As a patient or doctor, I want to click a "Join Call" button when my appointment is near so that I can establish a secure video and audio connection for the consultation.

## Acceptance Criteria
- AC1: The "Join Call" button becomes active and clickable exactly 10 minutes prior to the scheduled appointment start time.
- AC2: Clicking the "Join Call" button fetches a WebRTC token and redirects the user to the active video call room.
- AC3: If a connection drops, the patient can rejoin the consultation room using the same link as long as the session time has not expired.

## API Endpoints

### 1. Join Video Consultation Room
* **Method:** `POST`
* **Path:** `/api/consultations/:appointmentId/join`
* **Request Headers:**
  * `Authorization: Bearer <token>`
* **Success Response (HTTP 200 OK):**
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
* **Error Response - Call Not Active Yet (HTTP 403 Forbidden):**
```json
{
  "success": false,
  "error": {
    "message": "Access denied: The consultation room is only accessible starting 10 minutes prior to the scheduled time."
  }
}
```
* **Error Response - Appointment Not Found (HTTP 404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Appointment details not found."
  }
}
```

## UI Components

### 1. `VideoConsultationRoom` (Container component)
* Core video panel layout managing WebRTC media stream nodes.
* Renders loading skeletons during signal handshakes.

### 2. `VideoGrid` (Functional component)
* Renders two video frames: local participant (floating bottom-right corner) and remote participant (full viewport).

### 3. `CallControlsPanel` (Functional component)
* Overlay toolbar containing mute mic button, toggle video button, device settings gear, and a red "Leave Call" button.

### 4. `DevicePermissionsModal` (Functional component)
* Displays warning overlay if browser camera/microphone permissions are blocked, guiding the user to grant access.

## State / Data Flow

1. **Button Activation Check:**
   * Client dashboard runs a React interval checking scheduled start times.
   * If current time is >= (start time - 10 minutes), the "Join Call" button transitions from disabled to active.
2. **Access Token Query:**
   * User clicks "Join Call".
   * Client calls `POST /api/consultations/:appointmentId/join`.
   * Backend verifies user role, checks appointment confirmation status, and interacts with the WebRTC service to generate a secure session token.
3. **WebRTC Hookup:**
   * Client instantiates the video frame using the returned `videoToken` and room URL.
   * Browser requests camera and microphone permissions.
   * Remote stream connects and triggers UI rendering updates.
4. **Reconnection Hook:**
   * If network drop occurs, standard WebRTC handlers trigger a loading overlay. The client attempts to reconnect using the same token until session expiration is hit.

## Edge Cases
* **Camera / Microphone Access Denied:** Patient or doctor blocks browser hardware permissions. Handled by trapping media stream errors and rendering the `DevicePermissionsModal` overlay instructing the user how to re-enable them.
* **Early Join Attempts:** User attempts to trigger POST manually via API clients before the 10-minute window. Checked and rejected by backend middleware using server-side timestamps.

## Dependencies
* Feature 04 (Booking Confirmation - required to ensure appointment status is "Confirmed").
* Feature 01 (Registration and Login - to authorize JWT roles).

## Out of Scope for This Feature
* **Screen Sharing & Whiteboard:** Sharing display viewports or annotation tools.
* **In-Call Text Chats:** Sending instant messages in the video room.
