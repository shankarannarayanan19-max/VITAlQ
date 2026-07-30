# VITAIQ – AI-Powered Digital Patient Twin (Hackathon Prototype)

VITAIQ is a polished, clinical decision-support hackathon prototype that demonstrates a unified patient longitudinal record, AI clinical summary generation, interactive laboratory trend charting, and predictive risk indicators.

> [!IMPORTANT]
> **Clinical Disclaimer:** VITAIQ is a student hackathon prototype using synthetic patient data. AI-generated outputs are for demonstration and require healthcare-professional review. Not intended for clinical use.

---

## 🔑 Demo Access Credentials

To log into the clinical workspace, use the following credentials on the login screen:
* **Doctor Email:** `doctor@vitaiq.demo`
* **Security Password:** `demo123`

---

## 📋 Synthetic Patient ID Registry

Use these case-insensitive patient IDs to query records in the twin search terminal:
1. **`VIT001`** — Arun Kumar (High Risk Profile - Type 2 Diabetes, Hypertension, Renal Decline, Penicillin Allergy)
2. **`VIT002`** — Meena Devi (Low Risk Profile - Controlled Asthma, stable labs, high adherence)
3. **`VIT003`** — Rahul Sharma (Moderate Risk Profile - Hypertension, Hypercholesterolemia, rising LDL lipids)

---

## 🛠️ Technology Stack

* **Core:** React 18, Vite
* **Styling:** Vanilla CSS variables and glassmorphic designs (Tailwind-free)
* **Routing:** React Router DOM (v6)
* **Visualizations:** Recharts (responsive line charts)
* **Icons:** Lucide React
* **Data State:** Local Storage & local static JSON configuration

---

## 🚀 Execution & Setup Instructions

### 1. Installation
Install all dependencies listed in the package:
```bash
npm install
```
*Note for Windows users:* If PowerShell blocks scripts, run `cmd /c npm install` instead.

### 2. Launch Dev Server
Run the local dev server:
```bash
npm run dev
```
The application will automatically open or print the local port (usually `http://localhost:3000`).

### 3. Build & Production Check
Verify that the build is completely error-free:
```bash
npm run build
```

---

## 📁 Project Structure

```text
VITAIQ/
├── public/
│   └── vitaiq-icon.svg          # Twin branding vector icon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Clinic workspace header
│   │   ├── Sidebar.jsx          # Anchored scroll navigation
│   │   ├── ProtectedRoute.jsx   # Session-state page blocker
│   │   ├── PatientProfileCard.jsx# Twin demographic values
│   │   ├── MedicalTimeline.jsx  # Event tracks with medical icons
│   │   ├── ClinicalSummary.jsx  # Summary state triggers
│   │   ├── RiskCard.jsx         # Status progression bar
│   │   ├── RiskEngine.jsx       # Rule evaluation panel
│   │   ├── ClinicalAlerts.jsx   # Warnings list and referrals
│   │   ├── LabTrendChart.jsx    # Recharts trend trackers
│   │   ├── MedicationList.jsx   # Active medication card list
│   │   ├── AllergyBadge.jsx     # Severe allergy tags
│   │   ├── LoadingAnalysis.jsx  # Process scanner animation
│   │   └── Disclaimer.jsx       # Mandatory disclaimer block
│   ├── pages/
│   │   ├── LandingPage.jsx      # Feature layout & CTA link
│   │   ├── LoginPage.jsx        # Demo credential verification
│   │   ├── PatientSearchPage.jsx# Registry stats and QR scanner
│   │   ├── PatientDashboardPage.jsx# Main twin grid dashboard
│   │   └── NotFoundPage.jsx     # Route boundary helper
│   ├── data/
│   │   └── patients.js          # Synthetic database profiles
│   ├── utils/
│   │   ├── riskEngine.js        # Rule-based calculation metrics
│   │   └── clinicalSummary.js   # Automated summarization logic
│   ├── styles/
│   │   ├── global.css           # Color variables & animations
│   │   ├── landing.css          # Landing cards styling
│   │   ├── login.css            # Entry panel styling
│   │   ├── search.css           # Grid panels & scanner styles
│   │   └── dashboard.css        # Widgets, charts, & sidebar
│   ├── App.jsx                  # Main router setup
│   └── main.jsx                 # Bootstrapper
├── index.html                   # HTML base template
├── package.json                 # Dependency version keys
├── vite.config.js               # Port and compiler settings
└── README.md                    # Setup documentation
```

---

## 🔍 5-Minute Testing Checklist

1. **Landing Page:** Ensure the hero section, the tagline, the 3 feature cards, and the Launch Workspace button display correctly.
2. **Authentication:**
   - Attempt logging in with incorrect details (e.g. `bad@email.com` / `wrong123`) to verify error output.
   - Enter `doctor@vitaiq.demo` / `demo123` to check successful redirection.
   - Try navigating directly to `/patients` when logged out; verify you are redirected to `/login`.
3. **Search Registry:**
   - Test case-insensitive search by typing `vit001` or `VIT002` and pressing Enter.
   - Search for a fake ID (e.g. `VIT999`) to confirm the error message displays.
   - Click "Scan Wristband" to open the simulated scanner, and select "Simulate Wristband Scan" to load Arun Kumar (VIT001).
4. **Interactive Dashboard:**
   - Scroll or click sidebar links (Overview, Timeline, Charts, Alerts) to test smooth anchored scrolling.
   - Click **Generate Clinical Summary** and verify that the 2-second processing spinner animates before revealing the rule-based clinical report.
   - Verify progress bar coloring: Red for High (`VIT001`), Amber for Moderate (`VIT003`), Green for Low (`VIT002`).
   - Hover over Recharts data points to verify that laboratory tooltips operate.
   - Resize your browser window to mobile viewports to verify that the hamburger menu toggles the sidebar drawer correctly.
5. **Session Safety:** Click **Sign Out** or **Logout Session** to clear local storage tokens and ensure you are locked out of clinical routes.

---

## ⚠️ Common Errors & Troubleshooting

### PowerShell Blocked Script Error
* **Error:** `File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled...`
* **Fix:** PowerShell's Execution Policy restricts script running. Run the command using Command Prompt:
  ```bash
  cmd /c npm install
  ```
  Or run inside PowerShell:
  ```powershell
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  npm install
  ```

### Missing Port Port3000
* **Situation:** Vite starts on port 5173 instead of 3000.
* **Explanation:** Port 3000 might already be occupied by another local service. Vite will automatically choose the next available port. Check your terminal output for the correct URL (e.g., `http://localhost:3001`).

### Graph Rendering Delays
* **Explanation:** Recharts requires a defined viewport container. If graphs appear squeezed or fail to render, double-check that the wrapper CSS `.chart-wrapper` defines a fixed height parameter (e.g., `220px`).
