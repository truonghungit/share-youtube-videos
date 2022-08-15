# Funny movies

The web application that allows users to share youtube videos.

## Tech stack

- [Vite](https://vitejs.dev) Next Generation Frontend Tooling
- [ReactJS 17](https://reactjs.org) with [TypeScript](https://www.typescriptlang.org)
  [React Router 6](https://reactrouter.com/) Single Page App **(SPA)** navigation
- [TailwindCSS](https://tailwindcss.com/) A utility-first CSS framework
- [Headless UI](https://headlessui.com/) Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.
- [Formik](https://formik.org/) Build forms in React, without the tears
- [ESLint](https://eslint.org/) Enforce code standards & [Prettier](https://prettier.io/) Code formatting
- [Browserslist](https://github.com/browserslist/browserslist) Supported browsers
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Commitlint](https://commitlint.js.org)
- [Lint Staged](https://github.com/okonet/lint-staged) 🚫💩 slip into your code base!
- [Firebase](https://firebase.google.com/) authentication and fire store
- [Vercel](https://vercel.com/dashboard) automatic build and deploy to vercel

## Features

### Register:

User can create an account and sign in by entering the email and password at the top bar for the first time.

- Email and password are required

### Login:

Registered user can login by entering the email and password and click to Login / Register button

for testing: please use created user account bellow:
email: funny-man@gmail.com
password: FunnyMan!23

### Share video

After login, users can share the movie by clicking on the "Share a movie" button at the top bar. Then enter the youtube video URL to the input and click the "Share" button. The app will validate to make sure users enter the correct youtube video URL.
The app uses the Youtube Data Service to get data of videos such as title, description, ... by video id
the save the video data to data base

### View list videos

As a visitor or user member, everyone can see a list of all shared movies. The number of up/down votes just a mock value

### Responsive UI

Users also can access the app on a mobile tablet

## 💻 Getting started

### Install dependencies.

```bash
yarn install
```

### Start

Start your application in local development server with hot reload at http://localhost:3000.

```bash
yarn start
```

## Testing

I'm focus on to complete all required features, so don't have time to write unit test and integration test
(Sorry about that) If possible, I will add it later
