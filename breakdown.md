# 🎯 Project Development Schedule – Vibe‑Coding Tool

This **colorful edition** of the project plan lays out the timeline, tasks and dependencies for building the AI‑assisted Flutter development platform.  Icons are used throughout to make the schedule easier to scan, and tables summarize dates and responsibilities.  The plan assumes two developers working in the America/Chicago time zone and reflects platform‑specific regulations for Android, Windows and iOS.

> 📌 **Note on regulatory requirements:**  New Android apps must target **API 35 (Android 15)** by **31 Aug 2025**:contentReference[oaicite:0]{index=0}.  Windows apps in the Microsoft Store require MSIX packaging with identity information and `msix_config` in `pubspec.yaml`:contentReference[oaicite:1]{index=1}.  iOS apps submitted after **24 Apr 2025** must be built with **Xcode 16** and an **iOS 18 SDK**:contentReference[oaicite:2]{index=2}.  These requirements influence the packaging milestones.

## 📅 Milestone overview

| 🔖 Milestone | ⏳ Duration | 🗓️ Start | 🗓️ End | 👥 Lead | 📦 Key outputs |
|---|---|---|---|---|---|
| **M0: Setup & CI** | 1 week | 10 Nov 2025 | 17 Nov 2025 | A + B | Repo scaffolding, CI/CD, Docker & docs |
| **M1: Auth & Billing** | 2 weeks | 17 Nov 2025 | 1 Dec 2025 | A | Google OIDC, Stripe integration, user DB |
| **M2: Frontend shell** | 2 weeks | 1 Dec 2025 | 15 Dec 2025 | B | Next.js layout, chat UI, navigation |
| **M3: Agents & Template** | 3 weeks | 15 Dec 2025 | 5 Jan 2026 | A | Multi‑agent pipeline, Flutter scaffold |
| **M4: Web preview & edit** | 2 weeks | 5 Jan 2026 | 19 Jan 2026 | B | File API, hot reload preview, responsive frames |
| **M5: Dashboard & explorer** | 2 weeks | 19 Jan 2026 | 2 Feb 2026 | B | File tree, editor, commit history |
| **M6: Deployment pipelines** | 2 weeks | 2 Feb 2026 | 16 Feb 2026 | A | MSIX & AppImage packaging, Android AAB, iOS bundle |
| **M7: Voice & summary** | 1 week | 16 Feb 2026 | 23 Feb 2026 | A + B | STT/TTS integration, summary endpoints |
| **M8: Security & compliance** | 1 week | 23 Feb 2026 | 2 Mar 2026 | A | Sandboxing, RBAC, rate limiting |
| **M9: Testing & polish** | 10 days | 2 Mar 2026 | 12 Mar 2026 | A + B | UX refinements, docs, release candidate |

## 🧱 Milestone details

### M0: Setup & CI (10 Nov – 17 Nov 2025)

**Goal:** Build the foundation for the project.

* 🗂️ **Repository structure:** Create a monorepo with `backend/`, `frontend/` and `template/` folders; define branch strategy and versioning.
* ⚙️ **CI/CD:** Configure GitHub Actions to run unit tests and static analysis; set up Docker containers for build workers.
* 📘 **Documentation:** Write a high‑level architecture diagram and initial README so collaborators understand the system.

### M1: Authentication & Billing (17 Nov – 1 Dec 2025)

**Goal:** Enable secure user onboarding and subscription management.

* 🔑 **Sign‑in:** Implement Google OAuth using **OpenID Connect**; collect only `openid email profile` scopes to avoid unnecessary permissions.
* 💳 **Billing:** Integrate Stripe Billing to handle subscription tiers, credit usage and invoices.
* 👤 **Account management:** Build pages for profile, billing history and legal statements; draft Terms of Service and Privacy Policy.

### M2: Frontend shell (1 Dec – 15 Dec 2025)

**Goal:** Deliver a responsive UI skeleton.

* 🖥️ **Layout:** Use Next.js with Tailwind CSS to create a header, sidebar and content panes; ensure responsive design.
* 💬 **Chat panel:** Implement a chat box with model selector, credit usage indicator and message history.
* 🧭 **Navigation:** Scaffold pages for preview, dashboard, settings and legal statements.

