# Feature Specification: Objective Auto-Grading Engine

## Feature ID
`FEAT-011` (Priority 11)

## Purpose
Enables immediate, zero-latency calculation of candidate scores for objective questions (MCQs, Multi-Selects, Short Text Fill-ins) immediately upon exam submission.

## User Stories
* **US-06-01:** As an Examiner, I want objective questions (MCQs, short text) auto-graded instantly upon exam submission so that grading effort is reduced.

## Functional Requirements
1. **FR-11.1: MCQ/MSQ Matcher:** Match candidate response ID arrays against correct key answers. Award points based on exact matching logic.
2. **FR-11.2: Partial Credit Rule Calculator:** Compute partial points for MSQs based on configured settings:
   * **All-or-Nothing:** Points awarded *only* if all selected options are correct and no incorrect options are picked.
   * **Partial credit with penalty:** Award fractional points for correct selections and deduct fractional points for incorrect selections.
3. **FR-11.3: Normalizing Short Answer Matcher:** Grade short-text questions by trimming leading/trailing whitespace, ignoring character casing (lower/upper case), and applying regex matching algorithms.
4. **FR-11.4: Aggregation Pipeline:** Summarize all objective scores, write records to the session database, and flag exams containing essay questions as "Awaiting Grading".

## Validation Rules
1. **VAL-11.1:** Awarded points for a question cannot be negative (even with incorrect penalties applied), unless the exam rules explicitly enable negative grading.
2. **VAL-11.2:** Auto-grading calculations must run strictly on the secure backend server. Client-side score computations are prohibited.

## Edge Cases
1. **Short Answer Spelling Variations:** Candidate inputs a correct response with minor typos (e.g. "mitocondria" instead of "mitochondria"). The engine matches spelling using Levenshtein distance: if distance $\le 2$ characters and config allows, auto-award partial marks or flag for quick manual review.
2. **Missing Answers:** If a candidate leaves questions blank, record their response as `null` and award `0` points without raising evaluation loop exceptions.
3. **Updated Answer Keys Post-Exam:** If an examiner updates a question's correct option *after* the exam has finished, the system must support manual execution of a reprocessing script to re-grade all submissions.

## Dependencies
* `FEAT-04` (Resilient Local Autosave & Sync Engine).

## API Requirements

### POST `/api/v1/exams/session/{session_id}/grade`
* **Description:** Backend-triggered API that runs the auto-grading pipeline.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (System/Admin scope)
* **Response (200 OK):**
```json
{
  "session_id": "sess_882a-bc923",
  "status": "graded_provisional",
  "objective_score": 45,
  "total_objective_questions": 10,
  "requires_manual_grading": true
}
```

## Database Impact
* **Entity:** `CANDIDATE_RESPONSE` & `EXAM_SESSION`
  * Updates `CANDIDATE_RESPONSE` table: updates `awarded_score` and sets `graded_by` to `'auto'`.
  * Updates `EXAM_SESSION` table: updates `total_score` (sum of auto-graded items).

## UI Components
1. **Candidate Results Summary Page:** Simple card layout displaying score metrics (e.g., "Objective Score: 18/20"), pass/fail status, and a notice if essay grading is still pending.
2. **Examiner Grade Preview Panel:** Detailed table showing questions, selected candidate answers, correct answers, and points awarded, with manual override inputs.

## Security Requirements
1. **SEC-11.1 (Leakage Prevention):** Correct answers must never be sent to the candidate browser before they submit their exam.
2. **SEC-11.2 (Tamper Prevention):** Lock database tables once the exam session status is marked `submitted`, preventing further automated edits unless authorized.

## Acceptance Criteria
* **Scenario: Grade MCQ Question Correctly**
  * **Given** a candidate submits an MCQ response selecting Option A,
  * **When** Option A is the correct answer key in the database (weight = 5 points),
  * **Then** the auto-grader awards `5` points and writes `"auto"` to the `graded_by` column.
* **Scenario: Partial grading on MSQ**
  * **Given** an MSQ has correct options [A, B] (total 4 points),
  * **When** a candidate selects [A, C],
  * **Then** the grader awards `2` points for A, deducts `2` points for C, resulting in a net score of `0` points.

## Definition of Done (DoD)
* [ ] Auto-grading logic tested with unit test coverage of 100% of mathematical pathways.
* [ ] String matching normalization functions verified against common typo/case test suites.
* [ ] Database isolation locks confirmed during exam submission.
* [ ] Regression scripts for re-grading published exam sets verified.
* [ ] Code approved by Lead QA.
