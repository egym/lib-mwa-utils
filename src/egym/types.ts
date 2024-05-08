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

export type MwaPortalSubscriptionTopics = '';

export type MwaPortalSubscriptionFn = {
  subscribeBack: (
    topic: MwaPortalSubscriptionTopics,
    callback: (result: PortalMessage<void>) => void,
  ) => Promise<PluginListenerHandle>;
  subscribeAuthToken: (
    topic: MwaPortalSubscriptionTopics,
    callback: (result: PortalMessage<string>) => void,
  ) => Promise<PluginListenerHandle>;
  subscribeExerciserInfo: (
    topic: MwaPortalSubscriptionTopics,
    callback: (result: PortalMessage<MwaExerciserInfo>) => void,
  ) => Promise<PluginListenerHandle>;
};
