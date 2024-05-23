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

export type MwaPortalCommandsFn = {
  publishAuthToken: () => Promise<void>;
  publishDismiss: () => Promise<void>;
  publishExerciserInfo: () => Promise<void>;
  publishOpenFeature: (startingRoute: string) => Promise<void>;
  publishOpenNativeFeature: (
    featureId: string,
    data?: { [key: string]: string },
  ) => Promise<void>;
  publishOpenWebView: (
    url: string,
    endFlowUrlPatterns?: string[],
  ) => Promise<void>;
  publishOpenUrlExternally: (url: string) => Promise<void>;
  publishTrackEvent: (
    eventName: string,
    parameters?: { [key: string]: string },
  ) => Promise<void>;
};

export enum MwaPortalSubscriptionTopics {
  back = 'back',
  authToken = 'authToken',
  exerciserInfo = 'exerciserInfo',
}

export type SubscriptionFn<T> = (
  callback: (result: PortalMessage<T>) => void,
) => Promise<PluginListenerHandle>;

export type MwaPortalSubscriptionFn = {
  subscribeBack: SubscriptionFn<void>;
  subscribeAuthToken: SubscriptionFn<string>;
  subscribeExerciserInfo: SubscriptionFn<MwaExerciserInfo>;
};

export type MwaPortalFlowsFn = {
  getAuthToken: () => Promise<string>;
  getExerciserInfo: () => Promise<MwaExerciserInfo>;
};
