# Feature: Doctor Search and Filters

## 1. Feature Overview
This feature allows patients to query the database of registered and verified doctors. Patients can search by specialty and apply filters based on minimum average ratings and specific availability dates.

## 2. Acceptance Criteria
- AC1: Patients can query doctors by specialty, returning a list of matching doctor profiles within 1.0 second.
- AC2: Patients can filter doctors by rating and date of availability.
- AC3: If no doctor matches the filter criteria, the search returns an empty array with an HTTP 200 status.

## 3. UI/UX Requirements
- **Visuals:** Grid of doctor profile cards displaying key information (name, avatar, specialty, rating, fee). Filter sidebar collapsible on mobile viewports.
- **Accessibility:** Label inputs clearly, use clean heading hierarchies, and specify `aria-expanded` attributes for the collapsible filter sidebar.
- **Interactions:** Debounced input search (delay 300ms) to avoid redundant API requests. Smooth list rendering transitions.
- **Responsive Layout:** Responsive Bootstrap 5 grid: 1 column on mobile, 2 columns on tablet, 3-4 columns on large screens.

## 4. API Endpoints Required

### `GET /api/doctors`
- **Query Parameters:**
  * `specialty` (optional): string
  * `minRating` (optional): number (1-5)
  * `availableDate` (optional): ISO date string (`YYYY-MM-DD`)
- **Headers:** `Authorization: Bearer <token>`
- **Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "doctorId": "60d07e6180f12423d82a7f5b",
      "fullName": "Dr. Sarah Jenkins",
      "specialty": "Cardiologist",
      "biography": "Board-certified cardiologist with 10+ years of experience.",
      "profilePhoto": "https://example.com/images/dr-jenkins.jpg",
      "consultationFee": 150.00,
      "averageRating": 4.8,
      "reviewsCount": 24,
      "availableSlots": [
        {
          "slotId": "90a1b2c3",
          "start": "2026-06-11T09:00:00.000Z",
          "end": "2026-06-11T09:30:00.000Z"
        }
      ]
    }
  ]
}
```

## 5. Data Models / Schema

### `DoctorProfile` Collection (Mongoose Schema)
```javascript
const DoctorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  specialty: { type: String, required: true, trim: true },
  biography: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  availableSlots: [{
    slotId: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: { type: String, enum: ['Available', 'Locked', 'Booked'], default: 'Available' }
  }]
}, { timestamps: true });

// Index for search performance
DoctorProfileSchema.index({ specialty: 1, averageRating: -1 });
```

## 6. State Management Notes
- **Local State:** Query search strings, selected rating values, and selected date inputs are stored locally in the search container component.
- **Async State:** Doctor list results array and fetch status flags are loaded on demand and updated inside the dashboard page view.

## 7. Edge Cases
- **Rating Filtering Boundary:** Ensuring doctors with exactly `minRating` (e.g. 4.0) are included when filtering by 4 stars and above.
- **Empty State UX:** If no doctors match criteria, display a descriptive "No results found" layout to the patient rather than leaving a blank screen.
- **Unverified Doctor Exclusion:** Ensuring only verified doctors (`isVerified: true`) are queried by the search endpoint.

## 8. Dependencies on Other Features
- Feature 08: Doctor Profile Setup (must exist to write profiles and availability slots).
- Feature 01: Registration and Login (requires valid authentication JWT).

## 9. Testing Requirements
- Frontend component tests: `src/tests/components/DoctorSearch.test.jsx`
- Backend API tests: `src/tests/api/doctors.test.js`

## 10. Out of Scope for This Feature
- Location-based filtering (geo-search).
- Direct scheduling modifications (moved to booking feature).
