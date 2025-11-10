# Technical Plan: LLM-Powered Flutter App Builder Platform

## Project Overview and Scope

A **web-based platform** for building Flutter applications using **LLM agents**. Users create, preview, and deploy Flutter apps via **natural language**. Core capabilities:

- Google OAuth sign-in
- Tiered subscriptions & usage tracking
- AI chat (text + voice) that generates/edits Flutter code
- Synchronous **multi-agent** collaboration (coding, revision, testing, deployment)
- Cross-platform previews (web, desktop, mobile)
- Packaging for Android, iOS, Windows, Linux
- MVP: **snapshot previews**; Beta: **interactive streaming (WebRTC)**

Release path: **Stage 1 internal MVP** → **Stage 2 public beta**.

---

## AI Agents (Synchronous Collaboration)

- **Coding Agent (Programmer)**
  - Generates/edits Flutter code from natural language.
  - Creates files, updates project structure, applies diffs.
- **Revision Agent (Reviewer/Refactorer)**
  - Reviews code, enforces idioms and best practices.
  - Suggests/apply refactors, identifies smells & security footguns.
- **Test Agent (Simulator/QA)**
  - Runs app/tests in emulator/simulator; captures errors & logs.
  - Can generate smoke/integration tests and re-run.
- **Deployment Agent (DevOps/Publisher)**
  - Builds release artifacts; assists TestFlight/Play Store flows.
  - Manages versioning, signing inputs, and store metadata (later).

**Coordination:** Orchestrated loop → *code → review → test → fix → build → (optionally) publish*. Agents work **synchronously**; user sees status in chat/logs.

---

## Infrastructure Decisions

- **Hybrid compute**
  - **macOS** hosts (MacStadium / EC2 Mac) for iOS builds & simulators.
  - **Linux** for Android/web builds, LLM backends, web services.
- **LLM integration**
  - External APIs initially (OpenAI/others); abstraction layer for model choice.
  - Voice: STT (Whisper/Cloud STT); optional TTS for responses.
- **Project storage**
  - Source files in object storage (S3-compatible) + metadata in Postgres.
  - Optional Git history (post-MVP); per-project snapshots for rollback.
- **Build & isolation**
  - Per-job sandboxes (containers/VMs). Android emulator on Linux; iOS Simulator on macOS host.
  - Restrict network egress for untrusted app runs.
- **Preview**
  - **MVP:** snapshot captures (web headless/Puppeteer; sim screenshots).
  - **Beta:** **WebRTC** streaming (Android emulator WebRTC pipeline; iOS via VNC→WebRTC or equivalent).
- **Scalability/ops**
  - Containers + orchestration (Kubernetes) by Beta.
  - Queues for builds/tests; metrics & logs; per-user rate limits.

---

## Development Phases & Milestones (2-Person Team)

### Phase 1 — Internal MVP (≈ 12 weeks)

**Goal:** End-to-end internal product: chat → code → build → **snapshot** preview.

1) **Foundations (Weeks 1-2)**
   - Repos, CI, basic infra; Postgres + S3/bucket wiring.
   - Google OAuth login; user profiles; auth middleware.

2) **Chat + Coding Agent (Weeks 3-5)**
   - Streaming chat UI; model selection; basic STT input.
   - Backend LLM gateway; prompt templates; code-block parsing & file writes.

3) **Project Workspace (Weeks 3-6)**
   - `flutter create` scaffold per project.
   - Project dashboard: tree view, file viewer (read-only).
   - File APIs (list/get); basic versions/snapshots for safety.

4) **Snapshot Preview (Weeks 7-9)**
   - Build pipeline:
     - Web: `flutter build web` + headless capture at device breakpoints.
     - (Optional) Android/iOS: single sim/device snapshot if simple.
   - “Refresh Preview” button; show mobile/desktop images.
   - **Smoke testing:** launch & capture runtime errors → feed back to chat.

5) **Minimal Deployment Touchpoint (Weeks 9-10)**
   - Internal-only: generate APK/IPA (manual signing OK).
   - Optional “Download APK” for internal dogfooding.

6) **Usage Tracking (Weeks 10-11)**
   - Counters for prompts/tokens/build minutes; admin usage dashboard.

7) **Stabilization (Week 12)**
   - Dogfood flows; prompt tuning; error surfacing; reliability fixes.
   - **Agents active:** Coding (full), Test (smoke), Revision (manual/implicit), Deployment (manual).

