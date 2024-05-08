import { renderHook } from '@modern-js/plugin-testing/runtime-base';
import { PortalMessage } from '@ionic/portals';
import { MwaPortalCommandsData } from '@/egym';
import { useMwaPortalCommands } from '@/egym/mwa-commands';

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
    const hookResult = renderHook(useMwaPortalCommands);
    const authTokenResult = await hookResult.result.current.publishAuthToken();

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
    const hookResult = renderHook(useMwaPortalCommands);
    const dismissResult = await hookResult.result.current.publishDismiss();

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
    const hookResult = renderHook(useMwaPortalCommands);
    const exerciserInfoResult =
      await hookResult.result.current.publishExerciserInfo();

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
    const hookResult = renderHook(useMwaPortalCommands);
    const openFeatureResult =
      await hookResult.result.current.publishOpenFeature('/test');

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
    const hookResult = renderHook(useMwaPortalCommands);
    const openNativeFeatureResult =
      await hookResult.result.current.publishOpenNativeFeature(
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
    const hookResult = renderHook(useMwaPortalCommands);
    const openNativeFeatureResult =
      await hookResult.result.current.publishOpenNativeFeature(
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
    const hookResult = renderHook(useMwaPortalCommands);
    const openWebViewResult =
      await hookResult.result.current.publishOpenWebView(
        'https://example.com',
        ['pattern-one', 'pattern-two'],
      );

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
    const hookResult = renderHook(useMwaPortalCommands);
    const openWebViewResult =
      await hookResult.result.current.publishOpenWebView('https://example.com');

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
    const hookResult = renderHook(useMwaPortalCommands);
    const openUrlExternallyResult =
      await hookResult.result.current.publishOpenUrlExternally(
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
    const hookResult = renderHook(useMwaPortalCommands);
    const trackEventResult = await hookResult.result.current.publishTrackEvent(
      'event-name',
      {
        paramA: 'valueA',
        'other-param': 'otherValue',
      },
    );

    // Verify
    expect(trackEventResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });

  test('Publish trackEvent command without parameters', async () => {
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
    const hookResult = renderHook(useMwaPortalCommands);
    const trackEventResult = await hookResult.result.current.publishTrackEvent(
      'event-name',
    );

    // Verify
    expect(trackEventResult).toBeUndefined();
    expect(publish).toBeCalledTimes(1);
    expect(publish.mock.calls[0][0]).toEqual(expectedCommand);
  });
});
