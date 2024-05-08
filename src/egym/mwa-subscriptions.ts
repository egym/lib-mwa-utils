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
    (
      topic: MwaPortalSubscriptionTopics,
      callback: (result: PortalMessage<void>) => void,
    ) => {
      return portalsSubscribe(topic, callback);
    },
    [],
  );

  const subscribeAuthToken = useCallback(
    (
      topic: MwaPortalSubscriptionTopics,
      callback: (result: PortalMessage<string>) => void,
    ) => {
      return portalsSubscribe(topic, callback);
    },
    [],
  );

  const subscribeExerciserInfo = useCallback(
    (
      topic: MwaPortalSubscriptionTopics,
      callback: (result: PortalMessage<MwaExerciserInfo>) => void,
    ) => {
      return portalsSubscribe(topic, callback);
    },
    [],
  );

  return { subscribeBack, subscribeAuthToken, subscribeExerciserInfo };
};
