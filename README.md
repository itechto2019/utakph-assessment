## Table of contents

- [Table of contents](#table-of-contents)
- [Setup](#how-to-run)
- [Requirements](#requirements)
- [Installing Packages](#install-packages)
- [Development](#development)
- [Production](#build-production)

# How to run?

## Requirements
Node v20.x
NPM v10.x
YARN v1.2x
Firebase credentials

### Install packages

Clone first. 

```bash
git clone https://github.com/itechto2019/utakph-assessment.git
```

Go to root directory.

```bash
cd utakph-crud
```
create or add .env file on root of the project and fill these:

```bash
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_DATABASE_URL
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

Run any of the following command.

```bash
npm i
```

```bash
npm install
```

```bash
yarn install
```

### Development

To run app, run again any of the following command.

```bash
yarn dev
```

```bash
npm run dev
```

### Build production

To build the app in production mode, run any of the following command.

```bash
yarn build
```

```bash
npm run build
```
