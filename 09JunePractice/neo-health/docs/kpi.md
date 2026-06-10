## Module 1: Patient Flow

### Feature 1.1: Registration and Login
- AC1: Patient can register by submitting email, password, full name, and birthdate, returning HTTP 201 on success.
- AC2: Login returns a valid JWT session token upon submitting valid credentials, returning HTTP 200 on success.
- AC3: Invalid or empty credentials return HTTP 401 Unauthorized status with a validation error message.

### Feature 1.2: Doctor Search and Filters
- AC1: Patients can query doctors by specialty, returning a list of matching doctor profiles within 1.0 second.
- AC2: Patients can filter doctors by rating and date of availability.
- AC3: If no doctor matches the filter criteria, the search returns an empty array with an HTTP 200 status.

### Feature 1.3: Slot Selection and Payment Checkout
- AC1: Patients can select an available doctor time slot, placing a temporary reservation lock on that slot for 5 minutes.
- AC2: Initiating checkout redirects the user to Stripe Checkout with the correct consultation fee parameter.
- AC3: If the checkout is not completed within 5 minutes, the slot is unlocked and made available to other users.

### Feature 1.4: Booking Confirmation and Notifications
- AC1: After successful payment, the appointment status updates to "Confirmed" in the database within 2 seconds.
- AC2: The system dispatches an automated email confirmation to the patient containing the appointment details within 5 seconds.
- AC3: A booking confirmation notification is pushed to the patient's dashboard interface.

### Feature 1.5: Video Consultation Access
- AC1: The "Join Call" button becomes active and clickable exactly 10 minutes prior to the scheduled appointment start time.
- AC2: Clicking the "Join Call" button fetches a WebRTC token and redirects the user to the active video call room.
- AC3: If a connection drops, the patient can rejoin the consultation room using the same link as long as the session time has not expired.

### Feature 1.6: Post-Consultation Prescription and Medical Records Access
- AC1: Patients can view and download signed digital prescriptions as read-only PDF files from their dashboard.
- AC2: Patients can view and download uploaded medical records associated with their profile.
- AC3: Accessing another patient's medical records or prescriptions must be blocked and return an HTTP 403 Forbidden status.

### Feature 1.7: Doctor Reviews Submission
- AC1: Patients can submit a rating (1 to 5 stars) and a text review only for appointments with a "Completed" status.
- AC2: Submitting a review calls `POST /api/reviews` and returns an HTTP 201 Created status.
- AC3: Submitting a review for a non-completed or non-existent appointment returns an HTTP 400 Bad Request status.

## Module 2: Doctor Flow

### Feature 2.1: Doctor Registration, Verification, and Profile Setup
- AC1: Doctors can register by submitting name, specialty, bio, credentials/license files, and consultation fees.
- AC2: Registrations are set to a "Pending Verification" status and do not appear in search results until approved by an admin.
- AC3: Verified doctors can configure their profile bio, photo, and fees via `PUT /api/doctors/:id`, returning HTTP 200 on success.

### Feature 2.2: Schedule Availability and Consultation Fees Configuration
- AC1: Doctors can define and update their weekly available time slots in the dashboard.
- AC2: Setting or changing consultation fees takes effect immediately for all subsequent appointment bookings.
- AC3: The system prevents doctors from deleting time slots that have already been booked and paid for by patients.

### Feature 2.3: Dashboard and Upcoming Appointments Management
- AC1: The doctor dashboard displays upcoming appointments sorted chronologically by date and time.
- AC2: Each appointment item on the dashboard displays the patient's name, date, time, and current payment status.
- AC3: The dashboard updates appointment details dynamically when a cancellation or booking event occurs.

### Feature 2.4: Video Consultation Host Session
- AC1: The "Start Call" button becomes active for the doctor exactly 10 minutes before the appointment start time.
- AC2: The system generates a host WebRTC room token and successfully establishes the video and audio streams.
- AC3: The doctor can end the consultation session, which updates the appointment status to "Completed".

### Feature 2.5: Digital Prescription Generation and Medical Record Uploads
- AC1: Doctors can generate and digitally sign prescriptions containing medication name, dosage, and instructions.
- AC2: Signed prescriptions are saved as immutable PDF files and cannot be edited.
- AC3: Doctors can upload clinical medical records (PDF/images up to 10MB) to the patient's record store.

### Feature 2.6: Review Management and Earnings Tracking
- AC1: Doctors can view all reviews and ratings submitted by patients on their profile.
- AC2: The doctor dashboard displays total platform earnings calculated as sum of completed consultation fees minus admin commission.
- AC3: Earnings logs can be filtered by month, loading results in under 1.5 seconds.

## Module 3: Admin Flow

### Feature 3.1: Admin Authentication and Dashboard Access
- AC1: Admin users must log in using dedicated admin credentials.
- AC2: Non-admin users attempting to access the Admin Portal must be rejected with an HTTP 403 Forbidden status.
- AC3: The admin dashboard displays total platform user count, active doctor count, booked appointment counts, and overall platform revenue.

### Feature 3.2: Doctor Credentials Verification (Approve/Reject)
- AC1: Admins can view a list of all doctors with "Pending Verification" status and download their credentials files.
- AC2: Approving a doctor updates their status to "Verified" and makes their profile public in searches.
- AC3: Rejecting a doctor updates their status to "Rejected" and sends an automated notification email to the doctor.

### Feature 3.3: Platform Oversight and Activity Monitoring
- AC1: Admins can view a listing of all appointments booked on the platform.
- AC2: Admins can view and moderate user-submitted reviews, with the ability to flag or delete inappropriate comments.
- AC3: The system logs all administrative actions in an audit trail database collection.

### Feature 3.4: Refund Handling and Policy Violation Management
- AC1: Admins can trigger stripe refunds for cancelled appointments, returning HTTP 200 on successful refund.
- AC2: Refunding an appointment updates the appointment status to "Refunded" and releases any locked database fields.
- AC3: Admins can flag or temporarily suspend doctor or patient profiles violating system policies.
