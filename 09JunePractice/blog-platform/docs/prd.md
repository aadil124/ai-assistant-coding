## Problem Statement

Content creation online is often fragmented or overly complex. Aspiring writers and domain experts lack a simple, lightweight, and modern platform to publish their thoughts, organize their articles by categories, and engage with their readers. Conversely, readers struggle to find clean, responsive interfaces that allow them to search, filter, and read content without being bombarded by paywalls, intrusive ads, or complex navigation. There is a clear need for a focused, responsive blogging application that bridges the gap between authors seeking an intuitive publishing workflow and readers looking for a high-quality reading experience.

## Solution Overview

The Blog-Platform is a responsive, modern web application designed to host, explore, and manage blog posts. 
For public readers, it provides a clean, responsive interface to browse articles, explore tags and categories, search for content, and participate in discussion via comments.
For registered authors, it offers a secure login system and a dedicated admin dashboard where they can create, draft, edit, publish, and delete their own posts, as well as manage user engagement on their articles. The solution focuses on visual excellence, smooth UX, and robust performance, without incorporating payment gateways or complex e-commerce features.

## User Flow

### 1. Public Reader Flow
* **Landing Page:** The user visits the homepage, which features a hero section with featured articles, a clean navigation bar, a search bar, and category filters.
* **Search & Filter:** The user types queries into the search bar or clicks on a category/tag. The feed updates dynamically to show matching articles.
* **Read Article:** The user clicks an article card, opening the article detail page. The page displays the content, author metadata, tags, and a comments section.
* **Write Comment:** The user can write a comment on the article by entering their name and comment body.

### 2. Author Onboarding & Authentication Flow
* **Registration/Login:** A user accesses the `/login` route. If they don't have an account, they can sign up as an author.
* **Authentication:** Upon successful authentication, a JWT is issued, and the user is redirected to the Admin Dashboard.

### 3. Author Admin Dashboard Flow
* **Dashboard Home:** Shows a list of the author's own articles (draft and published status), view counts, and recent comments.
* **Create Post:** The author clicks "New Post," writes the title, description, content (with rich text/markdown support), assigns tags, selects a category, and sets the state (Draft or Published).
* **Edit/Update Post:** The author modifies existing posts and updates the publish status.
* **Delete Post:** The author can delete their own posts, which removes them from both the dashboard and the public site.

## API Design

### Authentication Endpoints
* `POST /api/auth/register` - Registers a new author. Returns user details and JWT.
* `POST /api/auth/login` - Authenticates an author. Returns user details and JWT.

### Articles/Posts Endpoints
* `GET /api/posts` - Returns a paginated list of published posts (supports `search`, `category`, and `tag` query parameters).
* `GET /api/posts/:slug` - Returns details of a single published post.
* `POST /api/posts` - Creates a new post (Auth required).
* `PUT /api/posts/:id` - Updates an existing post (Auth required, owner only).
* `DELETE /api/posts/:id` - Deletes a post (Auth required, owner only).
* `GET /api/author/posts` - Returns all posts by the logged-in author (Auth required).

### Categories and Tags Endpoints
* `GET /api/categories` - Returns all categories with post counts.
* `GET /api/tags` - Returns all tags.

### Comments Endpoints
* `GET /api/posts/:postId/comments` - Returns all comments for a post.
* `POST /api/posts/:postId/comments` - Adds a comment to a post.

## Edge Cases

* **Concurrent Edits:** If two authors open the edit screen for a shared article, the backend must use optimistic locking or last-write-wins with warning notifications to prevent data overwrites.
* **Deleted Categories/Tags:** If a category is deleted, articles associated with it should default to an "Uncategorized" category rather than causing null reference errors.
* **Session Expiration:** If an author's JWT expires while they are composing an article, the frontend must auto-save the draft locally (e.g., in localStorage) and prompt the author to re-authenticate without losing their work.
* **Duplicate Post Slugs:** Slugs generated from post titles (e.g., `my-first-post`) must be unique. The system must append random characters or sequential numbers (e.g., `my-first-post-1`) if a slug collision occurs.
* **Database Disconnections:** If MongoDB Atlas becomes temporarily unreachable, the Express API must return a `503 Service Unavailable` status and the frontend must display a user-friendly offline message rather than crashing.

## KPIs (Success Metrics / Acceptance Criteria)

### Success Metrics
* **Performance:** Core Web Vitals (LCP under 2.5s, FID under 100ms, CLS under 0.1) on public landing pages.
* **Lighthouse Score:** SEO, Accessibility, and Best Practices scores above 90.
* **Test Coverage:** Minimum 80% test coverage for critical business logic across frontend and backend.

### Acceptance Criteria
* **Public Access:** Unauthenticated users can read all published posts, search, filter by tag/category, and post comments.
* **Write Access restriction:** Only authenticated authors can access `/api/posts` (POST/PUT/DELETE) and view the admin dashboard.
* **Author Isolation:** Authors can only modify or delete articles that they have created.
* **Validation:** Title, category, and content are mandatory fields when creating a post.

## Limitations

* **No Payment Gateway:** The application is entirely free to access for readers and authors, with no subscription or billing system.
* **No Real-Time Notifications:** Notification of new comments or article updates is not real-time (no WebSockets/WebPush); it relies on manual page reloads or API polling.
* **No Email Verification:** Sign-up does not require active email verification (e.g., OTP or validation link) in this version.
* **No Image Storage Server:** Image hosting is not built into the application backend. Images must be linked via external URLs or base64-encoded strings.

## Tech Stack

Frontend: React 19 + Bootstrap 5.3
Backend: Node.js 22 LTS + Express.js 5
Database: MongoDB Atlas (Cloud)
Testing: Jest + Supertest + React Testing Library
Frontend Hosting: Vercel
Backend Hosting: Render
Database Hosting: MongoDB Atlas
