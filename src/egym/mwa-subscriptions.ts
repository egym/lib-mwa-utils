import { PortalMessage } from '@ionic/portals';
import { portalsSubscribe } from '..';
import { MwaExerciserInfo, MwaPortalSubscriptionTopics } from './types';

export const subscribeBack = (
  callback: (result: PortalMessage<void>) => void,
) => {
  return portalsSubscribe(MwaPortalSubscriptionTopics.back, callback);
};

export const subscribeAuthToken = (
  callback: (result: PortalMessage<string>) => void,
) => {
  return portalsSubscribe(MwaPortalSubscriptionTopics.authToken, callback);
};

export const subscribeExerciserInfo = (
  callback: (result: PortalMessage<MwaExerciserInfo>) => void,
) => {
  return portalsSubscribe(MwaPortalSubscriptionTopics.exerciserInfo, callback);
};
