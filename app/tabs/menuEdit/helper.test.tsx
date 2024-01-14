import * as HelperModule from './helper';

test('should return current day', () => {
  const date = new Date();
  const mockedGetCurrentDay = jest
    .spyOn(HelperModule, 'getCurrentDay')
    .mockReturnValue(date.getMilliseconds());

  expect(HelperModule.getCurrentDay()).toEqual(date.getMilliseconds());
  expect(mockedGetCurrentDay).toHaveBeenCalled();

  jest.dontMock('./helper');

  expect(HelperModule.getCurrentDay()).toEqual(date.getMilliseconds());
});
