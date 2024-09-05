import { PortalMessage } from '@ionic/portals';
import { MwaLinking, portalsSubscribe } from '..';
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

export const subscribeLinking = (
  callback: (result: PortalMessage<MwaLinking>) => void,
) => {
  return portalsSubscribe(MwaPortalSubscriptionTopics.linking, callback);
};

export const subscribeRefresh = (
  callback: (result: PortalMessage<void>) => void,
) => {
  return portalsSubscribe(MwaPortalSubscriptionTopics.refresh, callback);
};
