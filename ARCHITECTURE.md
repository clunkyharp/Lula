# System Architecture

## Overview

Offline Pet is a multi-package workspace:
- Mobile client: React Native + TypeScript + Redux Toolkit
- Backend API: NestJS + TypeScript (clean modular services)
- Shared contracts: TypeScript domain/API interfaces
- Data layer target: PostgreSQL (+ Redis planned)

## Runtime Topology

Mobile App
  -> HTTPS API
  -> Auth (OAuth: Apple/Google)
  -> Domain services (pet/session/stats/quests/streak)
  -> Persistence (PostgreSQL)

## Mobile Architecture

- Presentation: `src/screens`, `src/components`
- State: `src/store` (Redux Toolkit slices)
- Domain/side effects: `src/services`
- API transport: `src/api`
- Platform enforcement: native usage monitor bridge + `platformUsage.ts`

Rules:
- Components are functional.
- Business logic goes to services/store.
- API calls only in `src/api` and service layer.

## Backend Architecture

Modules:
- `auth`
- `pet`
- `session`
- `stats`
- `quest-streak`
- `notification`

Rules:
- Controllers: transport only.
- Services/rules: domain logic and invariants.
- Server is source of truth for reward and anti-cheat calculations.

## Auth Flow

1. Mobile sends OAuth `id_token` to `/auth/oauth`.
2. Server validates signature + issuer + audience.
3. Server creates/fetches user identity and returns JWT tokens.
4. Mobile uses access token for protected endpoints.

## Focus Session Flow

1. `POST /session/start`
2. Per minute: `POST /session/tick`
3. `POST /session/end`

Reward policy:
- clean minute => `+1 coin`, `+2 XP`
- violated minute => `+0 coin`, `+0 XP`
- session continues in penalty mode
