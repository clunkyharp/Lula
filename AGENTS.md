# AGENTS.md

This document defines coding and engineering standards for the Offline Pet workspace.
Applies to:
- `offline-pet-mobile` (React Native + TypeScript)
- `offline-pet-api` (NestJS + TypeScript)
- `offline-pet-contracts` (shared TypeScript contracts)

## 1) Global Engineering Rules

- Keep all code and comments in English; product text may be localized.
- Prefer strict typing over `any`; avoid unsafe casts unless justified.
- Keep functions small, deterministic, and side-effect aware.
- Use clear names that reflect domain intent (focus session, violation, clean minute, streak).
- One source of truth per concern (shared types in `offline-pet-contracts`).
- Do not introduce hidden magic values; extract constants for game rules and thresholds.
- Avoid dead code, commented-out code, and speculative abstractions.
- Any API or behavior change must update docs and tests in the same change.

## 2) TypeScript Standards (All Packages)

- Enable and keep `strict` mode.
- Prefer union types and discriminated unions for states/events.
- Use `interface` for object contracts, `type` for unions/utility composition.
- Use `readonly` for immutable structures where appropriate.
- Use `async/await`; avoid naked `.then()` chains in new code.
- Throw domain-meaningful errors; never swallow errors silently.
- Keep module exports explicit; avoid wildcard exports from feature modules.

## 3) React Native Standards (`offline-pet-mobile`)

- UI must be functional components with hooks.
- Keep screens thin; move business logic to services/store.
- Prefer Redux Toolkit slice actions for state changes; do not mutate external state.
- No API calls directly in presentational components; use `api/` and `services/` layers.
- Session ticking logic lives in `services/focusEngine.ts`; do not duplicate timer logic.
- Platform-specific behavior must be isolated in `services/platformUsage.ts` and native modules.
- iOS enforcement in MVP is soft-only; do not claim hard app blocking on iOS.
- Use style objects/StyleSheet; no inline style churn for large blocks.
- Keep accessibility in mind: meaningful button labels and readable contrast.

## 4) NestJS Standards (`offline-pet-api`)

- Follow module boundaries: `auth`, `pet`, `session`, `stats`, `quest-streak`, `notification`.
- Controllers handle transport concerns only; domain rules belong in services/rules.
- Validate all input DTOs using `class-validator`.
- Never trust client-calculated rewards; server must be authoritative.
- Keep reward policy explicit:
  - clean minute => `+1 coin`, `+2 XP`
  - violated minute => `+0 coin`, `+0 XP`
- Permanent death invariant: once dead, pet cannot return to alive states.
- OAuth verification must validate issuer/audience/signature, not token shape only.
- Configuration via environment variables; no hardcoded secrets in source.

## 5) Contracts Standards (`offline-pet-contracts`)

- Contracts package is the source of truth for API payloads and domain primitives.
- Breaking changes require version bump and coordinated updates in mobile and API.
- Keep DTO names stable and explicit (`*Request`, `*Response`, domain model names).
- Prefer additive evolution; deprecate before removing fields.

## 6) Testing Standards

- Add or update tests for every non-trivial behavior change.
- Prefer full object equality assertions over field-by-field when practical.
- Cover core game invariants:
  - reward/penalty math
  - state transitions and evolution thresholds
  - permanent death behavior
  - streak increment/reset behavior
- Mobile tests should cover reducer and session engine behavior.
- API tests should cover rules and service-level behavior.

## 7) Performance and Reliability

- Avoid unnecessary rerenders and expensive computations in render paths.
- Keep background work predictable; timers must be started/stopped explicitly.
- Guard native module calls and provide safe fallback behavior.
- Fail fast on invalid state; return actionable error messages.

## 8) Security and Privacy

- Store secrets only in environment/config, never in repository code.
- Validate and sanitize all external input.
- Use HTTPS endpoints in non-local environments.
- Minimize collected behavioral data; keep only what is required for product features.
- Do not log tokens, personal identifiers, or sensitive payloads.

## 9) Git and Change Hygiene

- Make focused, atomic changes by feature.
- Keep commit messages semantic and informative.
- Do not reformat unrelated files.
- If you touch public behavior, update README/docs and tests in the same change.

## 10) Definition of Done

A change is done only when:
- code compiles/typechecks,
- relevant tests pass,
- docs/contracts are updated,
- behavior matches product rules in this repository.

## 11) Agent Memory Workflow (GitHub Issues/Projects)

- Use GitHub Issues and GitHub Projects as persistent memory between agent sessions.
- Create one memory issue per implementation task using `.github/ISSUE_TEMPLATE/agent-memory-task.md`.
- Maintain session continuity by updating the issue with:
  - completed work,
  - technical decisions,
  - open risks/blockers,
  - one explicit next action.
- Keep project status synchronized (`Backlog`, `Ready`, `In Progress`, `Blocked`, `Review`, `Done`).
- Never start substantial implementation without an existing memory issue.
- Prefer script automation via `scripts/agent-memory.sh`.
