## Feature ID: 01
## Feature Name: Registration and Login
## Module: Module 1: Patient Flow
## Description: Provides registration and authentication flows for patients and doctors using secure passwords and stateless JWT session tokens.

## User Story
As a new or returning user (Patient or Doctor), I want to register an account and log in securely so that I can access my personalized dashboard and utilize the platform's features.

## Acceptance Criteria
- AC1: Patient can register by submitting email, password, full name, and birthdate, returning HTTP 201 on success.
- AC2: Login returns a valid JWT session token upon submitting valid credentials, returning HTTP 200 on success.
- AC3: Invalid or empty credentials return HTTP 401 Unauthorized status with a validation error message.

## API Endpoints

### 1. User Registration
* **Method:** `POST`
* **Path:** `/api/auth/register`
* **Request Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "email": "patient.test@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe",
  "role": "patient",
  "birthdate": "1990-05-15"
}
```
* **Success Response (HTTP 201 Created):**
```json
{
  "success": true,
  "data": {
    "userId": "60d07e6180f12423d82a7f5a",
    "email": "patient.test@example.com",
    "fullName": "John Doe",
    "role": "patient",
    "birthdate": "1990-05-15T00:00:00.000Z",
    "createdAt": "2026-06-10T11:30:00.000Z"
  }
}
```
* **Error Response - Email Already Registered (HTTP 409 Conflict):**
```json
{
  "success": false,
  "error": {
    "message": "Email is already registered."
  }
}
```
* **Error Response - Validation Failed (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed: 'email' must be a valid email address, 'password' must be at least 8 characters long."
  }
}
```

### 2. User Login
* **Method:** `POST`
* **Path:** `/api/auth/login`
* **Request Headers:** `Content-Type: application/json`
* **Request Body:**
```json
{
  "email": "patient.test@example.com",
  "password": "SecurePassword123!"
}
```
* **Success Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGQwN2U2MTgwZjEyNDIzZDgyYTdmNGEiLCJyb2xlIjoicGF0aWVudCJ9.Signature",
    "user": {
      "userId": "60d07e6180f12423d82a7f5a",
      "email": "patient.test@example.com",
      "fullName": "John Doe",
      "role": "patient"
    }
  }
}
```
* **Error Response - Invalid Credentials (HTTP 401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid email or password."
  }
}
```

## UI Components

### 1. `RegistrationPage` (Container component)
* Parent view that switches sub-forms based on the selected role (Patient vs. Doctor registration).

### 2. `RegisterForm` (Functional component)
* Input fields: Full Name, Email, Password, Birthdate (for Patients), and License Number / Specialty (for Doctors).
* Built-in client-side validation (email format regex, password strength verification).
* Disables submit button during active loading transitions.

### 3. `LoginForm` (Functional component)
* Input fields: Email, Password.
* Features dynamic inline error alerts if login fails.

### 4. `AuthWrapper` (Layout component)
* Sleek card-layout wrapper using Bootstrap 5 utility classes, gradients, and responsive centering.

## State / Data Flow

1. **User Action:** User inputs registration/login data and clicks Submit.
2. **Client-side Validation:** React component validates field presence and formats. If invalid, the UI displays validation errors and blocks the dispatch.
3. **HTTP Dispatch:** Component triggers login or registration API request via `fetch` wrapped in a React 19 transition.
4. **Backend Processing:**
   * Express 5 routing handles the request, directing payload to Auth Controller.
   * Controller validates input parameters using a validation schema.
   * For registration, checks database via Mongoose 8 for duplicate emails, hashes password via `bcrypt`, saves document, and returns HTTP 201.
   * For login, verifies password against hashed database copy. If match succeeds, signs a stateless JWT containing `userId` and `role`.
5. **Token Storage:** The client application receives the token, stores it securely in `localStorage` or session-bound cookies, and updates the global Auth Context.
6. **Redirect:** User is redirected to the corresponding dashboard `/patient/dashboard` or `/doctor/dashboard` using React Router.

## Edge Cases
* **Concurrent Registration Attempts:** Two requests targeting the same email at the same millisecond. Mongoose unique indexing on `email` will reject the second query, returning HTTP 409.
* **Malformed or Expired Tokens:** Client sends invalid JWT. The authorization middleware catches this, clears the client-side session, and redirects the user to the login screen.
* **Role Tampering:** A patient attempts to login and directly modify their token/context to "doctor" or "admin". The backend verifies the cryptographically signed JWT on every protected route, rejecting requests where the token payload does not match.

## Dependencies
* None (Base authentication feature).

## Out of Scope for This Feature
* **Password Reset / Forgot Password:** Reset email dispatch workflows and secondary authentication pin validation.
* **Social OAuth Logins:** Authentication via Google, Facebook, Apple, or other third-party identity providers.
* **Session Auditing:** Track user IP addresses, active login locations, or device histories.
