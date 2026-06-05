# Feature Specification: Double-Blind Essay Grading & Moderation Portal

## Feature ID
`FEAT-012` (Priority 12)

## Purpose
Supports manual evaluation of descriptive essay answers using double-blind review principles. The portal isolates examiners' grades, evaluates score alignment, and routes conflicting marks to moderation to ensure fair grading.

## User Stories
* **US-06-02:** As a Grader, I want a grading panel where I can review descriptive essay submissions anonymously (blind grading) and apply rubrics to score them.
* **US-06-03:** As an Exam Moderator, I want the system to flag submissions where two graders assigned vastly different marks so that I can resolve discrepancies.

## Functional Requirements
1. **FR-12.1: Blind Queue Allocator:** Randomly assign descriptive responses to qualified graders. Mask all candidate personal identifiers (name, ID, email) inside the grader portal.
2. **FR-12.2: Double-Blind Isolator:** Prevent Grader A from seeing the scores or comments submitted by Grader B for the same candidate response until both grades are finalized.
3. **FR-12.3: Interactive Rubric Scorer:** Display grading rubrics (e.g. Criteria: Organization, Content, Grammar) next to the response. Allow click scoring that automatically sums and applies weighted values.
4. **FR-12.4: Moderation Arbiter:** Calculate the difference between Grader A and Grader B scores. If discrepancy exceeds $15\%$ ($BRL-006$), block finalization, mark status as `"Disputed"`, and push to the Moderator queue.

## Validation Rules
1. **VAL-12.1:** Graders cannot award a score higher than the maximum points allowed for the question.
2. **VAL-12.2:** Graders must input feedback comments of at least 30 characters when awarding less than 50% of the total points.

## Edge Cases
1. **Grader Abandonment:** Grader claims a submission but closes their browser. Release the submission lock and return it to the active grading queue after 2 hours of inactivity.
2. **Double Grader Mismatch (Identical Flawed Marks):** If both graders submit matching grades but flag a suspicious plagiarism concern, the system must allow manual escalation to moderation regardless of score matching.
3. **Third Grader Arbitration (Moderator):** If routed to moderation, the Moderator’s final score overrides both Grader A and B marks, finalizing the question score.

## Dependencies
* `FEAT-11` (Objective Auto-Grading Engine).

## API Requirements

### GET `/api/v1/grading/queue`
* **Description:** Retrieves next anonymous descriptive answer assigned to the grader.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Grader/Examiner scope)
* **Response (200 OK):**
```json
{
  "queue_item_id": "qi_99a82d-ef33",
  "question_body": "Describe the core concepts of cellular respiration.",
  "candidate_answer_text": "Cellular respiration is the process of breaking down glucose...",
  "max_points": 20,
  "rubric": [
    {"criteria": "Accuracy", "points": 10},
    {"criteria": "Grammar", "points": 10}
  ]
}
```

### POST `/api/v1/grading/submit`
* **Description:** Submits scores and feedback for a descriptive response.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Grader/Examiner scope)
* **Request Payload:**
```json
{
  "queue_item_id": "qi_99a82d-ef33",
  "assigned_scores": [
    {"criteria": "Accuracy", "awarded": 8},
    {"criteria": "Grammar", "awarded": 9}
  ],
  "feedback_notes": "Very structured. Missing minor chemical intermediates."
}
```
* **Response (200 OK):**
```json
{
  "status": "graded_recorded",
  "is_disputed": false
}
```

## Database Impact
* **Entity:** `CANDIDATE_RESPONSE` & `EXAM_SESSION`
  * Add a secondary table `MANUAL_GRADE_SUBMISSION` to track individual grader inputs (Grader ID, session response ID, score, notes).
  * Update `CANDIDATE_RESPONSE` once grading is finalized: set `awarded_score` and update `graded_by` with final reviewer signatures.

## UI Components
1. **Grader Workspace Layout:** Side-by-side view showing candidate's text on the left, and the dynamic rubric scoring board/comments box on the right.
2. **Moderator Dashboard:** Table displaying disputed candidate sessions, displaying Grader A's score, Grader B's score, discrepancy delta, and a button to launch final arbitration workspace.

## Security Requirements
1. **SEC-12.1 (Information Masking):** Strip metadata, canvas identifiers, and device details from essay answers before serving them to the grader's browser to prevent deanonymization.
2. **SEC-12.2 (Role Segregation):** Graders cannot moderate their own disputed papers. A moderator role is required to resolve disputes.

## Acceptance Criteria
* **Scenario: Route Discrepancy to Moderator Queue**
  * **Given** an essay has a maximum of 20 points,
  * **When** Grader A awards `18` points and Grader B awards `12` points (difference of $6$ points = $30\%$, exceeding $15\%$),
  * **Then** the submission is tagged as `Disputed`, blocked from final release, and appears in the Moderator arbitration panel.
* **Scenario: Smooth Finalization**
  * **When** Grader A awards `15` points and Grader B awards `16` points (within $15\%$),
  * **Then** the final score is calculated as the average (`15.5` points) and the question status is updated to `graded_final`.

## Definition of Done (DoD)
* [ ] Score discrepancy algorithm covered by unit tests.
* [ ] DB transaction operations tested under concurrency (ensure locking during updates).
* [ ] Anonymization functions verified against user profile databases.
* [ ] UI accessibility validated for screen reader users on grading form.
* [ ] Code approved by Solutions Architect.
