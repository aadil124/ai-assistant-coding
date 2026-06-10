## Feature ID: 02
## Feature Name: Doctor Search and Filters
## Module: Module 1: Patient Flow
## Description: Enables patients to search, sort, and filter verified doctor profiles by specialty, availability date, and star rating.

## User Story
As a patient, I want to search and filter doctors by specialty, rating, and availability so that I can easily find a doctor that fits my medical requirements and schedule.

## Acceptance Criteria
- AC1: Patients can query doctors by specialty, returning a list of matching doctor profiles within 1.0 second.
- AC2: Patients can filter doctors by rating and date of availability.
- AC3: If no doctor matches the filter criteria, the search returns an empty array with an HTTP 200 status.

## API Endpoints

### 1. Query Doctor Profiles
* **Method:** `GET`
* **Path:** `/api/doctors`
* **Query Parameters:**
  * `specialty` (optional): Specialty string (e.g., "Cardiologist")
  * `minRating` (optional): Float value from 1.0 to 5.0
  * `availableDate` (optional): Date format `YYYY-MM-DD`
* **Request Headers:**
  * `Authorization: Bearer <token>`
* **Success Response (HTTP 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "doctorId": "60d07e6180f12423d82a7f5b",
      "fullName": "Dr. Sarah Jenkins",
      "specialty": "Cardiologist",
      "biography": "Board-certified cardiologist with 10+ years of experience in cardiovascular care.",
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
* **Success Response - Empty Results (HTTP 200 OK):**
```json
{
  "success": true,
  "data": []
}
```
* **Error Response - Invalid Filter Parameters (HTTP 400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid query parameters: 'minRating' must be a number between 1 and 5, 'availableDate' must be in YYYY-MM-DD format."
  }
}
```

## UI Components

### 1. `SearchDashboardPage` (Container component)
* Main page structure displaying the search bar, filter sidebar, and doctor card list.

### 2. `SearchBar` (Functional component)
* Input field with autocomplete for specialties and doctor names. Emits query changes to the parent container.

### 3. `FilterSidebar` (Functional component)
* Collapsible panel containing inputs for minimum rating selection (star rating filters) and date pickers for availability slots.

### 4. `DoctorCardList` (Functional component)
* Flexbox grid that maps and displays list elements of `DoctorCard`. Shows a "No Results Found" vector graphic if results are empty.

### 5. `DoctorCard` (Functional component)
* Item card displaying doctor name, specialty badge, image, consultation fee, rating stars, and a "View Slots" button.

## State / Data Flow

1. **Query Update:** User inputs search text or modifies filter parameters.
2. **State Propagation:** Local state inside `FilterSidebar` updates, triggering the parent component's query handler function.
3. **API Dispatch:** Parent component executes `GET /api/doctors` with query strings using a React 19 transition hook.
4. **Backend Query Processing:**
   * Express 5 route handles the request and extracts query parameters.
   * Node controller queries MongoDB using Mongoose 8.
   * If `availableDate` is provided, Mongoose queries the Doctor collection matching sub-documents in the `availableSlots` array.
   * Database returns results, which are formatted and returned with HTTP 200.
5. **UI Rendering:** React updates `DoctorCardList` state with the API response, triggering a smooth list transition.

## Edge Cases
* **Database Query Timeout:** Large database datasets causing searches to drag. Solved by implementing compound mongoose indexing on `{ specialty: 1, averageRating: -1 }`.
* **Slot Overlap during Fetch:** A slot is booked by another user while the current user is loading search results. Handled by checking slot reservation status at the next step (Booking flow).

## Dependencies
* Feature 08 (Doctor Registration and Profile Setup - needed to populate search data).
* Feature 01 (Registration and Login - needed for JWT auth header).

## Out of Scope for This Feature
* **Geo-Location Based Search:** Distance-based filtering or integration with mapping APIs (e.g., Google Maps).
* **Doctor Profile Detail Editing:** Managed in a separate dashboard view under Doctor Flow.
