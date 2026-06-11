# Feature Specification: Article Search (Feature 2.2)

## 1. Feature Overview
This feature allows readers to search for published blog posts. The landing page features a search bar that executes a keyword query against titles and descriptions, updating the posts feed dynamically.

## 2. Acceptance Criteria
* **AC1:** Typing a query into the search bar and submitting it executes a query to `GET /api/posts?search=query` and returns matching articles based on title or description.
* **AC2:** The search results dynamically update to show matching articles within 300ms of typing a query (debounce limit) or upon submitting the form.
* **AC3:** If no articles match the search query, the UI displays a "No results found for '[query]'" message.

## 3. UI/UX Requirements
* **Search Input:** A clean search input box situated in the navigation bar or at the top of the homepage feed, styled with Bootstrap input group styling (`input-group`, `form-control`).
* **Interactive Clear Button:** A clickable "x" icon inside the search input to quickly clear the active query.
* **Inline Indicators:** Display search-specific feedback, such as "Showing results for '[query]'" with a button to reset the search state.

## 4. API Endpoints Required
* **Route:** `GET /api/posts?search=queryKeyword`
* **Request Headers:** None (Public Endpoint).
* **Response Body (200 OK):**
  * Same response structure as defined in [03-landing-page-navigation.md](file:///d:/vibeCoding2026/09JunePractice/blog-platform/features/03-landing-page-navigation.md#L30-L50) containing only matching articles.

## 5. Data Models / Schema
* Query uses the **Post Schema** defined in [03-landing-page-navigation.md](file:///d:/vibeCoding2026/09JunePractice/blog-platform/features/03-landing-page-navigation.md#L52-L62).
* Backend controller uses a regex match or database text index search:
  ```javascript
  const searchQuery = {
    status: 'Published',
    $or: [
      { title: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } }
    ]
  };
  ```

## 6. State Management Notes
* **Debounced State:** Implement a custom debounce hook in React to delay execution of search parameter changes by 300ms, preventing heavy API load on active user typing.
* **Search Query Sync:** The search query is synced with the URL query parameters (e.g., `?search=myquery`) to support link sharing and browser navigation.

## 7. Edge Cases
* **Special Characters:** Sanitize the search query string on the backend to prevent regex injection attacks (e.g., handling inputs like `.*` or `?`).
* **Whitespace-Only Queries:** If the user enters only spaces, ignore the search modifier and treat it as a standard feed listing.
* **No Match Cases:** When no posts correspond to the keyword, output a card with text "No results found for '[query]'. Try checking your spelling or searching another category."

## 8. Dependencies on Other Features
* **Feature 2.1 (Landing Page & Feed Navigation):** Relies on the homepage layout and post card grid component to display query results.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/post.test.js`
  * Assert searching returns partial matches for titles.
  * Assert searching returns partial matches for descriptions.
  * Assert case-insensitive matching works.
* **Frontend UI Test:** `test-cases/frontend/explore.test.jsx`
  * Simulate typing in search bar and verify API calls are debounced by 300ms.
  * Assert the "No results found" warning displays when the API returns an empty list.

## 10. Out of Scope for This Feature
* **Full-text indexing search weights:** Multi-field weighted scoring is out of scope.
* **Type-ahead suggestions:** No dropdown autocomplete lists displaying suggestions dynamically under the search bar.