### M3: Agent backend & Flutter template (15 Dec – 5 Jan 2026)

**Goal:** Build the AI workflow and a solid Flutter starting point.

* 🤖 **Multi‑agent pipeline:** Implement the Planner → Coder → Tester → Builder pattern using LangChain or OpenAI Assistants API.  Agents should use tool calls to create files, apply patches and run builds.
* 🏗️ **Flutter scaffold:** Produce a template using `go_router`, `riverpod`/`bloc`, strict lints and tests.  Include device‑adaptive widgets.
* 🧪 **Self‑check loop:** After each edit the Tester runs `dart format`, `dart analyze` and tests; the Builder compiles a web preview.  Agents retry on failure.

### M4: Web preview & edit (5 Jan – 19 Jan 2026)

**Goal:** Provide instant feedback when generating code.

* 📁 **File operations API:** Implement endpoints to list files, read content and apply unified diffs from the agent.
* 🔄 **Hot reload preview:** Run `flutter run -d web-server` in a container; embed the server in an iframe and trigger reloads on code changes.
* 📱 **Responsive frames:** Use preset breakpoints to simulate desktop, tablet and phone; handle delta updates via WebSockets.

### M5: Project dashboard & explorer (19 Jan – 2 Feb 2026)

**Goal:** Expose the real project structure and build history.

* 📂 **File explorer:** Integrate a Monaco‑based code editor with syntax highlighting; display a tree view with status icons for new/modified files.
* 🕒 **History viewer:** Provide commit messages generated by the agent; allow diff viewing and rollback.
* 🧱 **Build logs:** Surface per‑platform build status, logs and downloadable artifacts.

### M6: Deployment pipelines (2 Feb – 16 Feb 2026)

**Goal:** Enable multi‑platform distribution.

* 🪟 **Windows & Linux:** Package Windows apps as **MSIX** bundles, including package identity and `msix_config`:contentReference[oaicite:3]{index=3}; package Linux builds as AppImage or `.deb`.
* 🤖 **Android:** Generate **AAB** and target **API 35**; manage keystores and integrate Play Console or fastlane for publishing:contentReference[oaicite:4]{index=4}.
* 🍏 **iOS:** Use a macOS runner to build with **Xcode 16** and an **iOS 18 SDK**:contentReference[oaicite:5]{index=5}; handle provisioning and notarization; integrate fastlane for TestFlight distribution.

### M7: Voice & summary (16 Feb – 23 Feb 2026)

**Goal:** Add audio input and summarization features.

* 🎤 **Voice input:** Use Web RTC to capture microphone audio (requires user permission) and stream to the backend for STT.
* 🗣️ **TTS & summarization:** Provide endpoints to summarise sessions and generate text‑to‑speech; display a “Summary” button in the chat panel.

### M8: Security & compliance (23 Feb – 2 Mar 2026)

**Goal:** Harden the platform against misuse.

* 🛡️ **Isolation:** Run builds in locked‑down containers; restrict network egress and file access.
* ⏱️ **Rate limits & quotas:** Apply per‑user token and build quotas; surface usage in the UI.
* 🔐 **Privacy:** Implement RBAC, encrypted storage and GDPR‑compliant data controls; update policies to reflect platform rules.

### M9: Testing & polish (2 Mar – 12 Mar 2026)

**Goal:** Prepare for public beta and ensure quality.

* 🧪 **Usability testing:** Gather feedback from early users; fix bugs and improve responsiveness.
* 🧹 **UX polish:** Refine design tokens and ensure accessibility (contrast, keyboard navigation, screen‑reader friendly).  Provide onboarding tutorials.
* 📦 **Release candidate:** Validate compliance with Android, Windows and iOS requirements:contentReference[oaicite:6]{index=6}:contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}; produce release notes and plan the launch.

## 🤝 Coordination tips

* 🔄 **Parallel work:** Engineer A (backend/infrastructure) and Engineer B (frontend/template) can work concurrently on separate milestones.  Regularly merge changes to avoid drift.
* 🧠 **Knowledge sharing:** Hold brief daily stand‑ups and weekly sprint reviews.  Use the dashboard to visualise progress and detect build failures early.
* 🛠️ **Continuous improvement:** After each milestone, reassess priorities and adjust the plan based on feedback and evolving platform policies.

