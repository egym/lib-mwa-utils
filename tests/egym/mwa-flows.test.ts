import { PluginListenerHandle } from '@capacitor/core';
import { PortalMessage } from '@ionic/portals';
import {
  MwaExerciserInfo,
  MwaPortalSubscriptionTopics,
  getAuthTokenFlow,
  getExerciserInfoFlow,
} from '@/egym';

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

    // Act - when invoked multiple times, it should always return the same promise until it gets resolved
    const authTokenPromise1 = getAuthTokenFlow();
    const authTokenPromise2 = getAuthTokenFlow();
    const authTokenPromise3 = getAuthTokenFlow();

    const foundInvocation = (subscribe.mock.calls ?? []).find(
      (invocation: any[]) =>
        invocation[0] === MwaPortalSubscriptionTopics.authToken,
    );
    expect(foundInvocation).toHaveLength(2);
    const passedBackCallback = foundInvocation?.[1];

    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);

    // Verify
    await expect(authTokenPromise1).resolves.toBe(authToken);
    await expect(authTokenPromise2).resolves.toBe(authToken);
    await expect(authTokenPromise3).resolves.toBe(authToken);
    expect(pluginListenerHandle.remove).toBeCalledTimes(1);
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
    const authTokenPromise = getAuthTokenFlow();

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
    expect(pluginListenerHandle.remove).toBeCalledTimes(1);
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

    // Act - when invoked multiple times, it should always return the same promise until it gets resolved
    const exerciserInfoPromise1 = getExerciserInfoFlow();
    const exerciserInfoPromise2 = getExerciserInfoFlow();
    const exerciserInfoPromise3 = getExerciserInfoFlow();

    const foundInvocation = (subscribe.mock.calls ?? []).find(
      (invocation: any[]) =>
        invocation[0] === MwaPortalSubscriptionTopics.exerciserInfo,
    );
    expect(foundInvocation).toHaveLength(2);
    const passedBackCallback = foundInvocation?.[1];

    expect(typeof passedBackCallback).toBe('function');
    passedBackCallback(message);

    // Verify
    await expect(exerciserInfoPromise1).resolves.toBe(exerciserInfo);
    await expect(exerciserInfoPromise2).resolves.toBe(exerciserInfo);
    await expect(exerciserInfoPromise3).resolves.toBe(exerciserInfo);
    expect(pluginListenerHandle.remove).toBeCalledTimes(1);
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
    const exerciserInfoPromise = getExerciserInfoFlow();

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
    expect(pluginListenerHandle.remove).toBeCalledTimes(1);
  });
});
