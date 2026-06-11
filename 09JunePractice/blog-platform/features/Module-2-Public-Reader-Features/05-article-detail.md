# Feature Specification: Article Detail View (Feature 2.3)

## 1. Feature Overview
This feature provides readers with a dedicated page to read a specific published blog post in its entirety. The page displays the article content, metadata, tags, and category, and loads a comments section at the bottom.

## 2. Acceptance Criteria
* **AC1:** Clicking on a post card opens the article details page at `/posts/:slug` and makes a request to `GET /api/posts/:slug`, returning a 200 OK response with the complete article content, metadata, tags, and category.
* **AC2:** Navigating to a non-existent or invalid slug returns a 404 Not Found error and shows a user-friendly error page.
* **AC3:** The article details page is fully responsive, maintaining readable typography, proper margins, and scaling images without horizontal scroll on screen widths down to 320px.

## 3. UI/UX Requirements
* **Article Layout:** A clean, single-column reading template (`col-lg-8 mx-auto`) optimized for readability:
  * **Header:** Displays title (`h1`), author username, publish date, category badge, and list of tag badges.
  * **Body:** Rendered markdown/HTML text using clean typography, styled headers (`h2`, `h3`), and responsive image handlers (`img-fluid rounded`).
  * **Divider:** A subtle horizontal divider separating the content from the comments.
* **Responsive Styling:** The design must prevent text overflow and horizontal scrolling on mobile viewports (widths down to 320px).

## 4. API Endpoints Required
* **Route:** `GET /api/posts/:slug`
* **Request Headers:** None (Public Endpoint).
* **Response Body (200 OK):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109cc",
    "title": "Introduction to React 19",
    "slug": "introduction-to-react-19",
    "description": "Learn about concurrent rendering features in React 19.",
    "content": "<p>React 19 introduces major updates...</p>",
    "category": "Development",
    "tags": ["React", "Javascript"],
    "createdAt": "2026-06-10T12:00:00Z",
    "author": {
      "username": "coder_jane"
    }
  }
  ```
* **Response Body (404 Not Found):**
  ```json
  {
    "error": "Article not found"
  }
  ```

## 5. Data Models / Schema
* Query uses the **Post Schema** defined in [03-landing-page-navigation.md](file:///d:/vibeCoding2026/09JunePractice/blog-platform/features/03-landing-page-navigation.md#L52-L62).
* Queried from MongoDB by slug: `Post.findOne({ slug: req.params.slug, status: 'Published' }).populate('author', 'username')`.

## 6. State Management Notes
* **Local Fetch State:** Fetch post details when the component mounts based on the URL parameter `:slug` (using React Router's `useParams`).
* **Clean Error Handling:** Catch 404 response errors and set state to show a "404 Page Not Found" view containing a link back to the homepage feed.

## 7. Edge Cases
* **Accessing Draft Articles via URL:** If a user manually types a slug of an article whose status is `Draft` in the URL, the API must reject the request with a `404 Not Found` to keep drafts hidden.
* **Large Content Render:** Content with extremely long paragraphs, preformatted blocks (`<pre>`), or tables must have CSS properties like `word-break: break-word` and horizontal overflow scroll bars (`table-responsive`) configured to prevent mobile screen breakage.
* **Malformed Slugs:** Slugs containing illegal characters are handled gracefully by Express parameter routing and database queries without throwing internal server exceptions.

## 8. Dependencies on Other Features
* **Feature 2.1 (Landing Page & Feed Navigation):** Readers reach this detail view by clicking on article cards displayed on the landing page.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/post.test.js`
  * Assert querying by a valid published slug returns the post details.
  * Assert querying by a draft post slug returns a 404 status code.
  * Assert querying by a non-existent slug returns a 404 status code.
* **Frontend UI Test:** `test-cases/frontend/explore.test.jsx`
  * Assert post metadata, title, and body render correctly.
  * Assert that a 404 response rendering renders the error state and a navigation link back to the homepage.

## 10. Out of Scope for This Feature
* **Reading Progress Bar:** Floating status indicators tracing scroll progress are out of scope.
* **Table of Contents:** Auto-generated inline anchors pointing to heading sections of the article are omitted.
