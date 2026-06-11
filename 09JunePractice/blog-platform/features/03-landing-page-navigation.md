# Feature Specification: Landing Page & Feed Navigation (Feature 2.1)

## 1. Feature Overview
This feature provides public readers with a clean homepage displaying a feed of published blog posts. Readers can browse through articles with pagination and filter posts dynamically by clicking on specific categories or tags.

## 2. Acceptance Criteria
* **AC1:** The landing page displays a paginated feed of published posts sorted by publication date, fetching them from `GET /api/posts` with a 200 OK response.
* **AC2:** Clicking on a specific category or tag updates the URL search parameters and dynamically filters the displayed articles, returning only posts matching that category or tag.
* **AC3:** If a category has no posts associated with it, navigating to that category shows a clean "No posts found in this category" placeholder instead of a blank page or error.

## 3. UI/UX Requirements
* **Responsive Layout:** A main container (`container`) featuring a two-column layout:
  * Left Column (`col-lg-8`): Feed displaying a list of post cards, showing title, snippet, publication date, category, tags list, and author username.
  * Right Column (`col-lg-4`): Sticky side widget containing category badges and a tag cloud.
* **Pagination Bar:** A centered pagination component (`nav aria-label="Page navigation"`) with "Previous", numeric page numbers, and "Next" buttons below the feed.
* **Loading Skeletons:** Display animated Bootstrap card skeletons while fetching articles from the backend API.

## 4. API Endpoints Required
* **Route:** `GET /api/posts?page=1&limit=6&category=categoryName&tag=tagName`
* **Request Headers:** None (Public Endpoint).
* **Response Body (200 OK):**
  ```json
  {
    "posts": [
      {
        "_id": "60d0fe4f5311236168a109cc",
        "title": "Introduction to React 19",
        "slug": "introduction-to-react-19",
        "description": "Learn about concurrent rendering features in React 19.",
        "category": "Development",
        "tags": ["React", "Javascript"],
        "createdAt": "2026-06-10T12:00:00Z",
        "author": {
          "username": "coder_jane"
        }
      }
    ],
    "currentPage": 1,
    "totalPages": 5,
    "totalPosts": 30
  }
  ```

## 5. Data Models / Schema
* **Post Schema (Mongoose):**
  * `title`: String, Required.
  * `slug`: String, Required, Unique.
  * `description`: String, Required.
  * `content`: String, Required.
  * `status`: String, Required, Enum: `['Draft', 'Published']`.
  * `category`: String, Required, Trimmed.
  * `tags`: [String], Default: `[]`.
  * `author`: ObjectId (ref: `User`), Required.

## 6. State Management Notes
* **URL-Driven State:** Filter parameters (`category`, `tag`, `page`) are read directly from URL query parameters. Changing filters updates the URL using React Router navigation, which automatically triggers a re-fetch.
* **Local Fetch State:** Track post list data, loading state, and error responses via a custom `useFetch` hook in React.

## 7. Edge Cases
* **Empty Feed:** If the database contains no published articles, display an informative, aesthetically pleasing empty state illustration saying "No articles published yet."
* **Missing Query Parameters:** If invalid query inputs are passed (e.g., negative page numbers), default to `page=1` and `limit=6`.
* **Category Deletion:** If a category contains no posts, ensure it is still listed in the sidebar widget, but clicking it displays the "No posts found in this category" placeholder.

## 8. Dependencies on Other Features
* **Feature 1.1 (Author Registration):** Relies on database schema entries for authors and posts to render feed metadata.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/post.test.js`
  * Assert `GET /api/posts` returns only posts with status `Published`.
  * Assert filtering by tag or category returns matching subsets.
  * Assert pagination returns appropriate offsets and limit page counts.
* **Frontend UI Test:** `test-cases/frontend/explore.test.jsx`
  * Render Landing Page and verify categories click event triggers navigation updates.
  * Mock empty response and assert empty placeholder card displays.

## 10. Out of Scope for This Feature
* **Admin Category Creation:** No separate interface for authors to create standalone categories; categories are registered inline during post creation.
* **Comment Counts in Preview:** Displaying count of comments on the landing page cards is omitted in this phase.
