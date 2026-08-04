import { PluginListenerHandle } from '@capacitor/core';
import { PortalMessage, subscribe as portalsSubscribe } from '@ionic/portals';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  MwaExerciserInfo,
  MwaPortalSubscriptionTopics,
  subscribeAuthToken,
  subscribeBack,
  subscribeExerciserInfo,
} from '@/egym';
import { subscribeLinking, subscribeRefresh } from '@/egym/mwa-subscriptions';

vi.mock('@ionic/portals', () => {
  return {
    subscribe: vi.fn(),
  };
});

const subscribe = vi.mocked(portalsSubscribe);

describe('useMwaPortalSubscriptions test cases', () => {
  beforeEach(() => {
    subscribe.mockReset();
  });

  test('subscribeBack registers correctly', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: vi.fn(),
    };
    subscribe.mockImplementationOnce(() =>
      Promise.resolve(pluginListenerHandle),
    );

    const callback = vi.fn();

    const message: PortalMessage<void> = {
      topic: MwaPortalSubscriptionTopics.back,
      data: undefined,
    };

    // Act
    const subscribeReturn = await subscribeBack(callback);

    // Verify
    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(subscribeReturn).toEqual(pluginListenerHandle);

    expect(subscribe.mock.calls[0][0]).toEqual(
      MwaPortalSubscriptionTopics.back,
    );

    const passedBackCallback = subscribe.mock.calls[0][1];
    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(message);
  });

  test('subscribeAuthToken registers correctly', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: vi.fn(),
    };
    subscribe.mockImplementationOnce(() =>
      Promise.resolve(pluginListenerHandle),
    );

    const callback = vi.fn();
    const authToken = 'auth-token';

    const message: PortalMessage<string> = {
      topic: MwaPortalSubscriptionTopics.authToken,
      data: authToken,
    };

    // Act
    const subscribeReturn = await subscribeAuthToken(callback);

    // Verify
    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(subscribeReturn).toEqual(pluginListenerHandle);

    expect(subscribe.mock.calls[0][0]).toEqual(
      MwaPortalSubscriptionTopics.authToken,
    );

    const passedBackCallback = subscribe.mock.calls[0][1];
    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(message);
  });

  test('subscribeExerciserInfo registers correctly', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: vi.fn(),
    };
    subscribe.mockImplementationOnce(() =>
      Promise.resolve(pluginListenerHandle),
    );

    const callback = vi.fn();
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

    const subscribeReturn = await subscribeExerciserInfo(callback);

    // Verify
    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(subscribeReturn).toEqual(pluginListenerHandle);

    expect(subscribe.mock.calls[0][0]).toEqual(
      MwaPortalSubscriptionTopics.exerciserInfo,
    );

    const passedBackCallback = subscribe.mock.calls[0][1];
    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(message);
  });

  test('subscribeLinking registers correctly', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: vi.fn(),
    };
    subscribe.mockImplementationOnce(() =>
      Promise.resolve(pluginListenerHandle),
    );

    const callback = vi.fn();

    const message: PortalMessage<void> = {
      topic: MwaPortalSubscriptionTopics.linking,
      data: undefined,
    };

    // Act
    const subscribeReturn = await subscribeLinking(callback);

    // Verify
    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(subscribeReturn).toEqual(pluginListenerHandle);

    expect(subscribe.mock.calls[0][0]).toEqual(
      MwaPortalSubscriptionTopics.linking,
    );

    const passedBackCallback = subscribe.mock.calls[0][1];
    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(message);
  });

  test('subscribeRefresh registers correctly', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: vi.fn(),
    };
    subscribe.mockImplementationOnce(() =>
      Promise.resolve(pluginListenerHandle),
    );

    const callback = vi.fn();

    const message: PortalMessage<void> = {
      topic: MwaPortalSubscriptionTopics.refresh,
      data: undefined,
    };

    // Act
    const subscribeReturn = await subscribeRefresh(callback);

    // Verify
    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(subscribeReturn).toEqual(pluginListenerHandle);

    expect(subscribe.mock.calls[0][0]).toEqual('refresh');

    const passedBackCallback = subscribe.mock.calls[0][1];
    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(message);
  });
});
