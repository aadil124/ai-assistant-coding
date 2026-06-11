## Module 1: Authentication & Onboarding

### Feature 1.1: Author Registration
- AC1: Registering with a unique email, username, and password via `POST /api/auth/register` returns a status code of 201 Created, user details, and a JSON Web Token (JWT).
- AC2: Attempting to register with an already existing email or username returns a 400 Bad Request status code with a descriptive validation error message.
- AC3: The registration endpoint returns a 400 Bad Request when mandatory fields (email, username, password) are missing or invalidly formatted.

### Feature 1.2: Author Login / Authentication
- AC1: Submitting correct credentials to `POST /api/auth/login` returns a 200 OK status code, user details, and a valid JWT.
- AC2: Submitting incorrect or nonexistent credentials returns a 401 Unauthorized status code and an appropriate error message.
- AC3: The frontend successfully reads the JWT from the login response and stores it securely, redirecting the authenticated author to the dashboard page `/admin/dashboard`.

## Module 2: Public Reader Features

### Feature 2.1: Landing Page & Feed Navigation (Categories & Tags)
- AC1: The landing page displays a paginated feed of published posts sorted by publication date, fetching them from `GET /api/posts` with a 200 OK response.
- AC2: Clicking on a specific category or tag updates the URL search parameters and dynamically filters the displayed articles, returning only posts matching that category or tag.
- AC3: If a category has no posts associated with it, navigating to that category shows a clean "No posts found in this category" placeholder instead of a blank page or error.

### Feature 2.2: Article Search
- AC1: Typing a query into the search bar and submitting it executes a query to `GET /api/posts?search=query` and returns matching articles based on title or description.
- AC2: The search results dynamically update to show matching articles within 300ms of typing a query (debounce limit) or upon submitting the form.
- AC3: If no articles match the search query, the UI displays a "No results found for '[query]'" message.

### Feature 2.3: Article Detail View
- AC1: Clicking on a post card opens the article details page at `/posts/:slug` and makes a request to `GET /api/posts/:slug`, returning a 200 OK response with the complete article content, metadata, tags, and category.
- AC2: Navigating to a non-existent or invalid slug returns a 404 Not Found error and shows a user-friendly error page.
- AC3: The article details page is fully responsive, maintaining readable typography, proper margins, and scaling images without horizontal scroll on screen widths down to 320px.

## Module 3: Article Comments

### Feature 3.1: Reading and Submitting Comments
- AC1: The article page makes a request to `GET /api/posts/:postId/comments` and displays all associated comments in chronological order.
- AC2: Submitting the comment form makes a request to `POST /api/posts/:postId/comments` with the reader's name and comment body, returning a 201 Created response.
- AC3: The comment submission form validates that both name and comment body are not empty, preventing form submission and displaying an inline validation message if either field is missing.

## Module 4: Author Admin Dashboard

### Feature 4.1: Author Post Management (Create Post)
- AC1: The post creation page allows the author to fill in title, description, content, tags, category, and select a status (Draft/Published).
- AC2: Submitting a new post sends a request to `POST /api/posts` with the author's JWT in the Authorization header. If successful, it returns 201 Created and saves the post with a unique, automatically generated slug.
- AC3: Attempting to create a post without a title, content, or category returns a 400 Bad Request with a clear validation error from the backend.

### Feature 4.2: Author Post Modification (Edit Post)
- AC1: Clicking on an article edit button retrieves the article details and populates the edit form. Saving changes triggers `PUT /api/posts/:id`, returning a 200 OK response upon success.
- AC2: The API must restrict edit permissions to the post's owner; attempting to edit another author's post returns a 403 Forbidden error.
- AC3: If a post's title is modified, a slug collision check must run. If a post with the new slug already exists, the backend must append a unique suffix (e.g., `-1`, `-2`) to ensure slug uniqueness.

### Feature 4.3: Author Post Deletion (Delete Post)
- AC1: Clicking the delete button triggers a confirmation dialog; confirming the deletion sends a request to `DELETE /api/posts/:id` with the JWT in the header.
- AC2: The backend restricts deletion to the owner; attempting to delete another author's post returns a 403 Forbidden error.
- AC3: Upon successful deletion (200 OK or 204 No Content), the post is immediately removed from the admin dashboard list and is no longer accessible via public paths.
