import { portalsPublish } from '..';
import { MwaPortalCommandsData, MwaPortalMessageTopics } from './types';

const publishCommand = (
  topic: MwaPortalMessageTopics,
  data: MwaPortalCommandsData,
) => {
  return portalsPublish({
    topic,
    data,
  });
};

export const publishAuthToken = () => {
  return publishCommand('subscription', {
    type: 'authToken',
  });
};

export const publishDismiss = () => {
  return publishCommand('subscription', {
    type: 'dismiss',
  });
};

export const publishExerciserInfo = () => {
  return publishCommand('subscription', {
    type: 'exerciserInfo',
  });
};

export const publishOpenFeature = (startingRoute: string) => {
  return publishCommand('subscription', {
    type: 'openFeature',
    data: {
      startingRoute,
    },
  });
};

export const publishOpenNativeFeature = (
  featureId: string,
  data?: { [key: string]: string },
) => {
  return publishCommand('subscription', {
    type: 'openNativeFeature',
    data: {
      featureId,
      data,
    },
  });
};

export const publishOpenWebView = (
  url: string,
  endFlowUrlPatterns: string[] = [],
) => {
  return publishCommand('subscription', {
    type: 'openWebView',
    data: { url, endFlowUrlPatterns },
  });
};

export const publishOpenUrlExternally = (url: string) => {
  return publishCommand('subscription', {
    type: 'openUrlExternally',
    data: { url },
  });
};

export const publishTrackEvent = (
  eventName: string,
  parameters?: { [key: string]: string },
) => {
  return publishCommand('subscription', {
    type: 'trackEvent',
    data: { name: eventName, parameters },
  });
};
