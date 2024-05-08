import { MwaInitialContext, getMwaInitialContext } from '@/egym';

const initialContext: MwaInitialContext = {
  exerciserUuid: '633f5fd7-ff12-4865-80d6-c3d0ccdab305',
  gender: 'male',
  measurementSystem: 'metric',
  dateOfBirth: '1970-01-01',
  authToken: 'authToken',
  language: 'en_US',
  lightPrimaryColor: '#ffffff',
  primaryColor: '#ff0000',
  primaryTextColor: 'black',
  startingRoute: 'starting-route',
  url: 'https://example.com',
};

jest.mock('@ionic/portals', () => {
  return {
    getInitialContext: jest.fn(),
  };
});

describe('getMwaInitialContext test cases', () => {
  test('getMwaInitialContext returns the initial context', () => {
    // Setup
    const { getInitialContext } = jest.requireMock('@ionic/portals');
    getInitialContext.mockImplementationOnce(() => initialContext);

    // Act
    const initialContextReturn = getMwaInitialContext();

    // Verify
    expect(getInitialContext).toBeCalledTimes(1);
    expect(initialContextReturn).toEqual(initialContext);
  });
});
