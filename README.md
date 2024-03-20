# Usage

## Install
```
npm install --save @egym/mwa-utils
```

## API
1. `getPortalsInitialContext` is the same as `getInitialContext` from the standard `@ionic/portals` package, but with support for both v4 and v5 Capacitor versions
2. `portalsPublish` is the same as `publish` from the standard `@ionic/portals` package, but with extra logging with the help of `@egym/mwa-logger`
3. `portalsSubscribe` is the same as `subscribe` from the standard `@ionic/portals` package, but with extra logging with the help of `@egym/mwa-logger`

# Modern.js Package

## Setup

Install the dependencies:

```bash
npm run install
```

## Get Started

Run and debug the module:

```bash
npm run dev
```

Run test cases:

```bash
npm run test
```

Build the module for production:

```bash
npm run build
```

Enable optional features:

```bash
npm run new
```

Other commands:

```bash
npm run lint         # Lint and fix source files
npm run change       # Add a new changeset
npm run bump         # Update version and changelog via changeset
npm run release      # Release the package
```

For more information, see the [Modern.js Module documentation](https://modernjs.dev/module-tools/en).
