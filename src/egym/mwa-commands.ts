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

export const publishAuthToken = (instanceId?: string) => {
  return publishCommand('subscription', {
    type: 'authToken',
    data: { instanceId },
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

export const publishOpenFeature = (
  startingRoute: string,
  instanceId?: string,
) => {
  return publishCommand('subscription', {
    type: 'openFeature',
    data: {
      startingRoute,
      instanceId,
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
  instanceId?: string,
) => {
  return publishCommand('subscription', {
    type: 'trackEvent',
    data: { name: eventName, parameters, instanceId },
  });
};

export const publishSetWidgetHeight = (height: number, instanceId?: string) => {
  return publishCommand('subscription', {
    type: 'setWidgetHeight',
    data: { height, instanceId },
  });
};

export const publishLinking = (instanceId?: string) => {
  return publishCommand('subscription', {
    type: 'linking',
    data: { instanceId },
  });
};
