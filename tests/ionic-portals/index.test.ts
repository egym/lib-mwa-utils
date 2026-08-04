import { logDebug } from '@egym/mwa-logger';
import {
  getInitialContext as portalsGetInitialContext,
  InitialContext,
} from '@ionic/portals';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getInitialContext as portals07GetInitialContext } from '@/external-libs-sources/ionicPortals0.7';
import { getPortalsInitialContext } from '@/ionic-portals';

vi.mock('@egym/mwa-logger', () => ({
  logDebug: vi.fn(),
  logPortalsRequest: vi.fn(),
  logPortalsResponse: vi.fn(),
}));

vi.mock('@ionic/portals', () => ({
  getInitialContext: vi.fn(),
  publish: vi.fn(),
  subscribe: vi.fn(),
}));

vi.mock('@/external-libs-sources/ionicPortals0.7', () => ({
  getInitialContext: vi.fn(),
}));

const getInitialContext = vi.mocked(portalsGetInitialContext);
const get07InitialContext = vi.mocked(portals07GetInitialContext);
const debug = vi.mocked(logDebug);

describe('getPortalsInitialContext', () => {
  beforeEach(() => {
    getInitialContext.mockReset();
    get07InitialContext.mockReset();
    debug.mockReset();
  });

  test('returns the installed Portals initial context', () => {
    const context: InitialContext<string> = {
      name: 'test',
      value: 'context',
    };
    getInitialContext.mockReturnValue(context);

    expect(getPortalsInitialContext<string>()).toBe(context);
    expect(getInitialContext).toHaveBeenCalledTimes(1);
    expect(debug).toHaveBeenCalledWith('Use installed portals');
    expect(get07InitialContext).not.toHaveBeenCalled();
  });

  test('returns undefined outside a Portal', () => {
    getInitialContext.mockReturnValue(undefined);

    expect(getPortalsInitialContext()).toBeUndefined();
    expect(getInitialContext).toHaveBeenCalledTimes(1);
    expect(get07InitialContext).not.toHaveBeenCalled();
  });

  test('uses the Portals 0.7 fallback when the installed package throws', () => {
    const context: InitialContext<string> = {
      name: 'legacy-test',
      value: 'legacy-context',
    };
    getInitialContext.mockImplementation(() => {
      throw new Error('Installed Portals unavailable');
    });
    get07InitialContext.mockReturnValue(context);

    expect(getPortalsInitialContext<string>()).toBe(context);
    expect(get07InitialContext).toHaveBeenCalledTimes(1);
    expect(debug).toHaveBeenCalledWith('Use v0.7.1 portals fallback');
  });

  test('logs and rethrows errors from the Portals 0.7 fallback', () => {
    const fallbackError = new Error('Portals fallback unavailable');
    getInitialContext.mockImplementation(() => {
      throw new Error('Installed Portals unavailable');
    });
    get07InitialContext.mockImplementation(() => {
      throw fallbackError;
    });

    expect(() => getPortalsInitialContext()).toThrow(fallbackError);
    expect(debug).toHaveBeenCalledWith(
      'getPortalsInitialContext --- failed',
      fallbackError,
    );
  });
});
