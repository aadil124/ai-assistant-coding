# Feature Specification: Reading and Submitting Comments (Feature 3.1)

## 1. Feature Overview
This feature allows public readers to view existing comments on a blog post and submit their own comments. Submitting a comment requires entering a reader name and comment body. Comments are listed chronologically below the article content.

## 2. Acceptance Criteria
* **AC1:** The article page makes a request to `GET /api/posts/:postId/comments` and displays all associated comments in chronological order.
* **AC2:** Submitting the comment form makes a request to `POST /api/posts/:postId/comments` with the reader's name and comment body, returning a 201 Created response.
* **AC3:** The comment submission form validates that both name and comment body are not empty, preventing form submission and displaying an inline validation message if either field is missing.

## 3. UI/UX Requirements
* **Comments List:** Displays below the article text within a `.mt-5` section. Each comment card shows commenter name, post date, and comment text.
* **Comment Form:**
  * Inputs: Reader Name (`input type="text"`), Comment Body (`textarea`).
  * Styled with Bootstrap form validation classes (`form-control`, `is-invalid`).
  * Action: A "Submit Comment" button (`btn btn-primary`) that transitions to a disabled loading state during request transit.
* **Response Feedback:** Displays a green success banner (`alert alert-success`) briefly when a comment is successfully posted.

## 4. API Endpoints Required
* **Route:** `GET /api/posts/:postId/comments`
* **Request Headers:** None (Public Endpoint).
* **Response Body (200 OK):**
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109ce",
      "post": "60d0fe4f5311236168a109cc",
      "name": "Jane Reader",
      "content": "This is a great write-up on React 19!",
      "createdAt": "2026-06-10T14:30:00Z"
    }
  ]
  ```
* **Route:** `POST /api/posts/:postId/comments`
* **Request Headers:**
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "name": "Jane Reader",
    "content": "This is a great write-up on React 19!"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109ce",
    "post": "60d0fe4f5311236168a109cc",
    "name": "Jane Reader",
    "content": "This is a great write-up on React 19!",
    "createdAt": "2026-06-10T14:30:00Z"
  }
  ```

## 5. Data Models / Schema
* **Comment Schema (Mongoose):**
  * `post`: ObjectId (ref: `Post`), Required.
  * `name`: String, Required, Trimmed.
  * `content`: String, Required, Trimmed.
  * `createdAt`: Date, Default: `Date.now`.

## 6. State Management Notes
* **Local State:** Form input values (`name`, `content`), validation errors, loading state, and the array of comments loaded for the active article slug are stored in the local state of the comment section component.
* **Update Strategy:** Upon successful `POST /api/posts/:postId/comments` API response, prepend or append the newly returned comment object directly to the local comments array state to instantly render the comment without reloading the page.

## 7. Edge Cases
* **Post Deletion Cascade:** When an article is deleted by an author, ensure the backend deletes all comment records pointing to that post's ObjectId to prevent database clutter.
* **XSS Validation:** Escape and sanitize inputs on both the frontend and backend to block scripts or malicious HTML tags from being submitted and executed within reader browsers.
* **Empty Comments Handling:** The backend must return a `400 Bad Request` if `name` or `content` contains only whitespaces.

## 8. Dependencies on Other Features
* **Feature 2.3 (Article Detail View):** The comment widget is embedded at the bottom of the article details view.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/comment.test.js`
  * Assert posting a comment returns a 201 status code and the created record.
  * Assert validation errors are returned for missing/empty fields.
  * Assert comments list returns records in chronological order.
* **Frontend UI Test:** `test-cases/frontend/explore.test.jsx`
  * Render details page, type into comment fields, and submit. Assert mock comment is added to DOM.
  * Test submit action when fields are empty; verify validation error styles display.

## 10. Out of Scope for This Feature
* **Nested Thread Replies:** Direct comment replies or multi-level nested discussions are out of scope.
* **Comment Editing/Deletion:** No features for readers or authors to edit or delete comments once they are posted.
* **Gravatar/Avatar integration:** Displaying user profile photos alongside reader names is out of scope.
