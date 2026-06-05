# Feature Specification: Resilient Local Autosave & Sync Engine

## Feature ID
`FEAT-004` (Priority 4)

## Purpose
Prevents candidate answer loss during local computer crashes, browser freezes, or network dropouts by saving answers locally in an encrypted browser database (IndexedDB) and syncing with the cloud asynchronously.

## User Stories
* **US-05-02:** As a Candidate, I want my answers saved locally in real-time so that if my computer crashes or my network drops, I do not lose any of my progress when I reconnect.

## Functional Requirements
1. **FR-4.1: Encrypted Local Storage (IndexedDB):** Establish a local IndexedDB instance. Answers must be encrypted at rest using AES-GCM with a dynamic key derived from the candidate's session ID and a server salt.
2. **FR-4.2: Real-time Autosave trigger:** Automatically capture and save answers to the local store upon any option selection change or after 5 seconds of inactivity in essay textareas.
3. **FR-4.3: Delta Sync Queue Engine:** Maintain a sync queue inside IndexedDB. Periodically (every 10 seconds) push unsynced answers to the server. Mark records as "synced" upon confirmation receipt.
4. **FR-4.4: Connection State Manager:** Track connection status using browser `navigator.onLine` and heartbeat ping APIs. Display dynamic UI status bars ($UIC-005$).

## Validation Rules
1. **VAL-4.1:** The synchronization client payload must include a rising sequence number to prevent out-of-order writes or packet overwrites.
2. **VAL-4.2:** Each sync payload must carry an HMAC-SHA256 signature calculated from the body content and a session-key token issued at exam launch.

## Edge Cases
1. **IndexedDB Blocked/Disabled:** If private browsing or disk errors block IndexedDB allocation, fall back to encrypted session storage and prompt the candidate: `"Warning: Local offline recovery disabled. Maintain connection."`
2. **Crash While Offline:** If the candidate's computer crashes while they are offline, they must be able to boot, re-open the browser, and retrieve their offline-saved progress from IndexedDB directly.
3. **Collision on Reconnection:** If a candidate resumes a session from another computer after an offline interval, the server must run conflict resolution (preferring the version with the higher sequence number / timestamp).

## Dependencies
* `FEAT-003` (Candidate Exam Workspace UI).

## API Requirements

### POST `/api/v1/exams/session/{session_id}/sync`
* **Description:** Receives queue updates from candidate's local store.
* **Headers:** `Authorization: Bearer <JWT_TOKEN>`, `X-Sync-Signature: <HMAC_HASH>`
* **Request Payload:**
```json
{
  "session_id": "sess_882a-bc923",
  "client_timestamp": 1780658751,
  "sequence_number": 42,
  "answers": [
    {
      "question_id": "q_1",
      "answer_value": "opt_a",
      "modified_at": 1780658750
    }
  ]
}
```
* **Response (200 OK):**
```json
{
  "status": "success",
  "last_synced_sequence": 42,
  "server_received_at": 1780658752
}
```

## Database Impact
* **Entity:** `CANDIDATE_RESPONSE`
  * Updates or inserts records for `session_id` and `question_id`.
  * Index on `(session_id, question_id)` to handle rapid upsert workloads.

## UI Components
1. **Sync Status Banner:** Floating floating banner changing state (Green: "All changes saved to cloud", Orange: "Offline - saving locally to browser", Red: "Sync failure - retrying").
2. **Alert Toast:** Displayed when returning online, informing the candidate of successfully uploaded answers.

## Security Requirements
1. **SEC-4.1 (Local AES Encryption):** Prevent local tampering with answers (e.g., using browser console to change answer values in IndexedDB) by encrypting details with a key that is not stored in local storage.
2. **SEC-4.2 (Replay Prevention):** Reject any sync payload containing a sequence number lower than or equal to the last processed sequence number in the DB.

## Acceptance Criteria
* **Scenario: Network failure and recover**
  * **Given** a candidate is active and the network connection drops (simulated offline),
  * **When** they answer Question 3,
  * **Then** the UI displays the yellow "Offline" banner, and the answer is saved locally.
  * **When** network connectivity returns,
  * **Then** the queue processor syncs the answer, and the banner returns to green.
* **Scenario: Browser crash and recover**
  * **Given** a candidate has answered 5 questions offline,
  * **When** the browser process is killed and restarted,
  * **Then** on launching the exam workspace, the local queue reads data from IndexedDB, displays the 5 answered questions, and syncs them when online.

## Definition of Done (DoD)
* [ ] Synchronization engine tested for sequence validations under network latency simulator (e.g., 2000ms delay).
* [ ] Encryption of IndexedDB inspected and confirmed via browser dev tools.
* [ ] Auto-save throttles validated under heavy click patterns.
* [ ] Multi-tab behavior tested (block duplicate workspaces).
* [ ] Code approved by technical architect.
