# Rate Repository App

A React Native application for browsing and reviewing GitHub repositories, built with Expo and Apollo Client.

## Features

- Browse, search, and sort repositories with paginated results.
- View repository statistics and reviews.
- Sign up, sign in, and sign out.
- Create reviews and manage your own reviews.
- Persist authentication with AsyncStorage.

## Try the App on your phone

Try the App on your phone by scanning the QR code with Expo Go:
![QR](./qr.png)

## Commands

| Command           | Purpose                           |
| ----------------- | --------------------------------- |
| `npm start`       | Start the Expo development server |
| `npm run android` | Build and run on Android          |
| `npm run ios`     | Build and run on iOS              |
| `npm run web`     | Start the web version             |
| `npm run lint`    | Run ESLint                        |
| `npm test`        | Run Jest tests                    |

Local native builds require the corresponding Android or iOS development tools.

## Project structure

- `src/components/`: screens and shared UI components.
- `src/graphql/`: GraphQL queries.
- `src/hooks/`: repository and authentication hooks.
- `src/contexts/`: shared authentication storage context.
- `src/utils/`: Apollo Client configuration and authentication storage.
- `src/theme.js`: shared styling values.
- `__tests__/`: component and cache tests.
