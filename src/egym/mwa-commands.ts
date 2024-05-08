import { useCallback } from 'react';
import { portalsPublish } from '..';
import {
  MwaPortalCommandsData,
  MwaPortalCommandsFn,
  MwaPortalMessageTopics,
} from './types';

export const useMwaPortalCommands = (): MwaPortalCommandsFn => {
  const publishCommand = useCallback(
    (topic: MwaPortalMessageTopics, data: MwaPortalCommandsData) => {
      return portalsPublish({
        topic,
        data,
      });
    },
    [],
  );

  const publishAuthToken = useCallback(() => {
    return publishCommand('subscription', {
      type: 'authToken',
    });
  }, [publishCommand]);

  const publishDismiss = useCallback(() => {
    return publishCommand('subscription', {
      type: 'dismiss',
    });
  }, [publishCommand]);

  const publishExerciserInfo = useCallback(() => {
    return publishCommand('subscription', {
      type: 'exerciserInfo',
    });
  }, [publishCommand]);

  const publishOpenFeature = useCallback(
    (startingRoute: string) => {
      return publishCommand('subscription', {
        type: 'openFeature',
        data: {
          startingRoute,
        },
      });
    },
    [publishCommand],
  );

  const publishOpenNativeFeature = useCallback(
    (featureId: string, data?: { [key: string]: string }) => {
      return publishCommand('subscription', {
        type: 'openNativeFeature',
        data: {
          featureId,
          data,
        },
      });
    },
    [publishCommand],
  );

  const publishOpenWebView = useCallback(
    (url: string, endFlowUrlPatterns: string[] = []) => {
      return publishCommand('subscription', {
        type: 'openWebView',
        data: { url, endFlowUrlPatterns },
      });
    },
    [publishCommand],
  );

  const publishOpenUrlExternally = useCallback(
    (url: string) => {
      return publishCommand('subscription', {
        type: 'openUrlExternally',
        data: { url },
      });
    },
    [publishCommand],
  );

  const publishTrackEvent = useCallback(
    (eventName: string, parameters?: { [key: string]: string }) => {
      return publishCommand('subscription', {
        type: 'trackEvent',
        data: { name: eventName, parameters },
      });
    },
    [publishCommand],
  );

  return {
    publishAuthToken,
    publishDismiss,
    publishExerciserInfo,
    publishOpenFeature,
    publishOpenNativeFeature,
    publishOpenWebView,
    publishOpenUrlExternally,
    publishTrackEvent,
  };
};
