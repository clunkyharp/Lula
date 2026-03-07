# Offline Pet MVP

This workspace contains three packages:

- `offline-pet-api` (NestJS backend)
- `offline-pet-mobile` (React Native app)
- `offline-pet-contracts` (shared API/domain types)

## Quick start

1. `cd offline-pet-contracts && npm install && npm run build`
2. `cd ../offline-pet-api && npm install && npm run start:dev`
3. `cd ../offline-pet-mobile && npm install && npm run start`

## MVP rules implemented

- Clean minute: `+1 coin`, `+2 XP`
- Violated minute: `+0 coin`, `+0 XP`
- Session continues on violation (penalty mode)
- iOS soft enforcement, Android usage-monitor integration stub
- Permanent pet death when health reaches `0`
