# Feature Specification: Author Login / Authentication (Feature 1.2)

## 1. Feature Overview
This feature allows registered authors to authenticate with their email and password, receive a JSON Web Token (JWT) session token, and access the secure Admin Dashboard where they can manage their own blog posts.

## 2. Acceptance Criteria
* **AC1:** Submitting correct credentials to `POST /api/auth/login` returns a 200 OK status code, user details, and a valid JWT.
* **AC2:** Submitting incorrect or nonexistent credentials returns a 401 Unauthorized status code and an appropriate error message.
* **AC3:** The frontend successfully reads the JWT from the login response and stores it securely, redirecting the authenticated author to the dashboard page `/admin/dashboard`.

## 3. UI/UX Requirements
* **Form Layout:** Centered login card containing input fields for Email and Password, and a Submit button.
* **Bootstrap Classes:** Styled using Bootstrap form control styles (`form-control`, `btn-primary`).
* **Visual States:** Error alert banner (`alert alert-danger`) appears if incorrect credentials are submitted. The login button is disabled with a loading spinner during active API queries.
* **Navigation Links:** Include a link to the registration page for guest users who do not yet have an account.

## 4. API Endpoints Required
* **Route:** `POST /api/auth/login`
* **Request Headers:**
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "email": "example@domain.com",
    "password": "SecurePassword123"
  }
  ```
* **Response Body (200 OK):**
  ```json
  {
    "user": {
      "id": "60d0fe4f5311236168a109ca",
      "username": "exampleUser",
      "email": "example@domain.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
* **Response Body (401 Unauthorized):**
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

## 5. Data Models / Schema
* Uses the **User Schema** defined in [01-author-registration.md](file:///d:/vibeCoding2026/09JunePractice/blog-platform/features/01-author-registration.md#L45-L50).
* Authenticates by querying the `User` model by `email`, then verifying the hashed `password` using `bcrypt.compare()`.

## 6. State Management Notes
* **Local State:** Stores email and password input values, validation errors, and button submission loading state.
* **Global Context:** Successfully retrieved JWT and User object are populated in `AuthContext` to transition the app state from guest to authenticated author.
* **Storage Sync:** Save JWT to `localStorage` upon login. Read `localStorage` on application boot to automatically authenticate users with valid cached tokens.

## 7. Edge Cases
* **Expired or Malformed Tokens:** If the frontend attempts to auto-login using an expired token in `localStorage`, the token audit endpoint must fail, clear the client storage, and prompt a clean login screen.
* **Brute Force Attempts:** If multiple login attempts fail sequentially, the backend should ideally log the event, but for this basic iteration, it must return a generic `401 Unauthorized` without revealing whether the email or password was the specific mismatch.
* **SQL/NoSQL Injection:** Sanitize inputs (e.g., query strings/JSON fields) to prevent NoSQL query object injection (such as sending `{"email": {"$gt": ""}}`).

## 8. Dependencies on Other Features
* **Feature 1.1 (Author Registration):** Requires a registered user to exist in the database for successful login validation.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/auth.test.js`
  * Assert that submitting correct credentials returns a 200 status code and JWT.
  * Assert that incorrect passwords return a 401 status code.
  * Assert that nonexistent emails return a 401 status code.
* **Frontend UI Test:** `test-cases/frontend/auth.test.jsx`
  * Test rendering of inputs and submit buttons.
  * Simulate incorrect login entries and assert warning banner displays.
  * Simulate successful login entries and assert redirection to `/admin/dashboard`.

## 10. Out of Scope for This Feature
* **Password Reset / Forgot Password:** No password reset links, security questions, or self-service password modifications.
* **Session Refresh Tokens:** The auth structure utilizes simple short-lived/medium-lived JWTs without a dual-token access/refresh system.
* **Remember Me Duration Customization:** Persistent login strictly uses standard `localStorage` with predefined session lifespan.
