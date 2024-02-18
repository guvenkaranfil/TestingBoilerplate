import {device} from 'detox';

describe('Login Flow and Phone Book List', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should', async () => {});
});
