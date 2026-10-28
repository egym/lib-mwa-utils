# Usage

## Install

```
npm install --save @egym/mwa-utils
```

## API

1. `getPortalsInitialContext` is the same as `getInitialContext` from the standard `@ionic/portals` package, but with support for both v4 and v5 Capacitor versions
2. `portalsPublish` is the same as `publish` from the standard `@ionic/portals` package, but with extra logging with the help of `@egym/mwa-logger`
3. `portalsSubscribe` is the same as `subscribe` from the standard `@ionic/portals` package, but with extra logging with the help of `@egym/mwa-logger`

## EGYM BMA Specific Functionality

### MWA Functions

1. `getMwaInitialContext()` returns the initial context typed as `MwaInitialContext`.

### MWA Commands

The following functions are available to send commands to the BMA:

1. `publishAuthToken()` publishes the `authToken` to the BMA.
1. `publishDismiss()` publishes the `dismiss` command to the BMA.
1. `publishExerciserInfo()` publishes the `exerciserInfo` to the BMA.
1. `publishOpenFeature(startingRoute: string)` publishes the `openFeature` command to the BMA.
   - `startingRoute` is the route to open the feature at.
1. `publishOpenNativeFeature(featureId: string, data?: { [key: string]: string })` publishes the `openNativeFeature` command to the BMA.
   - `featureId` is the id of the feature to open.
   - `data` is an optional object with key-value pairs to pass to the feature.
1. `publishOpenWebView(url: string, endFlowUrlPatterns: string[] = [])` publishes the `openWebView` command to the BMA.
   - `url` is the url to open in the webview.
   - `endFlowUrlPatterns` is an optional array of strings that will be used to close the webview when a url matches any of the patterns.
1. `publishOpenUrlExternally(url: string)` publishes the `openUrlExternally` command to the BMA.
   - `url` is the url to open in the external web view.
1. `publishTrackEvent(eventName: string, feature?: string, parameters?: { [key: string]: string })` publishes the `trackEvent` command to the BMA.
   - `eventName` is the name of the event to track.
   - `feature` is an optional string parameter represents the feature where the event is tracked. If not specified, Firebase Analytics tracking will be used by default. If specified, the event will be tracked using a custom Backend or Segment analytics, depending on whether Segment settings are enabled for the brand.
   - `parameters` is an optional object with key-value pairs to pass to the event.
1. `publishOpenAppSettings()` publishes the `openAppSettings` command to the BMA.
   - This command requests the native app to open the device’s app settings screen, allowing the user to enable permissions such as location access.
1. `publishOnboardingPushPermissionRejected()` publishes `{"topic":"subscription","data":{"type":"onboardingPushPermissionRejected"}}` to the BMA when the user rejects push permission during onboarding.
   - Android handles this event by calling its existing `NotificationConsentRejectTimeUseCase.setLastRejected()` to record the native rejection time. Reminder timing and storage are unchanged.
   - This command takes no arguments, requests no permission, and returns the publisher's promise without waiting for a native acknowledgement.
1. `publishNativeAppStartingRoute(startingRoute: string | null)` publishes the `nativeAppStartingRoute` command to the BMA.
   - This command sets the starting route for the native app that will be used when the native app is freshly launched the next time (e.g. after the app was killed by the OS).
   - If `startingRoute` is `null`, the starting route will be reset to the default starting route.
1. `publishNativeAppSignout()` publishes the `signout` command to the BMA.
   - This command requests the native app to sign out the current user.

### MWA Subscriptions

The following functions are available to subscribe to the BMA messages:

1. `subscribeBack(callback: (result: PortalMessage<void>) => void)` subscribes to the `back` subscription. The BMA will send a `back` message when the user presses the back button for instance.
   - `callback` is a function that will be called when the `back` message is received.
1. `subscribeAuthToken(callback: (result: PortalMessage<string>)` subscribes to the `authToken` subscription. The BMA will send the `authToken` message when the MWA send the command `publishAuthToken()`.
   - `callback` is a function that will be called when the `authToken` message is received.
1. `subscribeExerciserInfo(callback: (result: PortalMessage<MwaExerciserInfo>) => void)` subscribes to the `exerciserInfo` subscription. The BMA will send the `exerciserInfo` message when the MWA send the command `publishExerciserInfo()`.
   - `callback` is a function that will be called when the `exerciserInfo` message is received.

### MWA Flows

The MWA Flows are an abstraction that combines the commands and subscriptions to provide a more user-friendly API.
The following functions that implement the MWA Flows are available:

1. `getAuthTokenFlow()` returns a promise that resolves with the `authToken` sent by the BMA over the `authToken` subscription topic. When this function is invoked, the subscription to the `authToken` is done as part of invocation, and, the `authToken` command is sent to the BMA. When the BMA send the `authToken` message, the promise resolves with the message data and unsubscribes from the `authToken` subscription.
2. `getExerciserInfoFlow()` returns a promise that resolves with the `exerciserInfo` sent by the BMA over the `exerciserInfo` subscription topic. When this function is invoked, the subscription to the `exerciserInfo` is done as part of invocation, and, the `exerciserInfo` command is sent to the BMA. When the BMA App send the `exerciserInfo` message, the promise resolves with the message data and unsubscribes from the `exerciserInfo` subscription.

