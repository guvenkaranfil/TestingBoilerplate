import {by, device, expect, element} from 'detox';

describe('Login Flow and Phone Book List', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login successfully and see the phone book list', async () => {
    await expect(element(by.label('Login'))).toBeVisible();

    await element(by.label(/Go To Home/i)).tap();
    await expect(element(by.label('Phone Book'))).toBeVisible();

    await element(by.label('Phone Book')).tap();
    await expect(element(by.label(/No data/i))).toBeVisible();
  });
});
