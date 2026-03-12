# Project Index

## Workspace Packages

- `offline-pet-mobile`
- `offline-pet-api`
- `offline-pet-contracts`

## Key Mobile Modules

- `offline-pet-mobile/src/services/focusEngine.ts`
  - Focus session minute ticking and reward/penalty state updates.
- `offline-pet-mobile/src/services/platformUsage.ts`
  - Blocked app detection and platform-specific enforcement signals.
- `offline-pet-mobile/src/store/slices/sessionSlice.ts`
  - Session lifecycle and reward counters.
- `offline-pet-mobile/src/store/slices/petSlice.ts`
  - Pet stats transitions and permanent death handling.
- `offline-pet-mobile/src/api/client.ts`
  - HTTP transport helper.

## Key API Modules

- `offline-pet-api/src/auth/auth.service.ts`
  - OAuth token validation (Google/Apple) and JWT issue.
- `offline-pet-api/src/session/session.service.ts`
  - Start/tick/end workflow and reward application.
- `offline-pet-api/src/pet/pet.rules.ts`
  - Stage/emotion derivation and permanent death invariant.
- `offline-pet-api/src/stats/stats.service.ts`
  - Daily/weekly aggregation.
- `offline-pet-api/src/quest-streak/quest-streak.service.ts`
  - Quest completion and streak logic.

## Shared Contracts

- `offline-pet-contracts/src/index.ts`
  - Shared request/response/domain interfaces.
