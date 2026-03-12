# API Contract Context

This file defines the current API surface and response conventions.

## Base Convention

- JSON over HTTPS
- Auth: Bearer JWT for protected endpoints
- Stable response envelope is recommended for future migration:

```json
{
  "success": true,
  "data": {}
}
```

Current MVP endpoints may still return direct payload objects.

## Auth

- `POST /auth/oauth`
  - Request: `{ provider: 'apple' | 'google', idToken: string }`
  - Response: `{ userId, tokens: { accessToken, refreshToken }, bootstrapPetRequired }`

## Pet

- `GET /pet`
- `POST /pet/create`
- `POST /pet/feed`
- `POST /pet/play`
- `POST /pet/heal`

## Session

- `POST /session/start`
- `POST /session/tick`
- `POST /session/end`

## Stats

- `GET /stats/today`
- `GET /stats/week`

## Quest/Streak

- `GET /quests/today`
- `GET /streak`

## Domain Guarantees

- Reward engine is server authoritative.
- Permanent death is irreversible in domain state.
- Only clean focus minutes are counted as offline progress.
