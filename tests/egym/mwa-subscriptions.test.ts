import { PluginListenerHandle } from '@capacitor/core';
import { renderHook } from '@modern-js/plugin-testing/runtime-base';
import { PortalMessage } from '@ionic/portals';
import { useMwaPortalSubscriptions } from '@/egym/mwa-subscriptions';
import { MwaExerciserInfo, MwaPortalSubscriptionTopics } from '@/egym';

jest.mock('@ionic/portals', () => {
  return {
    subscribe: jest.fn(),
  };
});

describe('useMwaPortalSubscriptions test cases', () => {
  beforeEach(() => {
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockReset();
  });

  test('subscribeBack registers correctly', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: jest.fn(),
    };
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockImplementationOnce(() =>
      Promise.resolve(pluginListenerHandle),
    );

    const callback = jest.fn();

    const message: PortalMessage<void> = {
      topic: MwaPortalSubscriptionTopics.back,
      data: undefined,
    };

    // Act
    const hookResult = renderHook(useMwaPortalSubscriptions);
    const subscribeReturn = await hookResult.result.current.subscribeBack(
      callback,
    );

    // Verify
    expect(subscribe).toBeCalledTimes(1);
    expect(subscribeReturn).toEqual(pluginListenerHandle);

    expect(subscribe.mock.calls[0][0]).toEqual(
      MwaPortalSubscriptionTopics.back,
    );

    const passedBackCallback = subscribe.mock.calls[0][1];
    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(message);
  });

  test('subscribeAuthToken registers correctly', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: jest.fn(),
    };
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockImplementationOnce(() =>
      Promise.resolve(pluginListenerHandle),
    );

    const callback = jest.fn();
    const authToken = 'auth-token';

    const message: PortalMessage<string> = {
      topic: MwaPortalSubscriptionTopics.authToken,
      data: authToken,
    };

    // Act
    const hookResult = renderHook(useMwaPortalSubscriptions);
    const subscribeReturn = await hookResult.result.current.subscribeAuthToken(
      callback,
    );

    // Verify
    expect(subscribe).toBeCalledTimes(1);
    expect(subscribeReturn).toEqual(pluginListenerHandle);

    expect(subscribe.mock.calls[0][0]).toEqual(
      MwaPortalSubscriptionTopics.authToken,
    );

    const passedBackCallback = subscribe.mock.calls[0][1];
    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(message);
  });

  test('subscribeExerciserInfo registers correctly', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: jest.fn(),
    };
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockImplementationOnce(() =>
      Promise.resolve(pluginListenerHandle),
    );

    const callback = jest.fn();
    const exerciserInfo: MwaExerciserInfo = {
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      userLocale: 'en',
      userPicture: 'https://example.com/user.jpg',
      membershipSubType: 'premium',
      membershipStatus: 'active',
      startOfContract: '2021-01-01',
      endOfContract: '2022-01-01',
      tenantLocale: 'en',
    };

    const message: PortalMessage<MwaExerciserInfo> = {
      topic: MwaPortalSubscriptionTopics.exerciserInfo,
      data: exerciserInfo,
    };

    // Act
    const hookResult = renderHook(useMwaPortalSubscriptions);
    const subscribeReturn =
      await hookResult.result.current.subscribeExerciserInfo(callback);

    // Verify
    expect(subscribe).toBeCalledTimes(1);
    expect(subscribeReturn).toEqual(pluginListenerHandle);

    expect(subscribe.mock.calls[0][0]).toEqual(
      MwaPortalSubscriptionTopics.exerciserInfo,
    );

    const passedBackCallback = subscribe.mock.calls[0][1];
    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(message);
  });
});
