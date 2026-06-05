# Feature Specification: Fullscreen Lockdown & Client Event Controls

## Feature ID
`FEAT-005` (Priority 5)

## Purpose
Ensures exam security by locking the candidate's browser in fullscreen mode and disabling desktop shortcuts, copy-paste clipboards, context menus, and keys that facilitate cheating or question leakage.

## User Stories
* **US-02-01:** As an Exam Sponsor, I want the candidate's browser window locked in fullscreen mode so that they cannot access external websites or desktop applications.
* **US-02-02:** As an Exam Sponsor, I want clipboard interactions, hotkeys, and right-clicks blocked inside the exam window so that candidates cannot copy test content or paste pre-written answers.

## Functional Requirements
1. **FR-5.1: Fullscreen Enforcer:** Trigger HTML5 Fullscreen API upon candidate launching the exam. Block display of exam content unless the browser is in fullscreen.
2. **FR-5.2: Event Interception Engine:** Intercept and cancel mouse right-clicks (context menu) and common shortcuts:
   * Clipboard actions: Copy (`Ctrl+C`/`Cmd+C`), Cut (`Ctrl+X`/`Cmd+X`), Paste (`Ctrl+V`/`Cmd+V`).
   * Browser navigation: Print (`Ctrl+P`/`Cmd+P`), Reload (`Ctrl+R`/`Cmd+R`, `F5`), Save Page (`Ctrl+S`/`Cmd+S`).
   * System shortcuts: PrintScreen, Alt+Tab, CMD+Tab, Windows Key, Cmd+Space.
3. **FR-5.3: Exit Action Sequencer:** If a candidate exits fullscreen, immediately pause the exam timer, hide the questions under a black mask modal, log an anomaly, and display a 20-second warning countdown to re-enter.

## Validation Rules
1. **VAL-5.1:** Candidates are allowed a maximum of 3 fullscreen exit warning counts per exam session. Upon the 4th exit, the system locks the session and triggers automatic submission.
2. **VAL-5.2:** Fullscreen exits lasting longer than 20 seconds without recovery trigger session termination.

## Edge Cases
1. **System Modal Interruption:** OS alerts (e.g. anti-virus alerts, OS updates) may cause the browser to automatically exit fullscreen. The system must capture the event and allow recovery *only if* the user returns to fullscreen within the 20-second grace window.
2. **Key Layout Variations:** Different keyboard layouts (e.g. DVORAK, AZERTY) must not bypass hotkey blockers. The system must bind event block actions to character `key` codes rather than physical hardware `keyCode` fields.
3. **Text Area Exception:** Candidates must still be able to use standard cursor movement keys (arrows, Home, End, Backspace, Delete) within essay boxes.

## Dependencies
* `FEAT-003` (Candidate Exam Workspace UI).

## API Requirements

### POST `/api/v1/proctor/session/{session_id}/log-anomaly`
* **Description:** Sends details of lockdown bypass attempts to the server.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Candidate scope)
* **Request Payload:**
```json
{
  "anomaly_type": "FULLSCREEN_EXIT",
  "details": "User exited fullscreen mode",
  "timestamp": 1780658900
}
```
* **Response (200 OK):**
```json
{
  "anomaly_id": "anom_0129a3",
  "remaining_warnings": 2,
  "should_terminate": false
}
```

## Database Impact
* **Entity:** `PROCTORING_LOG`
  * Inserts a record identifying the session, anomaly type (`FULLSCREEN_EXIT`), and timestamp.

## UI Components
1. **Lockdown Shield Modal:** Cover overlay displayed when fullscreen is not active. It contains a "Re-enter Fullscreen and Resume" button and a warning alert.
2. **Countdown Alert View:** Text showing the seconds left before automatic termination (20 seconds countdown).

## Security Requirements
1. **SEC-5.1 (Client-side validation):** Sync API must verify if the client reports active fullscreen status. If not, reject the answer sync payload.
2. **SEC-5.2 (Extension Blocker):** Inspect window properties for common third-party overlays (e.g. extension elements) and report anomalies if foreign DOM structures are injected during execution.

## Acceptance Criteria
* **Scenario: Block copy shortcut**
  * **Given** the candidate is active inside the workspace,
  * **When** they press `Ctrl+C` or `Cmd+C` on a question,
  * **Then** the event is cancelled, no data is written to the system clipboard, and a floating badge displays `"Copy blocked"`.
* **Scenario: Terminate on 4th fullscreen exit**
  * **Given** the candidate has exited fullscreen 3 times previously,
  * **When** they exit fullscreen a 4th time,
  * **Then** the server API flags `should_terminate: true`, locks out the user interface, and submits the exam.

## Definition of Done (DoD)
* [ ] Focus loss events and key blockers tested across all target browsers (Chrome, Edge, Safari, Firefox).
* [ ] Fullscreen exit tracking logs verified in backend database tables.
* [ ] Event blockers covered by client-side Cypress / Playwright E2E tests.
* [ ] Accessibility review confirming screen reader focus remains locked during modal displays.
* [ ] Security sign-off.
