# Feature Specification: Author Post Management - Edit Post (Feature 4.2)

## 1. Feature Overview
This feature allows authors to modify their existing blog posts. The system pre-populates the edit form with current database values, validates the edits, handles title changes (with slug updates and collision checks), and restricts editing permissions strictly to the author who created the post.

## 2. Acceptance Criteria
* **AC1:** Clicking on an article edit button retrieves the article details and populates the edit form. Saving changes triggers `PUT /api/posts/:id`, returning a 200 OK response upon success.
* **AC2:** The API must restrict edit permissions to the post's owner; attempting to edit another author's post returns a 403 Forbidden error.
* **AC3:** If a post's title is modified, a slug collision check must run. If a post with the new slug already exists, the backend must append a unique suffix (e.g., `-1`, `-2`) to ensure slug uniqueness.

## 3. UI/UX Requirements
* **Edit Form Pre-population:** Clicking the "Edit" button on the dashboard fetches current post details and loads the form.
* **Responsive Layout:** Reuses the responsive post form layout structure described in [07-create-post.md](file:///d:/vibeCoding2026/09JunePractice/blog-platform/features/07-create-post.md#L9-L17).
* **Save & Cancel Actions:**
  * "Save Changes" button updates the post and returns the user to `/admin/dashboard`.
  * "Cancel" button discards edits and redirects to `/admin/dashboard` without executing updates.
* **Error Banner:** Displays a dark red error banner if the server rejects updates due to auth/permission issues.

## 4. API Endpoints Required
* **Route:** `PUT /api/posts/:id`
* **Request Headers:**
  * `Authorization: Bearer <JWT_TOKEN>`
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "title": "My First Blog Post - Updated",
    "description": "An updated introductory guide to blogging.",
    "content": "This is the updated full body content...",
    "category": "Technology & Design",
    "tags": ["blogging", "setup", "updates"],
    "status": "Published"
  }
  ```
* **Response Body (200 OK):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109cf",
    "title": "My First Blog Post - Updated",
    "slug": "my-first-blog-post-updated",
    "description": "An updated introductory guide to blogging.",
    "content": "This is the updated full body content...",
    "category": "Technology & Design",
    "tags": ["blogging", "setup", "updates"],
    "status": "Published",
    "author": "60d0fe4f5311236168a109ca",
    "updatedAt": "2026-06-10T15:30:00Z"
  }
  ```
* **Response Body (403 Forbidden):**
  ```json
  {
    "error": "Access Denied: You do not own this post."
  }
  ```

## 5. Data Models / Schema
* Uses the **Post Schema** defined in [03-landing-page-navigation.md](file:///d:/vibeCoding2026/09JunePractice/blog-platform/features/03-landing-page-navigation.md#L52-L62).
* Backend controller checks if the database entry's `author` matches the incoming request's authenticated user ID.

## 6. State Management Notes
* **Local State:** Stores fetched details of the post to populate inputs, tracking changed properties dynamically.
* **Validation Status:** Tracks form fields state validation. Blocks form submissions if any inputs violate rules.

## 7. Edge Cases
* **Optimistic Locking:** If another process has updated the post in the interim, notify the user or overwrite based on the "last-write-wins" policy defined in the PRD edge cases.
* **Title to Slug Conversion on Edit:** Slugs are regenerated on title change. The system must verify that the new slug does not collide with other existing articles, appending unique suffixes if a duplicate slug is found.
* **Unauthorized Direct URL Access:** If an author manually changes the ID parameter in the URL bar to an article owned by someone else, the edit form page must render an immediate "403 Forbidden - Access Denied" card instead of loading the post edit fields.

## 8. Dependencies on Other Features
* **Feature 4.1 (Create Post):** Reuses schema definitions, validation functions, and form design styles.
* **Feature 1.2 (Author Login):** Requires validation of the active JWT in request headers.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/post.test.js`
  * Assert that editing a post with owner JWT successfully updates and returns 200 OK.
  * Assert that editing a post with another user's JWT returns 403 Forbidden.
  * Assert that title modifications update slug structures and handle collision checks.
* **Frontend UI Test:** `test-cases/frontend/dashboard.test.jsx`
  * Mock post loading and verify form inputs populate correctly.
  * Assert that saving modifications redirects to dashboard.

## 10. Out of Scope for This Feature
* **Post Revision History:** Tracking versions and rolling back edits to older versions of posts are out of scope.
* **Change Diffs View:** Showing side-by-side visual comparisons of changes before committing the update is out of scope.
