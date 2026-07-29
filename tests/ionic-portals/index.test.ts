import { logDebug } from '@egym/mwa-logger';
import {
  getInitialContext as portalsGetInitialContext,
  InitialContext,
} from '@ionic/portals';
import { beforeEach, describe, expect, test, vi } from 'vitest';
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

const getInitialContext = vi.mocked(portalsGetInitialContext);
const debug = vi.mocked(logDebug);

describe('getPortalsInitialContext', () => {
  beforeEach(() => {
    getInitialContext.mockReset();
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
  });

  test('returns undefined outside a Portal', () => {
    getInitialContext.mockReturnValue(undefined);

    expect(getPortalsInitialContext()).toBeUndefined();
    expect(getInitialContext).toHaveBeenCalledTimes(1);
  });

  test('logs and rethrows errors from the installed Portals package', () => {
    const error = new Error('Portals unavailable');
    getInitialContext.mockImplementation(() => {
      throw error;
    });

    expect(() => getPortalsInitialContext()).toThrow(error);
    expect(debug).toHaveBeenCalledWith(
      'getPortalsInitialContext --- failed',
      error,
    );
  });
});
