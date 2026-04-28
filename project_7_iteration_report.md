# TD-PCL Project 2024-25: Farmer's Direct
## 7-Iteration Progress Report

---

### Iteration 1 (Weeks 1 & 2): Project Setup & Scope
**1. Key Activities:** Defined project scope, set up HTML5/CSS3 folder structure, and researched agricultural supply chain problems in India.
**2. Key Learning:** Learned how to architect a multi-sided marketplace platform serving farmers, consumers, and admins.
**3. Challenge & Response:** Organizing styles across pages was messy. Solved by creating a modular CSS system (`base.css`, `layout.css`, `components.css`).
**4. Next Steps:** Build the main landing page wireframes and establish branding.

---

### Iteration 2 (Weeks 3 & 4): Landing Page & Branding
**1. Key Activities:** Developed `index.html` with hero section, features grid, and established the brand's typography (Inter & Playfair Display) and gold color scheme.
**2. Key Learning:** Gained strong skills in CSS Flexbox and Grid for complex responsive layouts.
**3. Challenge & Response:** The site looked generic. Fixed by applying a dark theme with gold accents to create a premium feel.
**4. Next Steps:** Build the layouts for farmer, consumer, and admin dashboards.

---

### Iteration 3 (Weeks 5 & 6): Dashboard Layouts
**1. Key Activities:** Built static layouts for `farmer.html`, `consumer.html`, and `admin.html` with stat cards, tables, and sidebar navigation.
**2. Key Learning:** Learned how to structure complex data tables and reusable UI components purely in HTML/CSS.
**3. Challenge & Response:** Maintaining design consistency across 4+ pages. Solved by strictly reusing shared classes from `components.css`.
**4. Next Steps:** Implement JavaScript to make data dynamic and build the mock database.

---

### Iteration 4 (Weeks 7 & 8): Mock Data & Dynamic Rendering
**1. Key Activities:** Created `mockdata.js` as a simulated database and wrote Vanilla JS to dynamically render product cards, farmer stats, and order lists.
**2. Key Learning:** Mastered DOM manipulation and learned to simulate backend API responses using local JavaScript objects.
**3. Challenge & Response:** Rendering data without a real backend. Addressed by writing custom JS functions to inject HTML templates dynamically.
**4. Next Steps:** Implement admin authentication and secure the admin panel.

---

### Iteration 5 (Weeks 9 & 10): Admin Security & AI Integration
**1. Key Activities:** Built `admin-login.html` with hardcoded login via `localStorage`. Integrated Groq AI API to build a real-time crop market price prediction tool (`ai-pricing.html`).
**2. Key Learning:** Learned browser session management (`localStorage`) and how to call external LLM APIs (Groq) from frontend JavaScript using `fetch()`.
**3. Challenge & Response:** Calling an AI API from a static frontend without a backend server. Solved by using client-side API key storage and direct REST calls to Groq's endpoint.
**4. Next Steps:** Overhaul the entire UI to a professional-grade aesthetic.

---

### Iteration 6 (Weeks 11 & 12): Premium UI/UX Upgrade
**1. Key Activities:** Rewrote entire CSS architecture to implement a "Luxury Gold" aesthetic with glassmorphism, replaced emojis with professional SVG icons (Lucide).
**2. Key Learning:** Mastered advanced CSS like `backdrop-filter` for frosted glass effects and CSS custom properties for scalable theming.
**3. Challenge & Response:** Original emoji icons looked unprofessional. Solved by integrating a uniform SVG icon library for a clean, consistent look.
**4. Next Steps:** Add complex animations and ensure full mobile responsiveness.

---

### Iteration 7 (Weeks 13 & 14): Animations & Final Polish
**1. Key Activities:** Added custom JS particle engine, morphing hero gradient blobs, cubic-bezier hover physics, scroll-triggered reveals, and finalized mobile responsiveness.
**2. Key Learning:** Learned to optimize CSS keyframe animations and use JavaScript Intersection Observers for performant scroll-based effects.
**3. Challenge & Response:** Heavy animations caused lag on mobile. Fixed by using CSS media queries to disable intensive effects on screens under 768px.
**4. Next Steps:** Finalize project documentation, prepare the presentation deck, and present to the TD-PCL review panel.
