# Rate Repository App

A React Native application for browsing and reviewing GitHub repositories, built with Expo and Apollo Client.

## Features

- Browse, search, and sort repositories with paginated results.
- View repository statistics and reviews.
- Sign up, sign in, and sign out.
- Create reviews and manage your own reviews.
- Persist authentication with AsyncStorage.

## Getting started

Run these commands from this repository's root:

```bash
npm install
```

Create a `.env` file with the GraphQL endpoint for your running Rate Repository API:

```dotenv
EXPO_PUBLIC_APOLLO_URI=http://localhost:4000
```

For an Android emulator, use `http://10.0.2.2:4000`. For a physical device, use your computer's local network IP address and ensure the device can reach the server. Replace the port if your backend uses a different Apollo port.

The backend is maintained separately in the sibling `rate-repository-api` directory in this workspace. Follow its README to configure credentials, initialize the database, and start the API before using the app.

Start the development server:

```bash
npm start
```

Restart the development server after changing `.env`. Variables prefixed with `EXPO_PUBLIC_` are included in the client app, so keep secrets out of them.

## Commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run web` | Start the web version |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

Local native builds require the corresponding Android or iOS development tools.

## Project structure

- `src/components/`: screens and shared UI components.
- `src/graphql/`: GraphQL queries.
- `src/hooks/`: repository and authentication hooks.
- `src/contexts/`: shared authentication storage context.
- `src/utils/`: Apollo Client configuration and authentication storage.
- `src/theme.js`: shared styling values.
- `__tests__/`: component and cache tests.
