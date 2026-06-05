# Feature Specification: Candidate Exam Workspace UI

## Feature ID
`FEAT-003` (Priority 3)

## Purpose
Delivers a responsive, accessible, distraction-free workspace interface for candidates to view exam questions, enter responses, manage test time, and execute final submission.

## User Stories
* **US-05-01:** As a Candidate, I want a clear workspace showing the active question, options, progress indicators, flag-for-review toggle, and a countdown timer.

## Functional Requirements
1. **FR-3.1: Distraction-Free Layout:** Provide a full-window layout that automatically hides traditional browser margins, navigation bars, and system dashboards when active.
2. **FR-3.2: Dynamic Question Renderer:** Render MCQs, MSQs, and Text essays dynamically based on JSON specifications, ensuring LaTeX formulas compile correctly inside the candidate workspace.
3. **FR-3.3: Global Timer & Progress Tracker:** Render a countdown timer linked to the session end time. Implement color-shifting warnings at fixed remaining-time checkpoints ($UIC-004$).
4. **FR-3.4: Navigation & Question Tray:** Display a side panel showing the grid status of all questions (Answered, Unanswered, Flagged for Review). Allow clicking to jump to questions (if Free Navigation is active).

## Validation Rules
1. **VAL-3.1:** The countdown timer must sync periodically with the server time (every 60 seconds) to prevent local system clock tampering.
2. **VAL-3.2:** Essay questions must display a running character count and block keyboard inputs once the specified limit (e.g. 5,000 characters) is reached.
3. **VAL-3.3:** Final submission requires candidates to confirm their choice in a verification dialog to prevent accidental clicks.

## Edge Cases
1. **Window Size Shrinkage:** If the browser window dimensions drop below the required resolution threshold, display a modal warning to expand the window before resuming.
2. **Double Submission:** If a candidate clicks "Submit" multiple times in quick succession, disable the submit action on the first click and show a loading spinner to prevent duplicated API calls.
3. **Asset Load Failures:** If an image embedded in a question fails to load due to momentary network issues, display a "Reload Image" button targeting only that asset, without forcing a page refresh.

## Dependencies
* `FEAT-002` (Exam Configuration & Rules Engine).

## API Requirements

### GET `/api/v1/exams/{exam_id}/session`
* **Description:** Launches or resumes an exam session and returns sanitized questions.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Candidate scope)
* **Response (200 OK):**
```json
{
  "session_id": "sess_882a-bc923",
  "exam_title": "Biology Final",
  "time_remaining_seconds": 3600,
  "navigation_mode": "free",
  "questions": [
    {
      "id": "q_1",
      "type": "mcq",
      "body": "What is the mitochondria's role?",
      "options": [
        {"id": "opt_a", "text": "Energy production"},
        {"id": "opt_b", "text": "Protein synthesis"}
      ],
      "flagged": false,
      "answered_option": null
    }
  ]
}
```

### POST `/api/v1/exams/session/{session_id}/submit`
* **Description:** Manually ends the exam session and locks further edits.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Candidate scope)
* **Response (200 OK):**
```json
{
  "status": "success",
  "submitted_at": "2026-06-05T11:29:11Z",
  "provisional_grading": "queued"
}
```

## Database Impact
* **Entity:** `EXAM_SESSION`
  * Updates session `status` from `active` to `submitted`.
  * Records `submitted_at` timestamp.

## UI Components
1. **Workspace Toolbar:** Top bar showing exam name, live countdown timer, network status indicator, and "Submit Exam" button.
2. **Sidebar Navigator:** Collapsible panel containing question number buttons color-coded by state (Gray: Unanswered, Green: Answered, Yellow: Flagged).
3. **Question Display Viewport:** Central region displaying current question body, images, input fields, and "Flag for Review" checkbox.

## Security Requirements
1. **SEC-3.1 (Context Invalidation):** Prevent inspecting elements by disabling right-click handlers and context menus.
2. **SEC-3.2 (Session Validation):** Session tokens must be validated with every API request. Disconnect user if token signature doesn't match active exam record.

## Acceptance Criteria
* **Scenario: Render MCQ options correctly**
  * **Given** a candidate has launched an exam session,
  * **When** the workspace loads,
  * **Then** the questions display with option labels (A, B, C, D) and selecting an option highlights it.
* **Scenario: Hard Close Timer Expiry**
  * **Given** the candidate is active in the workspace,
  * **When** the countdown reaches `00:00:00`,
  * **Then** the workspace locks keyboard actions, submits answers automatically, and loads the success confirmation page.

## Definition of Done (DoD)
* [ ] UI component responsive on standard laptop/desktop ratios.
* [ ] MathJax compiles inside the layout viewport cleanly.
* [ ] Confirmation dialogs and navigation controls verified manually.
* [ ] Timer synchronization verified against mock server offsets.
* [ ] Code approved by frontend lead.
