# Feature Specification: Author Post Management - Create Post (Feature 4.1)

## 1. Feature Overview
This feature allows logged-in authors to create new blog posts via an Admin Dashboard. Authors can write titles, descriptions, and article contents, assign categories and tags, and save posts either as drafts or publish them immediately.

## 2. Acceptance Criteria
* **AC1:** The post creation page allows the author to fill in title, description, content, tags, category, and select a status (Draft/Published).
* **AC2:** Submitting a new post sends a request to `POST /api/posts` with the author's JWT in the Authorization header. If successful, it returns 201 Created and saves the post with a unique, automatically generated slug.
* **AC3:** Attempting to create a post without a title, content, or category returns a 400 Bad Request with a clear validation error from the backend.

## 3. UI/UX Requirements
* **Create Form Layout:** A responsive, structured form page (`col-lg-10 mx-auto`) with:
  * Text inputs for **Title** and **Description**.
  * Rich-text editor or simple Markdown Textarea for **Content**.
  * Input for **Category** and comma-separated **Tags**.
  * Dropdown/Select for **Status** (`Draft` or `Published`).
  * Action Buttons: A primary "Create Post" button and a secondary "Cancel" button linking back to the dashboard.
* **Validation Feedback:** Highlight missing required fields (Title, Category, Content) with Bootstrap `.is-invalid` indicator classes and display descriptive error messages.
* **Loading State:** The submit button must disable and show a spinner during active network transit.

## 4. API Endpoints Required
* **Route:** `POST /api/posts`
* **Request Headers:**
  * `Authorization: Bearer <JWT_TOKEN>`
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "title": "My First Blog Post",
    "description": "An introductory guide to blogging.",
    "content": "This is the full body content...",
    "category": "Technology",
    "tags": ["blogging", "setup"],
    "status": "Published"
  }
  ```
* **Response Body (201 Created):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109cf",
    "title": "My First Blog Post",
    "slug": "my-first-blog-post",
    "description": "An introductory guide to blogging.",
    "content": "This is the full body content...",
    "category": "Technology",
    "tags": ["blogging", "setup"],
    "status": "Published",
    "author": "60d0fe4f5311236168a109ca",
    "createdAt": "2026-06-10T15:00:00Z"
  }
  ```
* **Response Body (400 Bad Request):**
  ```json
  {
    "error": "Title, category, and content are required fields."
  }
  ```

## 5. Data Models / Schema
* Uses the **Post Schema** defined in [03-landing-page-navigation.md](file:///d:/vibeCoding2026/09JunePractice/blog-platform/features/03-landing-page-navigation.md#L52-L62).
* Mongoose schema triggers an automatic slugification middleware or helper upon database saving:
  `this.slug = slugify(this.title, { lower: true, strict: true })`.

## 6. State Management Notes
* **Local State:** Stores values of form inputs, list of tags, validation error arrays, and loading spinners.
* **Redirection:** Upon successful creation (status 201), redirect the user back to `/admin/dashboard`.

## 7. Edge Cases
* **Duplicate Title Slugs:** If another article has already claimed the generated slug (e.g., `my-first-blog-post`), the backend must identify the collision and automatically append a numeric index (e.g., `my-first-blog-post-1`) to resolve the conflict before saving.
* **Token Expiration:** If the author's JWT expires during writing, auto-save the form contents to the browser's `localStorage` and display a modal login window to prevent content loss.
* **HTML Content Injection:** Sanitize the submitted article content on the backend using libraries like `sanitize-html` to prevent malicious scripts from being stored.

## 8. Dependencies on Other Features
* **Feature 1.2 (Author Login):** Creating a post requires a valid JWT from the login session.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/post.test.js`
  * Assert that creating a post with valid data and a JWT returns a 201 status code and the created post.
  * Assert validation errors are returned for missing required fields.
  * Assert that slug collision resolution works and generates unique suffixes.
* **Frontend UI Test:** `test-cases/frontend/dashboard.test.jsx`
  * Mock successful creation request and verify redirection to dashboard.
  * Check validation errors display on submit click with empty required fields.

## 10. Out of Scope for This Feature
* **Media Uploads:** Directly uploading and hosting images/videos on the server is out of scope.
* **Auto-Save Drafts on Server:** Periodically posting writing progress to the server is out of scope; only local draft storage is supported.
