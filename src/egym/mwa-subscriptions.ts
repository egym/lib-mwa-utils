import { useCallback } from 'react';
import { PortalMessage } from '@ionic/portals';
import { portalsSubscribe } from '..';
import {
  MwaExerciserInfo,
  MwaPortalSubscriptionFn,
  MwaPortalSubscriptionTopics,
} from './types';

export const useMwaPortalSubscriptions = (): MwaPortalSubscriptionFn => {
  const subscribeBack = useCallback(
    (callback: (result: PortalMessage<void>) => void) => {
      return portalsSubscribe(MwaPortalSubscriptionTopics.back, callback);
    },
    [],
  );

  const subscribeAuthToken = useCallback(
    (callback: (result: PortalMessage<string>) => void) => {
      return portalsSubscribe(MwaPortalSubscriptionTopics.authToken, callback);
    },
    [],
  );

  const subscribeExerciserInfo = useCallback(
    (callback: (result: PortalMessage<MwaExerciserInfo>) => void) => {
      return portalsSubscribe(
        MwaPortalSubscriptionTopics.exerciserInfo,
        callback,
      );
    },
    [],
  );

  return { subscribeBack, subscribeAuthToken, subscribeExerciserInfo };
};