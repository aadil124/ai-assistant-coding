# Feature Specification: Multi-Display & Extension Detection

## Feature ID
`FEAT-008` (Priority 8)

## Purpose
Estures the lockdown sandbox integrity by detecting secondary monitors, virtual displays, remote screen-sharing tools, and running browser extensions that can expose question content or allow candidate collaboration.

## User Stories
* **US-02-03:** As an Examiner, I want the system to detect if the candidate connects a second monitor or uses unauthorized browser extensions so that cheating is prevented.

## Functional Requirements
1. **FR-8.1: Display Count Monitor:** Check screen count using the Presentation API and window layout sizes. Prevent exam access if screen count $>1$ ($FR-204$).
2. **FR-8.2: Remote Screen-Share Detector:** Leverage WebRTC getDisplayMedia constraints. If the candidate attempts to stream their desktop via an external app (e.g. Zoom, TeamViewer), detect and lock the session.
3. **FR-8.3: Browser Focus Monitor:** Bind event listeners to window `blur` and `focus` events. Log window switches as critical anomalies.
4. **FR-8.4: Extension DOM Monitor:** Run mutation observers on the DOM root to detect if external extension scripts inject elements (e.g. translator boxes, AI helpers) into the exam window.

## Validation Rules
1. **VAL-8.1:** If window focus is lost for $>3$ consecutive seconds, trigger a lock state.
2. **VAL-8.2:** Any detected presentation monitor change during the exam must block navigation immediately.

## Edge Cases
1. **Virtual Display Adapters:** Virtual display configurations (e.g. Duet Display, Sidecar) do not register as physical displays but create virtual screens. Detect via window dimensions offsets (e.g. `window.screen.availWidth` compared to display widths).
2. **System Popups:** Operating system notifications (e.g. email alerts, chat popups) triggering blur. Recommend candidates enable "Do Not Disturb" mode during pre-flight check.
3. **HDMI Splitters/Loop Devices:** Hard-wired splitters mirroring output signals to capture cards. Detect via browser frame rate drops and canvas latency tests.

## Dependencies
* `FEAT-05` (Fullscreen Lockdown & Client Event Controls).

## API Requirements

### POST `/api/v1/proctor/session/{session_id}/log-anomaly`
* **Description:** Reports a secondary display or extension violation.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Candidate scope)
* **Request Payload:**
```json
{
  "anomaly_type": "SECONDARY_DISPLAY_DETECTED",
  "details": "Screen count: 2. Screen size parameters mismatch.",
  "timestamp": 1780658950
}
```
* **Response (200 OK):**
```json
{
  "anomaly_id": "anom_0129a5",
  "should_lock_exam": true
}
```

## Database Impact
* **Entity:** `PROCTORING_LOG`
  * Inserts a record tracking the session ID, anomaly type (`SECONDARY_DISPLAY_DETECTED` or `DOM_MUTATION_DETECTED`), and timestamp.

## UI Components
1. **Display Warning Overlay:** Modal explaining that multiple screens are active. Unlocks only when display count equals 1.
2. **Violation Modal:** Screen overlay blocking question view after a critical focus loss event. Requires proctor release or verification code.

## Security Requirements
1. **SEC-8.1 (Extension Shield):** Run client-side scripts inside an isolated Javascript context (e.g., using secure closures) to prevent extensions from capturing internal API keys or overriding variables.
2. **SEC-8.2 (Canvas Fingerprinting):** Generate a canvas fingerprint at exam launch to detect hardware alterations during the test.

## Acceptance Criteria
* **Scenario: Secondary Display Attached During Exam**
  * **Given** an exam session is in progress on a single monitor,
  * **When** the candidate plugs in an HDMI cable to a secondary screen,
  * **Then** the screen count changes to 2, the exam page hides, and a lock screen loads.
* **Scenario: Blur Event Logged**
  * **Given** the candidate is in the exam,
  * **When** they click outside the browser to open a local document,
  * **Then** a `FOCUS_LOST` anomaly is dispatched to the API and logged under the session's proctoring timeline.

## Definition of Done (DoD)
* [ ] Display detection tested with physical and virtual monitors on Windows and MacOS.
* [ ] Chrome/Safari window focus events verified for edge-case popups.
* [ ] Mutation observers tested against standard browser translator extensions.
* [ ] API anomaly routing verified with integration tests.
* [ ] Technical Architect sign-off.
