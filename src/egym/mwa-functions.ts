import { getPortalsInitialContext } from '../ionic-portals';
import { MwaInitialContext } from './types';

export const getMwaInitialContext = (): MwaInitialContext => {
  return getPortalsInitialContext() as MwaInitialContext;
};
