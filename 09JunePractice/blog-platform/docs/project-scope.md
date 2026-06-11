# Project Scope

## 1. In Scope

* **Author Authentication & Management:**
  * Endpoint `POST /api/auth/register` to register new authors.
  * Endpoint `POST /api/auth/login` to authenticate authors and issue stateless JSON Web Tokens (JWT).
  * Secure storage of JWT in client-side storage (e.g., localStorage) and state management in React 19.
* **Public Blog Exploration:**
  * Public landing page displaying a feed of published posts sorted in reverse chronological order, retrieved via `GET /api/posts`.
  * Dynamic pagination for the published post list.
  * Search functionality utilizing search parameters via `GET /api/posts?search=query` to search titles and descriptions.
  * Tag and category filtering that dynamically fetches filtered posts.
  * Dedicated detail page for viewing posts by slug at `/posts/:slug` via `GET /api/posts/:slug`.
* **Reader Interaction:**
  * Chronological comment list retrieved via `GET /api/posts/:postId/comments`.
  * Public comment submission via `POST /api/posts/:postId/comments` with form validation requiring commenter name and body.
* **Author Admin Dashboard:**
  * Article creation dashboard displaying the author's own articles (retrieved via `GET /api/author/posts`).
  * Creating articles via `POST /api/posts` with fields for title, description, content, tags, category, and status (Draft/Published).
  * Updating existing articles via `PUT /api/posts/:id` (restricted to the post owner).
  * Deleting articles via `DELETE /api/posts/:id` (restricted to the post owner).
  * Slug generation from titles with backend collision checks that append unique suffixes.
* **Testing:**
  * Integration testing for the REST API using Jest and Supertest.
  * Unit and component testing for the React frontend using Jest and React Testing Library.

## 2. Out of Scope

* **Payment Gateways & Subscriptions:** No billing, subscriptions, paywalls, or payment processing systems.
* **Third-Party/Social Authentication:** No OAuth 2.0 integration (e.g., Google, GitHub logins); authentication is strictly email/username-password based.
* **Email Verification & Password Recovery:** No OTP (One-Time Password) generation, sign-up confirmation emails, or password reset link emails.
* **Built-in Image/Media Hosting:** No backend support for receiving and storing file uploads (images, videos). Images must be hyperlinked via external URLs or base64-encoded strings.
* **Real-time Notifications:** No live comments push or notification feeds using WebSockets, Server-Sent Events (SSE), or Web Push APIs.
* **Advanced User Roles:** No Superadmin or Moderator dashboards. Every registered user has the standard Author role and can only manage their own posts.

## 3. Assumptions

* **Browser Compatibility:** The frontend will target and run on modern evergreen web browsers (Chrome, Firefox, Safari, Edge).
* **Draft Exclusions:** Draft articles will not be returned by public endpoints (`GET /api/posts`, `GET /api/posts/:slug`) or search features.
* **Static Category Management:** In the initial release, category and tag definitions will be created dynamically when posts are written, rather than having separate admin dashboards for category management.
* **Author Self-Management:** Authors are trusted to manage their credentials, as no self-service password reset system is included in this phase.

## 4. Dependencies

* **MongoDB Atlas Cloud Service:** Availability of the Atlas cluster is critical for data persistence and testing runs.
* **Deployment Providers (Vercel & Render):** Continuous Integration (CI) and hosting availability on Vercel (frontend) and Render (backend).
* **NPM Packages Availability:** Uptime and access to the npm registry for installing React 19, Bootstrap 5.3, Express 5, Jest, Supertest, and React Testing Library.

## 5. Constraints

* **Tech Stack Compliance:**
  * The frontend codebase must utilize React 19 and Bootstrap 5.3.
  * The backend must execute on Node.js 22 LTS using the Express 5 framework.
  * The database must reside on MongoDB Atlas.
* **Deployment Constraints:** The frontend must build and deploy to Vercel, and the backend must build and run on Render's platform.
* **Testing Tooling:** Testing must be performed strictly using Jest, Supertest, and React Testing Library.
