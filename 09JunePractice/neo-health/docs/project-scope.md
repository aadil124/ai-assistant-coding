## In Scope

The project scope is strictly limited to the web application features defined in the PRD:
* **Doctor Profiles:** Profile pages with name, specialty, bio, photo, fee, ratings, and availability slots. Search and filtering by specialty, rating, and availability date.
* **Appointment Booking:** Patient-initiated booking flow, time-slot selection, a 5-minute temporary slot lock during checkout, and prevention of concurrent bookings.
* **Video Consultations:** In-browser WebRTC video calls, active 10 minutes prior to scheduled start, with support for mid-call reconnection.
* **Medical Records:** Safe uploading of PDFs/images (up to 10MB) encrypted at rest (AES-256) and in transit, with role-based access control.
* **Prescription Management:** Structured digital prescription generation, digital signature by doctors, locking as read-only PDF files, and patient download capabilities.
* **Notifications:** Booking confirmations, cancellation alerts, payment receipts, and a 15-minute pre-consultation reminder via email/push notifications.
* **Payments:** Stripe Checkout integration, session generation, and payment status verification via webhooks.
* **Patient Dashboard:** Chronological overview of appointments, status indicators, and quick links to download associated prescriptions or medical records.
* **Reviews:** Ratings (1-5 stars) and text reviews submitted by verified patients post-consultation, appearing on doctor profiles after moderation.
* **Admin Portal:** Secure admin interface to approve/reject doctor credentials and monitor user counts, verified doctor logs, appointment totals, and platform revenue.

## Out of Scope

Any feature not explicitly specified in the PRD is out of scope. Major excluded features include:
* **Native Mobile Apps:** No iOS or Android native application development.
* **Physical/In-Person Appointments:** No management of offline clinic visits.
* **Pharmacy & Delivery Integration:** No direct electronic transmission of prescriptions to pharmacies or home medicine delivery.
* **Persistent Chat Messaging:** No text-based chat logs outside the active video consultation room.
* **Medical Insurance Billing:** No claims processing, insurance verification, or direct co-pay integrations.
* **Integration with Government Registries:** No synchronization with national electronic health record (EHR) databases.
* **Emergency Medical Triage:** No real-time emergency service dispatch, support, or emergency hotline integration.
* **Controlled Substances:** No support or workflows for prescribing controlled medications that require physical verification.

## Assumptions

* **Device & Hardware:** Users possess WebRTC-compatible modern browsers, functional webcams, and microphones.
* **Network Connection:** Users have access to network bandwidth of at least 5 Mbps for stable video call streaming.
* **Stripe Support:** Stripe services are fully supported and available in the target operating markets.
* **User Literacy:** Patients and doctors are capable of navigating standard web interfaces for payment and video conferencing.

## Dependencies

* **WebRTC Signaling/API Provider:** Platform depends on reliable connection tokens and third-party signaling for video consultations.
* **Stripe Payment API:** Platform relies on Stripe APIs for card transactions and the Stripe Webhook system for locking slots.
* **Transactional Email Service:** Dependency on an SMTP server or third-party service (e.g., SendGrid, Nodemailer) for dispatching notifications.
* **Deployment Providers:** Availability of Vercel (frontend hosting), Render (backend hosting), and MongoDB Atlas (cloud database) during operation.

## Known Risks

* **Video Quality Degradation:** High network latency or packet loss on patient/doctor internet connections directly impacting video session quality.
* **Compliance Violation:** Leakage or unauthorized access of encrypted medical records, resulting in HIPAA or GDPR violations.
* **Outages in Third-Party APIs:** Downtime in Stripe or video connection providers interrupting core payment and consultation capabilities.
* **Webhook Processing Delay:** Delays in Stripe payment confirmation webhooks causing the 5-minute booking lock to expire prematurely.
