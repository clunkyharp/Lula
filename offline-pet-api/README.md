# offline-pet-api

NestJS API for Offline Pet MVP.

## Modules

- `auth`: OAuth login (Apple/Google) + JWT issue
- `pet`: pet lifecycle, actions, permanent death rule
- `session`: start/tick/end with minute-level reward engine
- `stats`: today/week stats
- `quest-streak`: daily quest progress and streak state
- `notification`: reminder stub

## Run

- `npm install`
- `cp .env.example .env` and fill OAuth client values
- `npm run start:dev`
- `npm test`

## API

- `POST /auth/oauth`
- `GET /pet`
- `POST /pet/create`
- `POST /pet/feed`
- `POST /pet/play`
- `POST /pet/heal`
- `POST /session/start`
- `POST /session/tick`
- `POST /session/end`
- `GET /stats/today`
- `GET /stats/week`
- `GET /quests/today`
- `GET /streak`
