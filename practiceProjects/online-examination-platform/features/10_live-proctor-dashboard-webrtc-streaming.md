# Feature Specification: Live Proctor Dashboard & WebRTC Streaming

## Feature ID
`FEAT-010` (Priority 10)

## Purpose
Provides human proctors with a real-time, WebRTC-powered dashboard to monitor webcam and screen feeds of up to 30 active candidates concurrently, view AI-generated anomaly logs, and intervene via chat warnings or remote terminations.

## User Stories
* **US-03-03:** As a Proctor, I want a live dashboard showing all active candidates, filtered by AI-determined "Suspicion Level," with a real-time feed and communication interface.

## Functional Requirements
1. **FR-10.1: WebRTC Streaming Receiver:** Establish WebRTC peer connections (using SFU or Mesh topology) to stream candidate webcam and screen capture feeds onto the proctor console.
2. **FR-10.2: Real-time Incident Feed:** Real-time event notifications via WebSockets. Display flagged anomalies dynamically next to the respective candidate's video thumbnail.
3. **FR-10.3: Proctor Intercom System:** Provide a text chat interface and a push-to-talk microphone button allowing the proctor to send direct warnings to a candidate's lock screen.
4. **FR-10.4: Remote Session Actions:** Provide controls for proctors to:
   * Pause an exam (blocking the candidate's view while checking an incident).
   * Resume an exam.
   * Terminate/Force Submit the exam (setting the session status to invalidated due to cheating).

## Validation Rules
1. **VAL-10.1:** An individual proctor console is capped at 30 concurrent candidate video feeds to ensure dashboard responsiveness and prevent proctor cognitive overload.
2. **VAL-10.2:** Action requests (warnings, freezes, terminations) require the proctor to provide a reason from a dropdown to maintain audit logs.

## Edge Cases
1. **WebRTC Stream Drop:** If WebRTC drops due to candidate network instability, the dashboard must fall back to showing a placeholder image with the last captured snapshot and state: `"WebRTC Disconnected - Reconnecting..."`.
2. **Multiple Simultaneous Alerts:** If 5 candidates trigger high-level AI alerts at once, the proctor dashboard must sort the candidate grid dynamically, placing the highest-risk profiles at the top left of the grid.
3. **Proctor Disconnect:** If the proctor's internet goes down, candidate sessions must continue uninterrupted. The system logs proctor offline duration, and another proctor can assume monitoring control.

## Dependencies
* `FEAT-09` (Visual & Audio AI Proctoring Engine).

## API Requirements

### GET `/api/v1/proctor/sessions`
* **Description:** Retrieves all active exam sessions assigned to the proctor.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Proctor scope)
* **Response (200 OK):**
```json
{
  "active_count": 12,
  "sessions": [
    {
      "session_id": "sess_882a-bc923",
      "candidate_name": "Sarah Jenkins",
      "exam_title": "Biology Final",
      "status": "active",
      "suspicion_score": 45,
      "stream_url": "webrtc://stream.secureexam.com/sess_882a-bc923"
    }
  ]
}
```

### POST `/api/v1/proctor/session/{session_id}/terminate`
* **Description:** Forces submission of the exam session and invalidates results.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Proctor scope)
* **Request Payload:**
```json
{
  "reason_code": "SECONDARY_DEVICE_USE",
  "notes": "Verified candidate looking at phone for 2 minutes."
}
```
* **Response (200 OK):**
```json
{
  "status": "terminated",
  "session_id": "sess_882a-bc923",
  "invalidated_at": "2026-06-05T11:29:11Z"
}
```

## Database Impact
* **Entity:** `EXAM_SESSION` & `PROCTORING_LOG`
  * Updates `EXAM_SESSION`: sets `status` to `invalidated`, records termination audit flags.
  * Inserts a termination action event record into `PROCTORING_LOG`.

## UI Components
1. **Candidate Video Grid:** Multi-panel dashboard with cells displaying active streams, candidate names, and live suspicion levels.
2. **Suspicion Timeline Panel:** Sidebar detailing chronological list of alerts (e.g. `FACE_ABSENT` at 10:15:20) with play-back buttons to review recorded media chunks.
3. **Intercom Panel:** Chat window overlay inside selected candidate detail view, allowing instant messaging.

## Security Requirements
1. **SEC-10.1 (Proctor Scoping):** Proctors can only connect to streams of candidates explicitly assigned to them by an Administrator.
2. **SEC-10.2 (Audit Trail Logging):** Every proctor interaction (clicking play-back, sending warning, pausing exam) must be permanently logged in the system audit table.

## Acceptance Criteria
* **Scenario: Send warning to candidate**
  * **Given** a proctor sees candidate X looking away,
  * **When** they type `"Please keep eyes on screen"` in the chat box and click Send,
  * **Then** the message is pushed via WebSocket to candidate X's screen, displaying as a warning message.
* **Scenario: Terminate exam remotely**
  * **Given** a proctor confirms a candidate is cheating,
  * **When** they click "Terminate", select `"IMPERSONATION"`, and submit,
  * **Then** candidate X's browser immediately redirects to an "Exam Invalidation" page, and the session status is updated to `invalidated` in the database.

## Definition of Done (DoD)
* [ ] WebRTC connections validated under packet loss (up to 15%) and latency simulators.
* [ ] WebSocket messaging latency verified to be $\le 500\text{ms}$.
* [ ] CSS grid layout checked for fluidity across monitor sizes.
* [ ] Database audit trail logging verified.
* [ ] Code reviewed and signed off.
