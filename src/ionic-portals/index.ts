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
import { getInitialContext as getPortals07InitialContext } from '../external-libs-sources/ionicPortals0.7';

export const getPortalsInitialContext = <T>() => {
  try {
    const result = getInitialContext<T>();
    logDebug('Use latest portals');

    return result;
  } catch {
    try {
      const result = getPortals07InitialContext<T>();
      logDebug('Use v0.7.1 portals');
      return result;
    } catch (e) {
      logDebug('getPortalsInitialContext --- failed', e);
      throw e;
      return undefined;
    }
  }
};

export const portalsPublish: typeof publish = async message => {
  logPortalsRequest(`${message.topic} ${message.data.type}`, message.data);

  await publish(message);
};

export const portalsSubscribe = async <T>(
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