**Deliverable:** Internal build supporting AI-driven app creation and **snapshot previews**.

---

### Phase 2 — Public Beta (≈ 8–10 weeks)

**Goal:** **Interactive** previews, robust multi-agent loop, subscriptions; invite/open beta.

1) **Interactive Preview (Weeks 1-4)**
   - **Android:** WebRTC emulator pipeline; browser input → device, low-latency video back.
   - **iOS:** best-effort interactive via VNC→WebRTC or snapshot fallback.
   - UI toggle: Snapshot ↔ Live; session quotas; autoscale preview workers.

2) **Multi-Agent Enhancements (Weeks 2-6, overlapped)**
   - **Revision Agent**: post-gen review + auto-refactor diffs (with guardrails).
   - **Test Agent**: generate integration tests; orchestrated retry loop on failures.
   - Orchestrator: *code → review → test → fix* until green or max iterations.

3) **Deployment/Distribution (Weeks 3-6)**
   - UI: “Build Android” / “Build iOS”; downloadable artifacts.
   - (Optional) early integration with Play/App Store Connect (user creds flow).
   - Metadata assistant (titles/descriptions/screenshots checklist).

4) **Subscriptions & Limits (Weeks 5-6)**
   - Plans: Basic (snapshot), Pro (interactive), Team (priority/multi-target).
   - Enforce quotas; self-serve billing; usage dashboard.

5) **Polish & Scale (Weeks 4-8)**
   - UX copy; tooltips; onboarding flows.
   - Observability: traces/logs/alerts; perf tuning; autoscaling rules.
   - Security: secret storage; SBOM/software updates; sandbox audits.

**Deliverable:** Public Beta with **live previews**, multi-agent dev loop, billing, & downloadable builds.

---

## Component Priorities & Dependencies

1) **Auth & users** → foundation for projects/limits.
2) **Coding Agent + Chat** → core value path.
3) **Project storage + file APIs** → persistence + dashboard.
4) **Build + Snapshot Preview** → first visual feedback.
5) **Smoke Test hook** → minimal correctness loop.
6) **Usage tracking** → informs pricing/limits.
7) **Subscriptions** → required for Beta monetization.
8) **Revision/Test Agents (enhanced)** → quality & reliability.
9) **Interactive Preview (WebRTC)** → real-time UX.
10) **Deployment/Publishing** → distribution pipeline.
11) **Post-beta** → collaboration, templates, deeper store automation.

---

## Timeline At-a-Glance

- **Month 1:** Auth, chat, Coding Agent MVP.
- **Month 2:** Project storage, snapshot preview pipeline; first E2E demo.
- **Month 3:** Smoke tests, tuning, internal MVP.
- **Month 4:** WebRTC live preview (Android), Revision Agent; downloads.
- **Month 5:** Test Agent (generated tests), subscriptions, invite beta.
- **Month 6:** Scale + polish, broader beta; incremental store flows.

---

## Technical Notes & Practices

- **Orchestration pattern:** hybrid *blackboard (shared state)* + *message bus* for agent events.
- **Sandboxing:** per-job container/VM; blocked egress by default; signed artifacts only.
- **Prompt discipline:** role-specific system prompts; defensive output parsing (code fencing, file maps).
- **CI of the platform:** nightly “self-dogfood” tasks: scripted prompts → build → test.
- **Fallback UX:** if live preview capacity is saturated, auto-degrade to snapshot mode.

---

## Ready-Next Checklist (Internal MVP → Beta)

- [ ] Finalize agent prompts (coding, revision, test).
- [ ] Provision Mac host + Linux build workers; pipeline smoke tests.
- [ ] Implement snapshot capture service with queueing.
- [ ] Add status channel in chat (“building… testing… failed/passed…”).
- [ ] Usage counters + admin panel.
- [ ] WebRTC live preview MVP; guard with plan/quotas.
- [ ] Subscription flows; enforce limits; launch invite beta.

---

## Summary

This plan delivers a **modular, scalable** AI-driven Flutter builder. Phase 1 proves the loop with **snapshots**; Phase 2 unlocks **interactive streaming** and a **multi-agent** quality pipeline (code, review, test, deploy). The **hybrid macOS/Linux** strategy meets Apple requirements while controlling cost. Synchronous agents and a transparent UX keep users in control while accelerating development.
