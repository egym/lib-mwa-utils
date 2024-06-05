import { PluginListenerHandle } from '@capacitor/core';
import { PortalMessage } from '@ionic/portals';

export interface MwaInitialContext {
  exerciserUuid?: string;
  gender?: string;
  measurementSystem?: string;
  dateOfBirth?: string;
  authToken?: string;
  language?: string;
  url?: string;
  startingRoute?: string;
  primaryColor?: string;
  primaryTextColor?: string;
  lightPrimaryColor?: string;
}

export interface MwaExerciserInfo {
  email: string;
  firstName: string;
  lastName: string;
  userLocale: string;
  userPicture: string;
  membershipSubType: string;
  membershipStatus: string;
  startOfContract: string;
  endOfContract: string;
  tenantLocale: string;
}

export type MwaPortalMessageTopics = 'subscription';

export type MwaPortalCommands =
  | 'authToken'
  | 'dismiss'
  | 'exerciserInfo'
  | 'openFeature'
  | 'openNativeFeature'
  | 'openWebView'
  | 'openUrlExternally'
  | 'trackEvent';

export type MwaPortalCommandsData<Data = any> = {
  type: MwaPortalCommands;
  data?: Data;
};

export enum MwaPortalSubscriptionTopics {
  back = 'back',
  authToken = 'authToken',
  exerciserInfo = 'exerciserInfo',
}

export type SubscriptionFn<T> = (
  callback: (result: PortalMessage<T>) => void,
) => Promise<PluginListenerHandle>;

export type MwaFlowFn<T> = () => Promise<T>;
