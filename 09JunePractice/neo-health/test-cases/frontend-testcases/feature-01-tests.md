### Test 01-F-001: RegisterForm - Client-side Empty Fields Validation
- Type: Unit
- Description: Verifies that the RegisterForm component displays validation error messages and blocks submission when the user clicks submit without filling any fields.
- Preconditions: The RegisterForm component is rendered in isolation.
- Input: Empty string inputs for name, email, password, and birthdate.
- Steps:
  1. Render `RegisterForm` component using React Testing Library.
  2. Click the "Register" submit button.
- Expected Output: The component does not invoke the API callback, and inline validation message elements render for each required field.
- Pass Criteria: The DOM contains error nodes with text content matching "Full Name is required", "Email is required", "Password is required", and "Birthdate is required".
- Fail Criteria: The form API dispatch is called, or the DOM does not show all four error validation elements.
- Maps to AC: AC1

### Test 01-F-002: Registration Form Submission - Happy Path
- Type: Integration
- Description: Verifies that filling valid patient registration details and submitting the form calls the `/api/auth/register` API with the correct payload and shows a success notification.
- Preconditions: RegisterForm is rendered. The backend API is stubbed using Vitest to intercept POST requests to `/api/auth/register` and return an HTTP 201 response.
- Input:
  * Full Name: "John Doe"
  * Email: "patient.test@example.com"
  * Password: "SecurePassword123!"
  * Birthdate: "1990-05-15"
- Steps:
  1. Input "John Doe" into the Full Name field.
  2. Input "patient.test@example.com" into the Email field.
  3. Input "SecurePassword123!" into the Password field.
  4. Input "1990-05-15" into the Birthdate field.
  5. Click the "Register" button.
- Expected Output: The form triggers the mock API with the exact input fields, and the UI transitions to display a success alert message.
- Pass Criteria: The mock registration API call is recorded with the correct payload, and the text "Registration successful! Please login." is rendered on screen.
- Fail Criteria: The API stub is not invoked, or the success notification does not appear.
- Maps to AC: AC1

### Test 01-F-003: LoginForm Submission - Happy Path
- Type: Integration
- Description: Verifies that entering valid credentials triggers the `/api/auth/login` endpoint, stores the returned JWT token in local storage, and redirects the user to the patient dashboard.
- Preconditions: LoginForm is rendered. The login API is stubbed to return an HTTP 200 response with a mock JWT token. Local storage is cleared before the test.
- Input:
  * Email: "patient.test@example.com"
  * Password: "SecurePassword123!"
- Steps:
  1. Input "patient.test@example.com" into the Email field.
  2. Input "SecurePassword123!" into the Password field.
  3. Click the "Login" button.
- Expected Output: The client calls the login API, stores the session token in the browser's storage, and redirects history to `/patient/dashboard`.
- Pass Criteria: `localStorage.getItem("token")` equals the mock JWT token string, and the router navigation mock is called with `/patient/dashboard`.
- Fail Criteria: The local storage token is missing, or navigation mock is not triggered.
- Maps to AC: AC2

### Test 01-F-004: LoginForm Submission - Invalid Credentials
- Type: Integration
- Description: Verifies that entering invalid credentials triggers the `/api/auth/login` endpoint, fails with HTTP 401, does not modify local storage, and displays a clean error banner in the UI.
- Preconditions: LoginForm is rendered. The login API is stubbed to return an HTTP 401 response with `{ "success": false, "error": { "message": "Invalid email or password." } }`.
- Input:
  * Email: "patient.test@example.com"
  * Password: "WrongPassword!"
- Steps:
  1. Input "patient.test@example.com" into the Email field.
  2. Input "WrongPassword!" into the Password field.
  3. Click the "Login" button.
- Expected Output: The client displays a red warning banner containing the backend error message and maintains the login form input states.
- Pass Criteria: The DOM contains an alert message with the text "Invalid email or password.", and `localStorage.getItem("token")` remains null/undefined.
- Fail Criteria: The login form triggers navigation away from the page, or the error message is not rendered.
- Maps to AC: AC3
