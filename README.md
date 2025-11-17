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
    * `startingRoute` is the route to open the feature at.
1. `publishOpenNativeFeature(featureId: string, data?: { [key: string]: string })` publishes the `openNativeFeature` command to the BMA.
    * `featureId` is the id of the feature to open.
    * `data` is an optional object with key-value pairs to pass to the feature.
1. `publishOpenWebView(url: string, endFlowUrlPatterns: string[] = [])` publishes the `openWebView` command to the BMA.
    * `url` is the url to open in the webview.
    * `endFlowUrlPatterns` is an optional array of strings that will be used to close the webview when a url matches any of the patterns.
1. `publishOpenUrlExternally(url: string)` publishes the `openUrlExternally` command to the BMA.
    * `url` is the url to open in the external web view.
1. `publishTrackEvent(eventName: string, feature?: string, parameters?: { [key: string]: string })` publishes the `trackEvent` command to the BMA.
    * `eventName` is the name of the event to track.
    * `feature` is an optional string parameter represents the feature where the event is tracked. If not specified, Firebase Analytics tracking will be used by default. If specified, the event will be tracked using a custom Backend or Segment analytics, depending on whether Segment settings are enabled for the brand.
    * `parameters` is an optional object with key-value pairs to pass to the event.
1. `publishOpenAppSettings()` publishes the `openAppSettings` command to the BMA.
    * This command requests the native app to open the device’s app settings screen, allowing the user to enable permissions such as location access.

### MWA Subscriptions
The following functions are available to subscribe to the BMA messages:
1. `subscribeBack(callback: (result: PortalMessage<void>) => void)` subscribes to the `back` subscription. The BMA will send a `back` message when the user presses the back button for instance.
    * `callback` is a function that will be called when the `back` message is received.
1. `subscribeAuthToken(callback: (result: PortalMessage<string>)` subscribes to the `authToken` subscription. The BMA will send the `authToken` message when the MWA send the command `publishAuthToken()`.
    * `callback` is a function that will be called when the `authToken` message is received.
1. `subscribeExerciserInfo(callback: (result: PortalMessage<MwaExerciserInfo>) => void)` subscribes to the `exerciserInfo` subscription. The BMA will send the `exerciserInfo` message when the MWA send the command `publishExerciserInfo()`.
    * `callback` is a function that will be called when the `exerciserInfo` message is received.

### MWA Flows
The MWA Flows are an abstraction that combines the commands and subscriptions to provide a more user-friendly API.
The following functions that implement the MWA Flows are available:
1. `getAuthTokenFlow()` returns a promise that resolves with the `authToken` sent by the BMA over the `authToken` subscription topic. When this function is invoked, the subscription to the `authToken` is done as part of invocation, and, the `authToken` command is sent to the BMA. When the BMA send the `authToken` message, the promise resolves with the message data and unsubscribes from the `authToken` subscription.
2. `getExerciserInfoFlow()` returns a promise that resolves with the `exerciserInfo` sent by the BMA over the `exerciserInfo` subscription topic. When this function is invoked, the subscription to the `exerciserInfo` is done as part of invocation, and, the `exerciserInfo` command is sent to the BMA. When the BMA App send the `exerciserInfo` message, the promise resolves with the message data and unsubscribes from the `exerciserInfo` subscription.

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

Release/publish changes to npm:

```bash
npm run lint         # Lint and fix source files
npm run change       # Add a new changeset
npm run bump         # Update version and changelog via changeset
```
Push changes to the branch, create tag and draft release 

For more information, see the [Modern.js Module documentation](https://modernjs.dev/module-tools/en).