# Supported peer versions

`@egym/mwa-utils` uses the peer dependencies installed by the consuming MWA:

- `@capacitor/core` 4.1 through 8.x
- `@ionic/portals` 0.9 through 0.13.x
- `@egym/mwa-logger` 0.2.8 through 0.4.x

The peer versions must also satisfy each other's compatibility requirements.
In particular, Ionic Portals 0.13 requires Capacitor 8.

## Legacy Android fallback

`getPortalsInitialContext` temporarily retains a bundled Ionic Portals 0.7.1 /
Capacitor 4.8.1 fallback for DLL's Android integration. The installed
`@ionic/portals` peer is always attempted first; only a thrown error activates
the fallback. No other API uses the vendored implementation.

Removal is blocked until DLL upgrades its Android integration from Capacitor 4.
[BMACG-317](https://egym.atlassian.net/browse/BMACG-317) tracks confirmation
of that rollout, deletion of `src/external-libs-sources`, removal of the
fallback branch, peer-range cleanup, and packed-artifact verification.

# Development

## Setup

Install the dependencies:

```bash
npm ci
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

Run static checks:

```bash
npm run lint
npm run format:check
npm run typecheck
```

Build the module for production:

```bash
npm run build
```

Run every check used by CI and the publish workflows:

```bash
npm run check
```

## Merge queue CI

The required check is **Build**, produced by GitHub Actions (app ID `15368`).
The same job runs for pull requests targeting `main`, pushes to `main`, and
`merge_group` events of type `checks_requested`. It installs the lockfile with
`npm ci`, then runs lint, formatting, typechecking, Vitest with coverage, and the
ESM/CommonJS/declaration build. No additional required check is needed.

Checkout uses the event's default ref/SHA, so queue runs validate the synthetic
commit containing the latest target branch and preceding queued changes, not
just a PR head. There are no path filters, conditional job skips, concurrency
cancellation groups, reusable workflows, secrets, or environment approvals in
this workflow. Each run has a 15-minute timeout and read-only contents
permission. It depends on GitHub-hosted Ubuntu runners, the pinned GitHub
Actions, Node from `.nvmrc`, and npm registry access.

Queue checks do not publish packages: the npm publish workflow accepts only
published releases or manual dispatch, and GitHub Packages publishing accepts
only published releases. A later GitHub release still follows the existing
publish process.

### Rollout and operation

[BMACG-799](https://egym.atlassian.net/browse/BMACG-799) tracks the rollout.
Merge this CI change into `main` before activating the queue through
`egym/github-terraform`. That separate change owns queue settings and must retain
the existing `Build`/`15368` requirement, signatures, review/code-owner policy,
and authorized bypass policy. Keep strict required status checks disabled:
the queue adds combined-change validation without a separate manual
branch-update requirement. This CI change does not activate a queue or enable
PR auto-merge.

The proposed initial Terraform settings are `SQUASH` / `ALLGREEN`, build
concurrency `1`, minimum/maximum merge entries `1` / `1`, minimum-entry wait
`0` minutes, and check-response timeout `60` minutes. These are dormant rollout
values, not active settings. Single-entry groups limit initial diagnostic
ambiguity; larger dependency batches require later tuning and verification.
Activation is a separate reviewed change after CI merges, with authorized
plan/apply and [BMACG-808](https://egym.atlassian.net/browse/BMACG-808) acceptance.

Once the queue is active, obtain the normal reviews and passing PR checks, then
enqueue the PR using GitHub's merge controls. Follow the same process for
Dependabot updates; queued dependency changes are checked together with the
latest target branch and earlier queue entries. If a candidate fails, inspect
the `Build` run on its merge-group SHA, fix the PR, and enqueue it again after
the PR checks pass.

After activation, verify multiple queued PRs (including dependency updates)
produce successful `Build` checks from app `15368` on their merge-group SHAs.
Confirm the tested commits include the latest `main` and earlier queue entries,
and that a deliberately failing required check prevents a test candidate from
merging. Perform that failure drill with a controlled PR; do not merge it.
Local checks and ordinary PR CI alone cannot prove these queue behaviors.

For rollback, disable/remove only the queue rule through `egym/github-terraform`,
retaining the existing CI, signature, review, and bypass policies. Leave the
merge-group trigger in place so pending queue runs can finish and reactivation
remains safe. If the trigger must be reverted, deactivate the queue first;
otherwise new queue commits will wait for a required check that never starts.

## Publishing

Release/publish changes to npm:

```bash
npm run change          # Add a new changeset
npm run change-status   # Inspect pending releases
npm run bump            # Update versions and changelogs
npm run release         # Publish through Changesets with provenance
```

Push the version changes, create a tag, and publish a GitHub release to trigger
the npm and GitHub Packages workflows.

## Toolchain decision

The library is bundled with [tsdown](https://tsdown.dev/) into ESM, CommonJS,
and declaration entry points. Modern.js was removed because its broad
application toolchain accounted for most of the dependency tree of this small
library. tsup was evaluated but rejected because its maintainers state that it
is no longer actively maintained and recommend tsdown as its successor.
