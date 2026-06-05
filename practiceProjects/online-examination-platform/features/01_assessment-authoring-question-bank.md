# Feature Specification: Assessment Authoring & Question Bank

## Feature ID
`FEAT-001` (Priority 1)

## Purpose
Enables subject matter experts and examiners to create, edit, organize, tag, and preview assessment items (questions) in a centralized question bank. This serves as the foundation for exam generation.

## User Stories
* **US-04-01:** As an Examiner, I want to create and organize questions by tag, difficulty, and type in a central Question Bank so that I can reuse them across multiple exams.

## Functional Requirements
1. **FR-1.1: Question CRUD Operations:** The system shall support creating, reading, updating, and deleting questions. Deleted questions shall be soft-deleted to avoid breaking historical student submissions.
2. **FR-1.2: Support for Multiple Question Types:** The question bank must support:
   * Multiple Choice Questions (MCQ) with single correct answers.
   * Multi-Select Questions (MSQ) with multiple correct answers.
   * Essay / Free-text questions.
   * Code execution / coding sandbox questions (metadata-driven).
3. **FR-1.3: Rich Text & Media Editor:** Provide a WYSIWYG editor supporting:
   * Markdown formatting.
   * LaTeX math formulas (parsed using MathJax/KaTeX).
   * Image uploads (with automatic format conversion and compression).
4. **FR-1.4: Tagging & Metadata Classification:** Every question must support mapping to tags (e.g., "Organic Chemistry", "Midterm"), difficulty level (Easy, Medium, Hard), and point value weight.

## Validation Rules
1. **VAL-1.1:** An MCQ/MSQ question must contain at least 2 and at most 10 options.
2. **VAL-1.2:** An MCQ question must have exactly 1 option marked as correct. An MSQ question must have $\ge 1$ option marked as correct.
3. **VAL-1.3:** Question body text cannot be empty and must be between 10 and 10,000 characters.
4. **VAL-1.4:** Tag inputs must be alphanumeric, maximum 30 characters per tag, and maximum 10 tags per question.

## Edge Cases
1. **LaTeX Parsing Failures:** If a user inputs invalid LaTeX notation (e.g., mismatching delimiters like `$$`), the UI preview must display an inline syntax error rather than breaking the application render cycle.
2. **Orphaned Media Files:** If a user uploads an image to a draft question but cancels creation, the temporary media files must be deleted from S3 via a weekly cleanup cron job.
3. **Updating a Live Question:** If an examiner edits a question currently assigned to an active, ongoing exam, the system must create a *new version* of the question rather than modifying the active test item in-place.

## Dependencies
* None (Core bootstrap feature).

## API Requirements

### GET `/api/v1/questions`
* **Description:** Retrieves paginated questions with filtering.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>` (Examiner/Admin scope)
* **Query Params:** `page` (default 1), `limit` (default 20), `tag`, `difficulty`, `type`
* **Response (200 OK):**
```json
{
  "total_items": 145,
  "total_pages": 8,
  "current_page": 1,
  "questions": [
    {
      "id": "q_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "type": "mcq",
      "body": "Solve for $x$: $2x + 5 = 15$.",
      "difficulty": "Easy",
      "tags": ["Math", "Algebra"],
      "points": 5,
      "created_at": "2026-06-05T11:29:11Z"
    }
  ]
}
```

### POST `/api/v1/questions`
* **Description:** Creates a new question in the bank.
* **Request Payload:**
```json
{
  "type": "mcq",
  "body": "Solve for $x$: $2x + 5 = 15$.",
  "difficulty": "Easy",
  "tags": ["Math", "Algebra"],
  "points": 5,
  "options": [
    {"id": "opt_1", "text": "5", "is_correct": true},
    {"id": "opt_2", "text": "10", "is_correct": false}
  ],
  "rubric_notes": "Verify solving algebraic equations."
}
```
* **Response (201 Created):**
```json
{
  "status": "success",
  "question_id": "q_9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

## Database Impact
* **Entity:** `QUESTION`
  * Add a GIN Index on the JSONB fields containing options and tags for fast keyword searches.
  * Add an integer column `version` (default 1) to support versioning on modification of assigned questions.
  * Add boolean column `is_deleted` (default false) to represent soft-deletes.

## UI Components
1. **Question List Dashboard:** Displays list of questions with column filters for tags and types.
2. **WYSIWYG Input Area:** Split-screen layout showing Markdown/LaTeX inputs on the left and a live HTML/MathJax rendered preview on the right.
3. **Options Builder:** Dynamic form fields allowing options addition, deletion, and radio-button selection for marking correctness.

## Security Requirements
1. **SEC-1.1 (RBAC):** Restrict all POST, PUT, DELETE operations on `/api/v1/questions` to users with role `Examiner` or `Admin`.
2. **SEC-1.2 (XSS Prevention):** Sanitize markdown input strings using an HTML sanitizer library (e.g., DOMPurify) before saving to the database.
3. **SEC-1.3 (S3 Upload Security):** Image uploads must be validated for magic file headers (JPEG, PNG, WebP) and limited to 5MB to prevent arbitrary script execution.

## Acceptance Criteria
* **Scenario: Create an MCQ Question Successfully**
  * **Given** an authorized user logged in as an `Examiner` on the question creator page,
  * **When** they fill in the body with `"Determine the derivative of $f(x) = x^2$"`, set difficulty to `"Medium"`, add tags `["Calculus"]`, input options `["2x", "x", "2"]`, and set `"2x"` as correct,
  * **And** click the "Save" button,
  * **Then** the database inserts a new record with status code `201` and returns the question ID.
* **Scenario: Prevent saving MCQ without correct answer**
  * **Given** an Examiner creates an MCQ question,
  * **When** they add options but do not mark any option as `is_correct`,
  * **Then** the UI blocks submission, displaying a validation alert: `"At least one correct answer must be chosen."`

## Definition of Done (DoD)
* [ ] APIs unit tested with coverage $\ge 85\%$.
* [ ] Input fields completely validated and sanitized against XSS.
* [ ] MathJax/LaTeX preview verified visually across Chrome, Edge, and Safari.
* [ ] Database migrations created and verified in Local staging.
* [ ] Peer code review signed off.
