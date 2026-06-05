# Feature Specification: Visual & Audio AI Proctoring Engine

## Feature ID
`FEAT-009` (Priority 9)

## Purpose
Monitors the candidate's physical environment in real-time during the examination. It analyzes webcam video and microphone audio feeds using AI models to detect and flag suspicious behaviors (such as leaving the desk, speaking to others, or using secondary devices).

## User Stories
* **US-03-01:** As a Proctor, I want the AI engine to automatically flag events when a candidate looks away from the screen, leaves the frame, or when another face appears in the webcam stream.
* **US-03-02:** As a Proctor, I want the AI engine to detect and transcribe background speech or track loud audio spikes so that oral assistance is audited.

## Functional Requirements
1. **FR-9.1: Facial Presence & Count Tracker:** Run continuous face detection on the webcam stream. Flag anomalies when the face count is 0 (candidate left seat) or $> 1$ (unauthorized helper present).
2. **FR-9.2: Gaze Direction Estimator:** Analyze pupil positions. Flag an anomaly if the candidate's gaze deviates from the screen center by $>35$ degrees for a continuous duration of $> 4$ seconds.
3. **FR-9.3: Audio Level Spike Monitor:** Calculate real-time microphone input volume (decibels). Trigger an alert if an audio spike exceeds background levels by $> 25\text{ dB}$.
4. **FR-9.4: Speech-to-Text Transcription Engine:** Pass flagged audio segments through a Speech-to-Text processor to detect and transcribe speech, checking for keyword violations (e.g. "Google", "answer", "help").

## Validation Rules
1. **VAL-9.1:** Face detection and gaze estimation must process at a minimum rate of 3 frames per second to ensure accuracy without overloading candidate CPU resources.
2. **VAL-9.2:** Audio anomalies are ignored unless the duration of the audio spike exceeds 1.5 seconds, filtering out short clicks or key taps.

## Edge Cases
1. **Low Frame Rate / Dark Lighting:** If the client camera frame rate drops below 5fps or lighting is too dark for face detection, the system must trigger a `LOW_LIGHT_WARNING` to the candidate and log it as a proctor flag.
2. **Reading Questions Aloud:** Candidates reading questions to themselves. The Speech-to-Text engine logs the transcription. If it matches the exact wording of the active question, the proctor dashboard labels the event as low-priority "self-talk" rather than high-priority cheating.
3. **Frequent Gaze Deviations due to Scratch Paper:** If the exam configuration allows scratch paper, the gaze tracker's sensitivity threshold is adjusted to prevent excessive false alarms.

## Dependencies
* `FEAT-07` (Identity Verification & Biometric Matcher).

## API Requirements

### POST `/api/v1/proctor/session/{session_id}/media-chunk`
* **Description:** Receives segmented video/audio chunks (WebM format) for server-side processing and storage.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>`, `Content-Type: multipart/form-data`
* **Request Payload:**
  * `video_chunk`: WebM binary (10 seconds duration)
  * `sequence`: Integer
* **Response (200 OK):**
```json
{
  "status": "received",
  "anomalies_detected": [
    {
      "type": "TALKING",
      "confidence": 0.88,
      "transcript": "what is the answer to question 2"
    }
  ]
}
```

## Database Impact
* **Entity:** `PROCTORING_LOG`
  * Inserts visual/audio anomalies with links to video timestamps.
  * DB index on `(session_id, anomaly_type, logged_at)` to speed up timeline rendering.

## UI Components
1. **Webcam Thumbnail:** Small picture-in-picture box (e.g., 160x120px) showing the live feed in the workspace footer, serving as a reminder that monitoring is active.
2. **Warning overlay:** Disappears automatically after 3 seconds, showing messages such as: `"Please look at the screen"` or `"Background noise detected"`.

## Security Requirements
1. **SEC-9.1 (Secure Media Pipelines):** Media chunks must be encrypted during upload using TLS 1.3. Chunks saved to S3 must be encrypted using AES-256 and only accessed via short-lived, signed URLs.
2. **SEC-9.2 (Data Retention Compliance):** Automated compliance with $BRL-004$. S3 lifecycles must permanently delete media chunks 30 days after exam finalization.

## Acceptance Criteria
* **Scenario: Multiple Faces Detected**
  * **Given** a candidate is testing,
  * **When** a second person walks into the webcam frame,
  * **Then** the face tracker counts 2 faces, records a 5-second WebM clip, logs `MULTIPLE_FACES_DETECTED`, and fires a WebSocket alert to the proctor.
* **Scenario: Candidate Leaves Seat**
  * **Given** an active exam session,
  * **When** the candidate leaves the webcam frame,
  * **Then** the face tracker counts 0 faces, wait 5 seconds, logs a `FACE_ABSENT` anomaly, and displays a warning to return.

## Definition of Done (DoD)
* [ ] Gaze and face count tracking accuracy tested with diverse lighting and skin tones.
* [ ] S3 video uploading and SAS token generation verified.
* [ ] Audio spike detection logic tuned to ignore mechanical keyboard typing noise.
* [ ] S3 lifecycle rules configured in Terraform configurations.
* [ ] Performance tests confirm CPU utilization on client browser is $\le 15\%$.
