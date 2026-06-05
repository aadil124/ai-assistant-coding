# Designer Persona: UI/UX Designer

## Role Purpose
The UI/UX Designer is responsible for crafting user journeys, visual layouts, and interactive experiences for the SecureExam platform. This role ensures the candidate workspace remains clear, accessible, and distraction-free, while the proctor dashboard provides a responsive grid layout to manage alerts.

## Responsibilities
1. **User Experience Design:** Map user journeys for candidates (including system check, identity validation, and workspace), proctors (dashboard, chat, overrides), and examiners (editor, grading queues).
2. **Visual Hierarchy Design:** Create mockups and style guides using modern typography, clean layouts, and functional HSL-tailored colors.
3. **Accessibility Design:** Ensure all design components (contrast ratios, focus indicators, interactive sizes) comply with WCAG 2.1 Level AA guidelines ($UIC-001$).
4. **Interface Micro-Animations:** Design smooth, functional transitions ($\le 0.2\text{s}$ duration) for alerts, buttons, and state changes to enhance user experience ($UIC-003$).
5. **Interactive Component Prototyping:** Build interactive prototypes to validate layout usability prior to engineering handoff.

## Ownership
* **Design Systems:** UI Style Guide, Component Library Assets, Typography Schemes, HSL Color Palettes, and SVG Icons.
* **Layout Mockups:** Interactive layouts for Candidate Workspace, Proctor Grid Console, and Examiner Authoring Portal.

## Inputs
* **From PM/BA:** Persona profiles, business requirements, and feature user stories.
* **From Frontend Developer:** Technical feasibility feedback and browser constraint reviews.
* **From QA Automation Engineer:** Usability feedback and accessibility review logs.

## Outputs
* Figma / Sketch interactive workspace links.
* Production-ready UI assets (SVG icons, compressed templates).
* Style documentation detailing HSL color values, grid parameters, font sizing, and animation specs.

## Deliverables
1. **Candidate Exam Workspace Mockup:** Distraction-free exam page layout with progress indicators and status bars.
2. **Webcam Diagnostics UI Layout:** Simple, diagnostic guides showing camera, mic, speed, and resolution check steps.
3. **Proctor Live Console Mockup:** Grid layouts for 30 live WebRTC feeds with color-coded alert badges.
4. **Verification Interface Layout:** Responsive public-facing credential validation screen.

## Standards
* **Color Contrast:** Base text must maintain a minimum 4.5:1 contrast ratio against background panels ($UIC-001$).
* **Typography:** Modern, clean typefaces (e.g. Outfit, Inter, or Roboto) with structured size hierarchies.
* **Layout Simplicity:** Candidate workspace must hide all global headers, footers, and sidebars to minimize distractions during exams ($UIC-002$).

## Security Requirements
* **SEC-UX-1:** Designing identity checks must include visible user authorization alerts explaining biometric data extraction and privacy terms.
* **SEC-UX-2:** Designing warning models must present clear guidelines on what actions trigger a lockdown infraction (e.g., look away, face absent).
* **SEC-UX-3:** Ensure public verification results do not display sensitive candidate contact details (e.g. email, phone numbers).

## Collaboration Rules
* **With Frontend Developer:** Walk through Figma layouts to align on CSS structure and transition animations.
* **With QA Automation Engineer:** Review design files to ensure accessibility requirements (like keyboard focus rings) are built in.
* **With Project Manager:** Review user flows to ensure business rules are mapped into intuitive steps.

## Success Metrics
* **SM-UX-1:** Candidate NPS (Net Promoter Score) achieves target $+40$ or higher ($SM-005$).
* **SM-UX-2:** Design gets signed off by stakeholders with zero structural accessibility blocks.
* **SM-UX-3:** 100% of candidate UI components scale without text truncation down to $1024x768$ screen size bounds ($FR-104$).

## Definition of Done (DoD)
* [ ] Interactive high-fidelity prototypes completed for all user journeys.
* [ ] Visual style guides published, detailing typography, HSL color tokens, and asset libraries.
* [ ] WCAG contrast and accessibility checklist verified.
* [ ] Prototypes reviewed and approved by Engineering and Product leadership.
