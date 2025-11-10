# 🌐 Front-End Web Pages for the AI-Powered Flutter Builder Platform

Below is a complete list of **web pages** required for the AI-driven Flutter app builder.  
Each includes its **purpose**, **content/components**, and **dependencies**.

---

## 🏠 1. Landing Page / Marketing Homepage
**Purpose:** Public introduction to the platform.

**Components:**
- Hero banner with tagline (“Build Flutter apps with AI”)
- Demo video / animation
- Feature highlights (AI coding, live preview, one-click deploy)
- Pricing summary (Basic, Pro, Team)
- “Sign in with Google” CTA
- Footer with Terms, Privacy, Contact links

**Dependencies:** OAuth setup, analytics, pricing config.

---

## 🔐 2. Login / Sign-Up Page
**Purpose:** Handles Gmail OAuth authentication.

**Components:**
- Google “Sign in with Google” button
- Redirect on success → Dashboard
- Error handling / retry
- Optional “Guest Demo” mode

**Dependencies:** Google OAuth backend, user record creation.

---

## 🧭 3. Dashboard / Project List
**Purpose:** Main hub after login.

**Components:**
- Sidebar navigation (Dashboard, Chat Studio, Billing, Settings)
- “Create New Project” button
- List/grid of project cards (title, date, status)
- Search & sort bar
- Quick actions: Open / Delete / Duplicate

**Dependencies:** User/project DB, metadata API.

---

## 💬 4. AI Chat Studio
**Purpose:** Core interface where users chat with AI agents.

**Components:**
- Chat input (text + mic for voice)
- Real-time AI responses with syntax-highlighted code blocks
- Model selector dropdown
- “Apply to Project” / “Discard” controls
- Status display (building, testing, deployed)
- Sidebar with current project context

**Dependencies:** LLM API, multi-agent orchestrator.

---

## 🗂️ 5. Project Workspace / File Explorer
**Purpose:** Manage and preview project source files.

**Components:**
- Tree view of folders/files
- File content viewer (read-only in MVP)
- Diff viewer for AI changes
- Search within project
- “Discuss in Chat” button

**Dependencies:** File storage API, diff service.

---

## 🖥️ 6. Preview Page
**Purpose:** Display the built app preview.

**Modes:**
- **Snapshot Mode (MVP):** Static images (screenshots)
- **Live Mode (Beta):** Interactive WebRTC stream

**Components:**
- Device selector (Web, Android, iOS, Desktop)
- “Refresh Preview” button
- “Go Live” toggle
- Live preview window or snapshot carousel
- Status indicator (Running / Idle)

**Dependencies:** Build service, WebRTC backend, Mac/Linux emulator nodes.

---

## 🧪 7. Testing & Logs
**Purpose:** Show test results from Test Agent.

**Components:**
- Automated test list (status, duration)
- Console log viewer (build/test output)
- Visual diff for failed UI tests
- “Re-run Tests” and “Fix via AI” buttons

**Dependencies:** Test Agent API, log storage service.

---

## 📦 8. Deployment / Publish Page
**Purpose:** Manage builds and optional store publishing.

**Components:**
- Platform toggles (Android, iOS, Web, Desktop)
- “Build Release” button
- Build progress indicators
- Download links for binaries (AAB, IPA, etc.)
- App store metadata checklist (icon, screenshots)
- API credential fields for stores (future)

**Dependencies:** Deployment Agent, build/signing service.

---

## 💳 9. Subscription / Billing Page
**Purpose:** Manage plans, payments, and usage.

**Components:**
- Current plan & usage summary (AI tokens, build hours)
- Usage charts
- Upgrade/downgrade buttons
- Payment method management
- Billing history

**Dependencies:** Stripe API, usage tracking backend.

---

## ⚙️ 10. Account Settings
**Purpose:** Manage personal and platform preferences.

**Components:**
- Profile info (name, email)
- Notification and privacy settings
- Default model selection
- API key management (if applicable)
- “Delete Account” button

**Dependencies:** User DB, settings API.

---

## 🧑‍💻 11. Admin Console (Internal)
**Purpose:** Internal tool for monitoring system health.

**Components:**
- Active users/projects overview
- Current build/simulator sessions
- System metrics (CPU/memory/network)
- Manual job termination
- Token cost tracking dashboard

**Dependencies:** Internal orchestration + analytics API.

---

## 📄 12. Legal & Support Pages
**Purpose:** Compliance, help, and communication.

**Pages:**
- Terms of Service
- Privacy Policy
- FAQ / Help Center
- Contact / Support form
- Changelog / Release Notes

**Dependencies:** Static content / CMS.

---

## 🔁 Navigation Flow Overview
