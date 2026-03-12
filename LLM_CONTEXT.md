# LLM Context

## Project Summary

Offline Pet is a React Native game app + NestJS API that reduces screen time through a virtual pet progression loop.

Stack:
- React Native
- TypeScript (strict)
- Redux Toolkit
- NestJS
- PostgreSQL (target)

## Important Product Rules

- Less phone usage => happier pet.
- Only clean focus minutes count as offline progress.
- Penalty mode: violation does not end session, but gives zero rewards for that minute.
- Reward math: clean minute `+1 coin`, `+2 XP`.
- Permanent pet death is irreversible.
- iOS enforcement is soft mode in MVP.

## Important Engineering Rules

- Functional components only.
- Business logic in services/store, not UI components.
- API calls through service/API layer only.
- Server is authoritative for rewards and state transitions.
- Secrets never committed; `.env.example` only.

## Where to Read First

1. `AGENTS.md`
2. `ARCHITECTURE.md`
3. `API.md`
4. `PROJECT_INDEX.md`
5. Folder-level `README.md` in touched directories
