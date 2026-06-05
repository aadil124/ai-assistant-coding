# Feature Specification: Exam Configuration & Rules Engine

## Feature ID
`FEAT-002` (Priority 2)

## Purpose
Allows examiners to package questions into timed, structured examinations. The feature manages rules such as total exam duration, passing thresholds, randomization of question presentation, and candidate navigation parameters.

## User Stories
* **US-04-02:** As an Examiner, I want to configure an exam with specific rules (e.g., duration, randomized question selection from a pool, randomized option order, navigation rules) to prevent question leakage.

## Functional Requirements
1. **FR-2.1: Rule Configuration interface:** Examiners shall configure metadata for exams: title, description, time limit (minutes), start window (UTC timestamp range), pass score percentage.
2. **FR-2.2: Question Randomization & Pools:** The engine shall support two assembly options:
   * **Static selection:** Specific selected questions are assigned to all candidates.
   * **Dynamic pooling:** Questions are chosen dynamically from the bank using tags (e.g., "Select 5 medium difficulty questions tagged with 'Calculus'").
3. **FR-2.3: Option Randomization:** The exam engine must randomize the order of MCQ/MSQ answer options per candidate to prevent cheat sharing.
4. **FR-2.4: Navigation Constraints:** Provide a toggle switch between:
   * **Free Navigation:** Candidate can move back and forth between questions.
   * **Sequential Navigation:** Candidate must answer and proceed; returning to previous questions is disabled.

## Validation Rules
1. **VAL-2.1:** Exam duration must be set between 5 and 300 minutes.
2. **VAL-2.2:** The pass score percentage must be between 1% and 100%.
3. **VAL-2.3:** The exam validity window's start time must be in the future, and end time must be at least 30 minutes after start time.
4. **VAL-2.4:** **Pool Size Rule:** The number of questions requested from a dynamic tag filter must be $\le 50\%$ of the total questions matching that tag in the bank, ensuring adequate entropy per candidate.

## Edge Cases
1. **Empty Pool Selection:** If an examiner configures a dynamic question pool with criteria that yield zero matches in the bank, the builder must raise an error and block exam publication.
2. **Dynamic Modification:** If an exam is modified while candidates are active, the changes must only apply to new sessions. Active sessions must run under the cached configuration snapshot.
3. **Timer Mismatch:** If a candidate opens their exam exactly 5 minutes before the exam window end date, the system must enforce the *earlier* limit (meaning they get 5 minutes, not the full exam duration).

## Dependencies
* `FEAT-001` (Assessment Authoring & Question Bank).

## API Requirements

### POST `/api/v1/exams`
* **Description:** Creates an exam configuration.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Examiner/Admin scope)
* **Request Payload:**
```json
{
  "title": "Introduction to Geometry",
  "duration_minutes": 60,
  "pass_threshold_percent": 70,
  "start_window": "2026-06-15T09:00:00Z",
  "end_window": "2026-06-15T18:00:00Z",
  "navigation_mode": "free",
  "randomize_options": true,
  "rules": [
    {
      "pool_type": "dynamic",
      "tag": "Geometry-1",
      "difficulty": "Medium",
      "count": 10
    }
  ]
}
```
* **Response (201 Created):**
```json
{
  "status": "success",
  "exam_id": "ex_8820c74f-9011-477d-94bb-731726a8d29b"
}
```

## Database Impact
* **Entity:** `EXAM`
  * Add indexed columns for `start_window` and `end_window` to optimize filtering of upcoming and current exams.
  * Store lockdown configurations and navigation properties in a flexible JSONB column named `lockdown_config`.

## UI Components
1. **Exam Configuration Workspace:** Tabbed setup form covering general details, rules configuration, and security settings.
2. **Dynamic Pool Rule Builder:** Row-based rule adder allowing examiners to select tag dropdowns, difficulty levels, and question counts with immediate availability counters.

## Security Requirements
1. **SEC-2.1 (Authorization Check):** Restrict POST/PUT endpoints to authenticated users carrying the `Examiner` role mapping.
2. **SEC-2.2 (Resource Exhaustion Prevention):** Validate `count` values in dynamic rules to prevent massive database sweeps. Cap total exam questions at 200 per session.

## Acceptance Criteria
* **Scenario: Publish Exam Configuration with Depleted Pools**
  * **Given** an Examiner creates an exam rule requesting 10 questions tagged `"Algebra"`,
  * **When** the Question Bank only contains 5 questions matching `"Algebra"`,
  * **Then** the API rejects the request with status `400 Bad Request` and message `"Insufficient questions in pool 'Algebra' (5 available, 10 requested)"`.
* **Scenario: Successfully Create Exam Configuration**
  * **Given** an Examiner enters valid configurations,
  * **When** they click "Publish Exam",
  * **Then** the config saves in the database and returns a unique `exam_id`.

## Definition of Done (DoD)
* [ ] Database migrations executed.
* [ ] API endpoints verified with integration tests.
* [ ] Validation criteria written as unit tests.
* [ ] Dynamic pool validation verified using mock databases.
* [ ] Code reviewed and approved.
