# offline-pet-mobile

React Native client for Offline Pet MVP.

## Core screens included

- Splash / Onboarding / Auth / Create Pet
- Home / Focus / Session Result
- Pet Status / Feed / Play / Heal
- Daily Stats / Streak / Settings

## Focus behavior

- Per-minute ticking session engine
- Violation detection hook (soft iOS mode, Android bridge stub)
- Clean minutes reward pet progression
- Violations apply penalties without ending session

## Run

- `npm install`
- If `android/gradle/wrapper/gradle-wrapper.jar` is missing, run `cd android && gradle wrapper`
- `npm run start`
- `npm run ios` or `npm run android`
- `npm test`
