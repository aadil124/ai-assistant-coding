# Feature Specification: System Pre-flight Readiness Check

## Feature ID
`FEAT-006` (Priority 6)

## Purpose
Ensures that the candidate's computer, peripheral hardware (webcam/microphone), operating browser, and internet bandwidth meet the minimum specifications required to complete a proctored exam.

## User Stories
* **US-01-03:** As a Candidate, I want an automated system readiness check (webcam, microphone, screen resolution, connection speed) so that I can resolve technical issues before my exam timer starts.

## Functional Requirements
1. **FR-6.1: Permission Requester:** Request browser camera and microphone permissions explicitly. If denied, show operating-system-specific instructions to enable access.
2. **FR-6.2: Media Device Capture Checker:** Test webcam resolution ($\ge 640\text{x}480$ resolution required) and microphone input levels (analyzing audio input amplitude for activity $>0.05$).
3. **FR-6.3: Bandwidth Tester:** Conduct a speed check by downloading and uploading a $500\text{ KB}$ chunk to the server. Enforce a minimum threshold upload speed of $\ge 1.0\text{ Mbps}$ and latency $\le 300\text{ms}$.
4. **FR-6.4: OS & Screen Resolution Scanner:** Scan screen resolution ($\ge 1024\text{x}768$ minimum required) and verify user agent matches secure browser parameters.

## Validation Rules
1. **VAL-6.1:** Camera feed frame rate must register $\ge 10\text{ fps}$ during a 3-second evaluation window.
2. **VAL-6.2:** All four tests (Camera, Mic, Network, Screen) must pass before a validation certificate is created and the "Proceed to Identification" button is unlocked.

## Edge Cases
1. **Camera Permissions Denied Permanently:** If the user has blocked access at the browser level, the UI must explain how to clear site permissions in the browser address bar rather than repeating access request loops.
2. **Dynamic Device Disconnection:** If a camera or mic is unplugged after passing the check but before starting the exam, the system must trigger a diagnostic reset, locking navigation.
3. **Low Bandwidth Fallback:** If upload throughput oscillates near the threshold, allow entry with low-resolution proctoring configurations (320p at 5fps) and log a system alert.

## Dependencies
* None.

## API Requirements

### POST `/api/v1/exams/{exam_id}/session/readiness`
* **Description:** Records the checklist results and generates a readiness token.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>`
* **Request Payload:**
```json
{
  "camera_passed": true,
  "microphone_passed": true,
  "network_upload_mbps": 1.45,
  "screen_resolution": "1920x1080",
  "browser_agent": "Mozilla/5.0 Chrome/120.0"
}
```
* **Response (200 OK):**
```json
{
  "status": "success",
  "readiness_token": "read_tkn_772a10bf9b",
  "allowed_to_verify": true
}
```

## Database Impact
* **Entity:** `EXAM_SESSION`
  * Updates columns `readiness_status` (Boolean) and `readiness_details` (JSONB).

## UI Components
1. **Diagnostic Checklist Container:** Centered panel displaying four check statuses (Webcam, Microphone, Network, System) with success checkmarks or warning logs.
2. **Volume Level Meter:** Soundbar showing dynamic green/yellow spikes matching candidate's microphone input volume.
3. **Webcam Preview Panel:** Video box showing the live camera feed so candidates can verify their framing.

## Security Requirements
1. **SEC-6.1 (Hardware Spoofing Prevention):** Use WebRTC canvas checks to ensure the webcam source is a physical hardware feed rather than virtual capture cards (e.g. OBS Virtual Camera).
2. **SEC-6.2 (Token Expiry):** The generated `readiness_token` must expire after 30 minutes. If the candidate delays starting the exam, they must repeat the check.

## Acceptance Criteria
* **Scenario: Complete Diagnostics Successfully**
  * **Given** a candidate is on the readiness page with working hardware,
  * **When** they grant permission and click "Run Checks",
  * **Then** the webcam feeds preview, the mic amplitude registers activity, network tests measure $1.5\text{ Mbps}$, and the "Proceed" button lights up.
* **Scenario: Fail on low screen resolution**
  * **Given** a candidate launches the test on a screen sized $800\text{x}600$,
  * **When** the screen resolution test executes,
  * **Then** the check fails, showing a red flag with instruction: `"Your display resolution is too small. Please maximize your window or connect a larger display."`

## Definition of Done (DoD)
* [ ] Hardware permissions logic verified on Chrome, Edge, Safari, and Firefox.
* [ ] Network throughput upload/download test verified with network throttling.
* [ ] Device disconnection WebRTC handlers covered.
* [ ] Diagnostic UI verified as accessible (keyboard navigation).
* [ ] Code approved by QA Lead.
