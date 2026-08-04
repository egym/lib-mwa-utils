import { PortalMessage, publish as portalsPublish } from '@ionic/portals';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  MwaPortalCommandsData,
  publishAuthToken,
  publishDismiss,
  publishExerciserInfo,
  publishOpenFeature,
  publishOpenNativeFeature,
  publishOpenUrlExternally,
  publishOpenWebView,
  publishTrackEvent,
  publishOpenAppSettings,
} from '@/egym';
import {
  publishLinking,
  publishSetWidgetHeight,
  publishContentLoadingDidFinish,
  publishNativeAppStartingRoute,
} from '@/egym/mwa-commands';

vi.mock('@ionic/portals', () => {
  return {
    publish: vi.fn(),
  };
});

const publish = vi.mocked(portalsPublish);

describe('useMwaPortalCommands test cases', () => {
  beforeEach(() => {
    publish.mockReset();
  });

  test('Publish authToken command', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'authToken',
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const authTokenResult = await publishAuthToken();

    // Verify
    expect(authTokenResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish dismiss command', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'dismiss',
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const dismissResult = await publishDismiss();

    // Verify
    expect(dismissResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish exerciserInfo command', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'exerciserInfo',
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const exerciserInfoResult = await publishExerciserInfo();

    // Verify
    expect(exerciserInfoResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish openFeature command', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'openFeature',
        data: {
          startingRoute: '/test',
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openFeatureResult = await publishOpenFeature('/test');

    // Verify
    expect(openFeatureResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish openNativeFeature command with data', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'openNativeFeature',
        data: {
          featureId: 'native-feature',
          data: { fieldA: 'value of A' },
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openNativeFeatureResult = await publishOpenNativeFeature(
      'native-feature',
      { fieldA: 'value of A' },
    );

    // Verify
    expect(openNativeFeatureResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish openNativeFeature command without data', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'openNativeFeature',
        data: {
          featureId: 'native-feature',
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openNativeFeatureResult =
      await publishOpenNativeFeature('native-feature');

    // Verify
    expect(openNativeFeatureResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish openWebView command with endFlowUrlPatterns', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'openWebView',
        data: {
          url: 'https://example.com',
          endFlowUrlPatterns: ['pattern-one', 'pattern-two'],
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openWebViewResult = await publishOpenWebView('https://example.com', [
      'pattern-one',
      'pattern-two',
    ]);

    // Verify
    expect(openWebViewResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish openWebView command without endFlowUrlPatterns', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'openWebView',
        data: {
          url: 'https://example.com',
          endFlowUrlPatterns: [],
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openWebViewResult = await publishOpenWebView('https://example.com');

    // Verify
    expect(openWebViewResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish openUrlExternally command', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'openUrlExternally',
        data: {
          url: 'https://example.com',
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openUrlExternallyResult = await publishOpenUrlExternally(
      'https://example.com',
    );

    // Verify
    expect(openUrlExternallyResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish trackEvent command with parameters', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'trackEvent',
        data: {
          name: 'event-name',
          feature: 'feature',
          parameters: {
            paramA: 'valueA',
            'other-param': 'otherValue',
          },
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const trackEventResult = await publishTrackEvent('event-name', 'feature', {
      paramA: 'valueA',
      'other-param': 'otherValue',
    });

    // Verify
    expect(trackEventResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish trackEvent command without feature', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'trackEvent',
        data: {
          name: 'event-name',
          parameters: {
            paramA: 'valueA',
            'other-param': 'otherValue',
          },
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const trackEventResult = await publishTrackEvent('event-name', undefined, {
      paramA: 'valueA',
      'other-param': 'otherValue',
    });

    // Verify
    expect(trackEventResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish trackEvent command without feature and parameters', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'trackEvent',
        data: {
          name: 'event-name',
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const trackEventResult = await publishTrackEvent('event-name');

    // Verify
    expect(trackEventResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish setWidgetHeight command', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'setWidgetHeight',
        data: {
          height: 444,
        },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const setWidgetHeightResult = await publishSetWidgetHeight(444);

    // Verify
    expect(setWidgetHeightResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish contentLoadingDidFinish command', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'contentLoadingDidFinish',
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const setWidgetHeightResult = await publishContentLoadingDidFinish();

    // Verify
    expect(setWidgetHeightResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish linking command', async () => {
    // Setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'linking',
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const linkingResult = await publishLinking();

    // Verify
    expect(linkingResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish openAppSettings command', async () => {
    // setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'openAppSettings',
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openAppSettingsResult = await publishOpenAppSettings();

    // Verify
    expect(openAppSettingsResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish setNativeAppStartingRoute command with startingRoute', async () => {
    // setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'setNativeAppStartingRoute',
        data: { startingRoute: '/test' },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const nativeAppStartingRouteResult =
      await publishNativeAppStartingRoute('/test');

    // Verify
    expect(nativeAppStartingRouteResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish setNativeAppStartingRoute command with null startingRoute', async () => {
    // setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'setNativeAppStartingRoute',
        data: { startingRoute: null },
      },
    };
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const nativeAppStartingRouteResult =
      await publishNativeAppStartingRoute(null);

    // Verify
    expect(nativeAppStartingRouteResult).toBeUndefined();
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });
});
