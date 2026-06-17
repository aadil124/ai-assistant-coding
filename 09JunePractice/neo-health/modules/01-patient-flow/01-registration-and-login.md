# Feature: Registration and Login

## 1. Feature Overview
This feature handles the onboarding and authentication of users (Patients and Doctors) on the Neo-Health platform. It provides public forms for account registration and session login, securing credentials via bcrypt hashing, and utilizing stateless JSON Web Tokens (JWT) for secure session management.

## 2. Acceptance Criteria
- AC1: Patient can register by submitting email, password, full name, and birthdate, returning HTTP 201 on success.
- AC2: Login returns a valid JWT session token upon submitting valid credentials, returning HTTP 200 on success.
- AC3: Invalid or empty credentials return HTTP 401 Unauthorized status with a validation error message.

## 3. UI/UX Requirements
- **Visuals:** Modern Bootstrap 5 layout with a centered card, custom soft gradients, and subtle drop shadows.
- **Accessibility:** Semantic `<form>`, `<input>` fields with correct `type` (email, password, date), clear text labels, and `aria-describedby` for validation errors.
- **Micro-interactions:** Interactive hover states on buttons, loading spinner within the submit button during API requests, and real-time client-side validation messages.
- **Responsive Layout:** Stacked single-column on mobile, width capped at 450px on desktop.

## 4. API Endpoints Required

### `POST /api/auth/register`
- **Request Body:**
```json
{
  "email": "patient.test@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe",
  "role": "patient",
  "birthdate": "1990-05-15"
}
```
- **Response (HTTP 201 Created):**
```json
{
  "success": true,
  "data": {
    "userId": "60d07e6180f12423d82a7f5a",
    "email": "patient.test@example.com",
    "fullName": "John Doe",
    "role": "patient",
    "birthdate": "1990-05-15T00:00:00.000Z"
  }
}
```

### `POST /api/auth/login`
- **Request Body:**
```json
{
  "email": "patient.test@example.com",
  "password": "SecurePassword123!"
}
```
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature",
    "user": {
      "userId": "60d07e6180f12423d82a7f5a",
      "email": "patient.test@example.com",
      "fullName": "John Doe",
      "role": "patient"
    }
  }
}
```

## 5. Data Models / Schema

### `User` Collection (Mongoose Schema)
```javascript
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true, trim: true },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], required: true },
  birthdate: { type: Date, required: function() { return this.role === 'patient'; } }
}, { timestamps: true });
```

## 6. State Management Notes
- **Local State:** Form fields management, loading flags, and validation error messages inside `LoginForm` and `RegisterForm`.
- **Global State:** Authenticated user profile and session JWT are stored in a global `AuthContext`.
- **Persistence:** JWT token is persisted in `localStorage` as `token`.

## 7. Edge Cases
- **Duplicate Registration:** Attempting to register an email that already exists. Solved by database unique index and checking candidate existence in registration controller, returning HTTP 409 Conflict.
- **SQL/NoSQL Injection:** Sanitizing incoming request parameters to block query operators (e.g., `{ "$ne": null }`). Handled by sanitization middleware.
- **Weak Passwords:** Enforcing a minimum length of 8 characters, at least one uppercase letter, one lowercase letter, and one digit.

## 8. Dependencies on Other Features
- None (This is the entry point feature for the platform).

## 9. Testing Requirements
- Frontend unit tests: `src/tests/components/LoginForm.test.jsx`
- Backend API integration tests: `src/tests/api/auth.test.js`

## 10. Out of Scope for This Feature
- Password recovery / reset email flows.
- Social OAuth integrations (Google, Apple, Facebook).
- Multi-factor authentication (MFA).
