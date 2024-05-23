import { useCallback, useEffect, useRef } from 'react';
import { PortalMessage } from '@ionic/portals';
import { useMwaPortalSubscriptions } from './mwa-subscriptions';
import { MwaPortalFlowsFn, SubscriptionFn } from './types';
import { useMwaPortalCommands } from './mwa-commands';

const useMwaPortalFlow = <T>(
  triggerFn: () => Promise<void>,
  subscriptionFn: SubscriptionFn<T>,
): (() => Promise<T>) => {
  const promiseResolve = useRef<(value: T | PromiseLike<T>) => void>();
  const promiseReject = useRef<(reason?: any) => void>();
  const currentPromise = useRef<Promise<T>>();

  const getFn = useCallback(() => {
    if (!currentPromise.current) {
      currentPromise.current = new Promise<T>((resolve, reject) => {
        promiseResolve.current = resolve;
        promiseReject.current = reject;
      });
    }
    triggerFn();
    return currentPromise.current;
  }, []);

  const subscriptionHandler = useCallback((message: PortalMessage<T>) => {
    if (promiseResolve.current && promiseReject.current) {
      if (message.data) {
        promiseResolve.current(message.data);
      } else {
        promiseReject.current('No data received');
      }
      promiseResolve.current = undefined;
      promiseReject.current = undefined;
    }
    currentPromise.current = undefined;
  }, []);

  useEffect(() => {
    const listenerHandler = subscriptionFn(subscriptionHandler);

    return () => {
      listenerHandler.then(listener => listener.remove());
    };
  }, [subscriptionHandler, subscriptionFn, name]);

  return getFn;
};

export const useMwaPortalFlows = (): MwaPortalFlowsFn => {
  const { subscribeAuthToken, subscribeExerciserInfo } =
    useMwaPortalSubscriptions();
  const { publishAuthToken, publishExerciserInfo } = useMwaPortalCommands();

  const getAuthToken = useMwaPortalFlow(publishAuthToken, subscribeAuthToken);
  const getExerciserInfo = useMwaPortalFlow(
    publishExerciserInfo,
    subscribeExerciserInfo,
  );
  return { getAuthToken, getExerciserInfo };
};
