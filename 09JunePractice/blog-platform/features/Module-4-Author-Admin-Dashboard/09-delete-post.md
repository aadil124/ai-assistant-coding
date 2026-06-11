# Feature Specification: Author Post Management - Delete Post (Feature 4.3)

## 1. Feature Overview
This feature allows authors to permanently delete their own posts from the database via the Admin Dashboard. A security confirmation dialog is prompted before the action is executed, and deleting an article cascades to remove all associated reader comments.

## 2. Acceptance Criteria
* **AC1:** Clicking the delete button triggers a confirmation dialog; confirming the deletion sends a request to `DELETE /api/posts/:id` with the JWT in the header.
* **AC2:** The backend restricts deletion to the owner; attempting to delete another author's post returns a 403 Forbidden error.
* **AC3:** Upon successful deletion (200 OK or 204 No Content), the post is immediately removed from the admin dashboard list and is no longer accessible via public paths.

## 3. UI/UX Requirements
* **Action Trigger:** A delete button (`btn btn-danger`) displays next to each post on the Admin Dashboard article table.
* **Confirmation Dialog:** Clicking the delete trigger shows a confirmation modal modal window (`modal show`). It prompts "Are you sure you want to permanently delete this article? This action cannot be undone."
* **Immediate Feedback:** Upon confirmation, the modal closes, the deleted article fades out of the dashboard post list via client state updates, and a toast/banner informs the author of successful deletion.

## 4. API Endpoints Required
* **Route:** `DELETE /api/posts/:id`
* **Request Headers:**
  * `Authorization: Bearer <JWT_TOKEN>`
* **Response Body (200 OK):**
  ```json
  {
    "message": "Post successfully deleted."
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
* Cascading deletion must clean up comments:
  ```javascript
  // Pre-remove hook on Post schema or delete controller logic
  await Comment.deleteMany({ post: req.params.id });
  ```

## 6. State Management Notes
* **Local State Update:** Filter out the deleted post's ID from the dashboard's active post array in state (`setPosts(posts.filter(p => p._id !== deletedId))`) upon successful API deletion.

## 7. Edge Cases
* **Cascade Orphans:** If comments are not successfully deleted due to database interruptions, rollback the transaction or log the event, ensuring that comments are not left orphaned without a post association.
* **Post Already Deleted:** If a user clicks delete on an article that has already been deleted in another window, return a `404 Not Found` response code and update the frontend view accordingly.
* **Attempting to Delete Another's Post:** Direct API calls targeting another author's post ID must be rejected by the backend logic with a 403 Forbidden response.

## 8. Dependencies on Other Features
* **Feature 1.2 (Author Login):** Requires validation of the author's JWT signature in the header.
* **Feature 3.1 (Comments):** Requires cascading database hook updates to clean up associated comments.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/post.test.js`
  * Assert deleting a post with correct owner JWT returns a 200 OK response and deletes database records.
  * Assert comments pointing to the deleted post ID are removed.
  * Assert deleting a post with another user's JWT returns 403 Forbidden.
* **Frontend UI Test:** `test-cases/frontend/dashboard.test.jsx`
  * Click delete and confirm. Assert modal functions and post is removed from dashboard table list.

## 10. Out of Scope for This Feature
* **Recycle Bin / Soft Delete:** Moving items to a temporary recycle bin where they can be restored is out of scope. Deletions are hard, permanent database deletions.
