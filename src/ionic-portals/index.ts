import { logDebug } from '@egym/mwa-logger';

import { getInitialContext } from '@ionic/portals';
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
