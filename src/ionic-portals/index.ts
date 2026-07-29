import {
  logDebug,
  logPortalsRequest,
  logPortalsResponse,
} from '@egym/mwa-logger';
import {
  getInitialContext,
  PortalMessage,
  publish,
  subscribe,
} from '@ionic/portals';
import { PluginListenerHandle } from '@capacitor/core';

export const getPortalsInitialContext = <T>() => {
  try {
    const result = getInitialContext<T>();
    logDebug('Use installed portals');

    return result;
  } catch (error) {
    logDebug('getPortalsInitialContext --- failed', error);
    throw error;
  }
};

export const portalsPublish: typeof publish = message => {
  logPortalsRequest(`${message.topic} ${message.data.type}`, message.data);

  return publish(message);
};

export const portalsSubscribe = <T>(
  topic: string,
  callback: (result: PortalMessage<T>) => void,
): Promise<PluginListenerHandle> => {
  return subscribe<T>(topic, (...args) => {
    logPortalsResponse(topic, {
      ...args,
    });
    callback(...args);
  });
};
