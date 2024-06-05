import { PortalMessage } from '@ionic/portals';
import { PluginListenerHandle } from '@capacitor/core';
import {
  subscribeAuthToken,
  subscribeExerciserInfo,
} from './mwa-subscriptions';
import { MwaExerciserInfo, MwaFlowFn, SubscriptionFn } from './types';
import { publishAuthToken, publishExerciserInfo } from './mwa-commands';

const buildMwaFlow = <T>(
  commandFn: () => Promise<void>,
  subscriptionFn: SubscriptionFn<T>,
): MwaFlowFn<T> => {
  let promiseResolve: ((value: T | PromiseLike<T>) => void) | undefined;
  let promiseReject: ((reason?: any) => void) | undefined;
  let currentPromise: Promise<T> | undefined;
  let listenerHandler: Promise<PluginListenerHandle> | undefined;

  const unsubscribe = async () => {
    if (listenerHandler) {
      const listener = await listenerHandler;
      await listener.remove();
      listenerHandler = undefined;
    }
  };

  const subscriptionHandler = (message: PortalMessage<T>) => {
    if (promiseResolve && promiseReject) {
      if (message.data) {
        promiseResolve(message.data);
      } else {
        promiseReject('No data received');
      }
      promiseResolve = undefined;
      promiseReject = undefined;
    }
    currentPromise = undefined;
    unsubscribe();
  };

  const getFn = () => {
    if (!listenerHandler) {
      listenerHandler = subscriptionFn(subscriptionHandler);
    }
    if (!currentPromise) {
      currentPromise = new Promise<T>((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
      });
    }
    commandFn();
    return currentPromise;
  };

  return getFn;
};

let authTokenFlow: MwaFlowFn<string>;

export const getAuthTokenFlow = (): Promise<string> => {
  if (!authTokenFlow) {
    authTokenFlow = buildMwaFlow(publishAuthToken, subscribeAuthToken);
  }
  return authTokenFlow();
};

let exerciserInfoFlow: MwaFlowFn<MwaExerciserInfo>;

export const getExerciserInfoFlow = (): Promise<MwaExerciserInfo> => {
  if (!exerciserInfoFlow) {
    exerciserInfoFlow = buildMwaFlow(
      publishExerciserInfo,
      subscribeExerciserInfo,
    );
  }
  return exerciserInfoFlow();
};
