/* eslint-disable max-lines */
import { PortalMessage } from '@ionic/portals';
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

jest.mock('@ionic/portals', () => {
  return {
    publish: jest.fn(),
  };
});

describe('useMwaPortalCommands test cases', () => {
  beforeEach(() => {
    const { publish } = jest.requireMock('@ionic/portals');
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const authTokenResult = await publishAuthToken();

    // Verify
    expect(authTokenResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const dismissResult = await publishDismiss();

    // Verify
    expect(dismissResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const exerciserInfoResult = await publishExerciserInfo();

    // Verify
    expect(exerciserInfoResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openFeatureResult = await publishOpenFeature('/test');

    // Verify
    expect(openFeatureResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openNativeFeatureResult = await publishOpenNativeFeature(
      'native-feature',
      { fieldA: 'value of A' },
    );

    // Verify
    expect(openNativeFeatureResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openNativeFeatureResult = await publishOpenNativeFeature(
      'native-feature',
    );

    // Verify
    expect(openNativeFeatureResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openWebViewResult = await publishOpenWebView('https://example.com', [
      'pattern-one',
      'pattern-two',
    ]);

    // Verify
    expect(openWebViewResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openWebViewResult = await publishOpenWebView('https://example.com');

    // Verify
    expect(openWebViewResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openUrlExternallyResult = await publishOpenUrlExternally(
      'https://example.com',
    );

    // Verify
    expect(openUrlExternallyResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const trackEventResult = await publishTrackEvent('event-name', 'feature', {
      paramA: 'valueA',
      'other-param': 'otherValue',
    });

    // Verify
    expect(trackEventResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const trackEventResult = await publishTrackEvent('event-name', undefined, {
      paramA: 'valueA',
      'other-param': 'otherValue',
    });

    // Verify
    expect(trackEventResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const trackEventResult = await publishTrackEvent('event-name');

    // Verify
    expect(trackEventResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const setWidgetHeightResult = await publishSetWidgetHeight(444);

    // Verify
    expect(setWidgetHeightResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const setWidgetHeightResult = await publishContentLoadingDidFinish();

    // Verify
    expect(setWidgetHeightResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const linkingResult = await publishLinking();

    // Verify
    expect(linkingResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
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
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const openAppSettingsResult = await publishOpenAppSettings();

    // Verify
    expect(openAppSettingsResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish nativeAppStartingRoute command with startingRoute', async () => {
    // setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'nativeAppStartingRoute',
        data: { startingRoute: '/test' },
      },
    };
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const nativeAppStartingRouteResult = await publishNativeAppStartingRoute(
      '/test',
    );

    // Verify
    expect(nativeAppStartingRouteResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish nativeAppStartingRoute command with null startingRoute', async () => {
    // setup
    const expectedCommand: PortalMessage<MwaPortalCommandsData> = {
      topic: 'subscription',
      data: {
        type: 'nativeAppStartingRoute',
        data: { startingRoute: null },
      },
    };
    const { publish } = jest.requireMock('@ionic/portals');
    publish.mockImplementationOnce(() => Promise.resolve());

    // Act
    const nativeAppStartingRouteResult = await publishNativeAppStartingRoute(
      null,
    );

    // Verify
    expect(nativeAppStartingRouteResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });
});
