# Feature Specification: Author Registration (Feature 1.1)

## 1. Feature Overview
This feature allows new guest users to register as authors on the blog platform. Successful registration creates a new author profile in the MongoDB database, logs the user in immediately by issuing a JSON Web Token (JWT), and redirects them to the Admin Dashboard.

## 2. Acceptance Criteria
* **AC1:** Registering with a unique email, username, and password via `POST /api/auth/register` returns a status code of 201 Created, user details, and a JSON Web Token (JWT).
* **AC2:** Attempting to register with an already existing email or username returns a 400 Bad Request status code with a descriptive validation error message.
* **AC3:** The registration endpoint returns a 400 Bad Request when mandatory fields (email, username, password) are missing or invalidly formatted.

## 3. UI/UX Requirements
* **Form Layout:** A clean, centered card with Bootstrap classes (`card`, `shadow`, `p-4`) containing input fields for Username, Email, and Password, plus a Submit button.
* **Responsive Grid:** The form should stack vertically on small displays (`col-12`) and center nicely on wider screens (`col-md-6 col-lg-4`).
* **Validation Feedback:** Display inline invalid feedback alerts using Bootstrap's `.invalid-feedback` classes when inputs do not meet regex validation criteria on client blur events.
* **Loading State:** The submit button must transition to a loading state (e.g., displaying a Bootstrap spinner element and becoming disabled) while the API request is in progress.

## 4. API Endpoints Required
* **Route:** `POST /api/auth/register`
* **Request Headers:**
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "username": "exampleUser",
    "email": "example@domain.com",
    "password": "SecurePassword123"
  }
  ```
* **Response Body (201 Created):**
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
* **Response Body (400 Bad Request):**
  ```json
  {
    "error": "Email already exists"
  }
  ```

## 5. Data Models / Schema
* **User Model (Mongoose):**
  * `username`: String, Required, Unique, Trimmed, Minimum length 3.
  * `email`: String, Required, Unique, Trimmed, Lowercase, Regex validated pattern.
  * `password`: String, Required, Minimum length 8. (Hashed with bcrypt in pre-save hook).

## 6. State Management Notes
* **Local State:** Manage form field states (`username`, `email`, `password`) and error states using local React `useState` hooks.
* **Global Context:** Upon successful registration, the returned JWT and user profile details must be dispatched to the `AuthContext` to update the global user state.
* **Token Persistence:** Save the returned JWT in client `localStorage` for persistent logins.

## 7. Edge Cases
* **Database Connection Failure:** If MongoDB is offline, return a `503 Service Unavailable` error code to the client, and display a user-friendly modal warning "Services are temporarily offline."
* **Simultaneous Registration:** If two requests attempt to register the exact same username or email at the same time, the MongoDB unique index constraint will trigger a duplicate key error, which the controller must catch and map to a 400 Bad Request error.
* **Weak Passwords:** Prevent registration of passwords under 8 characters using Mongoose validation.

## 8. Dependencies on Other Features
* **None:** This is the first feature in the onboarding pipeline.

## 9. Testing Requirements
* **Backend Integration Test:** `test-cases/backend/auth.test.js`
  * Assert validation errors are returned for missing fields.
  * Assert duplicate keys return a 400 status code.
  * Assert success returns a 201 status code, user object, and token.
* **Frontend UI Test:** `test-cases/frontend/auth.test.jsx`
  * Render form inputs, fire input events, and verify client validation messages.
  * Mock success API responses and assert redirect to the dashboard.

## 10. Out of Scope for This Feature
* **Email Verification:** No verification links or email OTP processes.
* **OAuth Registration:** No third-party signup (Google, GitHub, etc.).
