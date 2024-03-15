import { getInitialContext } from '@ionic/portals';
import { getInitialContext as getPortals07InitialContext } from '../external-compiled-libs/ionicPortals0.7';

export const getPortalsInitialContext = <T>() => {
  try {
    return getInitialContext<T>()?.value;
  } catch {
    try {
      return getPortals07InitialContext<T>()?.value;
    } catch (e) {
      throw e;
      return undefined;
    }
  }
};
