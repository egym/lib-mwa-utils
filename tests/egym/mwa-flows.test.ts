import { PluginListenerHandle } from '@capacitor/core';
import { renderHook, waitFor } from '@modern-js/plugin-testing/runtime-base';
import { PortalMessage } from '@ionic/portals';
import { useMwaPortalFlows } from '@/egym/mwa-flows';
import { MwaExerciserInfo, MwaPortalSubscriptionTopics } from '@/egym';

jest.mock('@ionic/portals', () => {
  return {
    subscribe: jest.fn(),
    publish: jest.fn(),
  };
});

describe('useMwaPortalFlows test cases', () => {
  beforeEach(() => {
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockReset();
  });

  test('getAuthToken get the token correctly', async () => {
    // Setup
    const authToken = 'this is not a real auth token';
    const pluginListenerHandle: PluginListenerHandle = {
      remove: jest.fn(),
    };
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockImplementation(() => Promise.resolve(pluginListenerHandle));

    const message: PortalMessage<string> = {
      topic: MwaPortalSubscriptionTopics.authToken,
      data: authToken,
    };

    // Act
    const hookResult = renderHook(useMwaPortalFlows);
    const authTokenPromise = hookResult.result.current.getAuthToken();

    const foundInvocation = (subscribe.mock.calls ?? []).find(
      (invocation: any[]) =>
        invocation[0] === MwaPortalSubscriptionTopics.authToken,
    );
    expect(foundInvocation).toHaveLength(2);
    const passedBackCallback = foundInvocation?.[1];

    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);

    // Verify
    await expect(authTokenPromise).resolves.toBe(authToken);
  });

  test('getAuthToken get the token when data is undefined', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: jest.fn(),
    };
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockImplementation(() => Promise.resolve(pluginListenerHandle));

    const message: PortalMessage<string> = {
      topic: MwaPortalSubscriptionTopics.authToken,
    };

    // Act
    const hookResult = renderHook(useMwaPortalFlows);
    const authTokenPromise = hookResult.result.current.getAuthToken();

    const foundInvocation = (subscribe.mock.calls ?? []).find(
      (invocation: any[]) =>
        invocation[0] === MwaPortalSubscriptionTopics.authToken,
    );
    expect(foundInvocation).toHaveLength(2);
    const passedBackCallback = foundInvocation?.[1];

    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);

    // Verify
    await expect(authTokenPromise).rejects.toBe('No data received');
  });

  test('getExerciserInfo get the Exerciser info correctly', async () => {
    // Setup
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
    const pluginListenerHandle: PluginListenerHandle = {
      remove: jest.fn(),
    };
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockImplementation(() => Promise.resolve(pluginListenerHandle));

    const message: PortalMessage<MwaExerciserInfo> = {
      topic: MwaPortalSubscriptionTopics.authToken,
      data: exerciserInfo,
    };

    // Act
    const hookResult = renderHook(useMwaPortalFlows);
    const exerciserInfoPromise = hookResult.result.current.getExerciserInfo();

    const foundInvocation = (subscribe.mock.calls ?? []).find(
      (invocation: any[]) =>
        invocation[0] === MwaPortalSubscriptionTopics.exerciserInfo,
    );
    expect(foundInvocation).toHaveLength(2);
    const passedBackCallback = foundInvocation?.[1];

    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);

    // Verify
    await expect(exerciserInfoPromise).resolves.toBe(exerciserInfo);
  });

  test('getExerciserInfo get the Exerciser info when data is undefined', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: jest.fn(),
    };
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockImplementation(() => Promise.resolve(pluginListenerHandle));

    const message: PortalMessage<MwaExerciserInfo> = {
      topic: MwaPortalSubscriptionTopics.authToken,
    };

    // Act
    const hookResult = renderHook(useMwaPortalFlows);
    const exerciserInfoPromise = hookResult.result.current.getExerciserInfo();

    const foundInvocation = (subscribe.mock.calls ?? []).find(
      (invocation: any[]) =>
        invocation[0] === MwaPortalSubscriptionTopics.exerciserInfo,
    );
    expect(foundInvocation).toHaveLength(2);
    const passedBackCallback = foundInvocation?.[1];

    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);

    // Verify
    await expect(exerciserInfoPromise).rejects.toBe('No data received');
  });

  test('unsubscribe from topics', async () => {
    // Setup
    const pluginListenerHandle: PluginListenerHandle = {
      remove: jest.fn(),
    };
    const pluginListenerHandlePromise = Promise.resolve(pluginListenerHandle);
    const { subscribe } = jest.requireMock('@ionic/portals');
    subscribe.mockImplementation(() => pluginListenerHandlePromise);

    // Act
    const hookResult = renderHook(useMwaPortalFlows);
    hookResult.unmount();

    // Verify
    await waitFor(() => expect(pluginListenerHandle.remove).toBeCalledTimes(2));
  });
});
