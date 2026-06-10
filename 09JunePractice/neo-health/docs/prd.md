## Problem Statement

Patients experience significant friction when seeking healthcare: finding qualified doctors, booking appointments, accessing medical records, and consulting doctors remotely is fragmented. Doctors also lack unified digital systems to manage schedules, process payments, issue prescriptions, and maintain patient histories.

## Solution Overview

Neo-Health is a digital healthcare platform that connects patients and doctors. The platform enables patients to find doctors, book and pay for appointments, conduct video consultations, view digital prescriptions, and access medical records. Doctors can manage schedules, host video calls, write prescriptions, and upload records. An Admin Portal allows verification of doctors and platform oversight.

## User Flow

* **Patient Flow:**
  1. Register or login to the patient dashboard.
  2. Search for doctors by specialty, availability, or rating.
  3. Select a doctor, choose an available slot, and complete payment.
  4. Receive booking confirmation and notifications.
  5. Join the video consultation at the scheduled time.
  6. Access digital prescriptions and medical records post-consultation.
  7. Leave a review for the doctor.

* **Doctor Flow:**
  1. Register, submit credentials, and configure profile.
  2. Define availability schedules and consultation fees.
  3. View upcoming appointments on the dashboard.
  4. Launch the video consultation session with the patient.
  5. Generate and sign digital prescriptions, and upload medical records.
  6. Manage patient reviews and track earnings.

* **Admin Flow:**
  1. Log in to the Admin Portal.
  2. Review, approve, or reject doctor registrations.
  3. Monitor user activity, appointments, and reviews.
  4. Handle refund requests and flag policy violations.

## API Design

* **Authentication & Profiles:**
  * `POST /api/auth/register` - Create patient or doctor account.
  * `POST /api/auth/login` - Authenticate users and return session tokens.
  * `GET /api/doctors` - Query doctor profiles with filters (specialty, rating).
  * `PUT /api/doctors/:id` - Update doctor profile and availability.

* **Appointments & Payments:**
  * `POST /api/appointments` - Request a slot reservation.
  * `GET /api/appointments` - List appointments for the authenticated user.
  * `POST /api/payments/checkout` - Initialize payment session for booking.
  * `POST /api/payments/webhook` - Confirm payment status and lock the appointment slot.

* **Consultations & Records:**
  * `POST /api/consultations/:appointmentId/join` - Generate video consultation token.
  * `POST /api/medical-records` - Upload prescriptions and medical records (Doctor only).
  * `GET /api/medical-records` - Fetch medical history (Patient and authorized doctor).

* **Reviews:**
  * `POST /api/reviews` - Submit feedback and rating for a doctor.

## Edge Cases

* **Concurrent Booking Requests:** Two patients selecting the exact same slot simultaneously. The slot must be locked temporarily during checkout, and released if payment is not completed within 5 minutes.
* **Network Disconnection:** Mid-consultation connection dropouts. The platform must allow reconnection within the scheduled window without re-booking.
* **Payment Failure:** Payment processing failures during checkout. The appointment reservation must be cancelled, and the slot returned to the doctor's calendar.
* **HIPAA/GDPR Compliance:** Storage and transfer of sensitive medical records. Records must be encrypted at rest and in transit, with strict access control lists (ACLs).
* **Late Cancellation:** A patient or doctor cancels minutes before the appointment. Auto-refund policies and notification triggers must be initiated based on threshold rules.

## KPIs (Success Metrics / Acceptance Criteria)

* **Appointment Booking Success:** At least 95% of initiated bookings must complete successfully without system errors.
* **Booking Efficiency:** The end-to-end booking flow must take under 90 seconds for registered users.
* **Video Consultation Quality:** Telehealth video sessions must maintain sub-150ms latency and zero sudden drops on networks above 5 Mbps.
* **Security & Compliance:** Zero unauthorized disclosures of patient medical records; 100% of uploaded records must be encrypted.
* **Platform Uptime:** Core booking, payment, and consultation services must maintain a 99.9% uptime.

## Limitations

* **No Emergency Services:** The platform is not designed for urgent or life-threatening medical emergencies. Users will be advised to call local emergency services.
* **Device dependency:** Users must have WebRTC-compatible browsers, working webcams, and microphones to conduct video consultations.
* **Prescription Constraints:** Doctors cannot prescribe controlled substances requiring physical verification through this platform.

## Tech Stack

* **Frontend:**
  * React 19
  * Vite 7
  * Bootstrap 5
* **Backend:**
  * Node.js 22 LTS
  * Express.js 5
* **Database:**
  * MongoDB Atlas (Cloud)
  * Mongoose 8
* **Deployment:**
  * Frontend: Vercel
  * Backend: Render
  * Database: MongoDB Atlas (Cloud)
