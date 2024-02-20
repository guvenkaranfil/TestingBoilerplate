import {ColorValue} from 'react-native';

export interface IColors {
  white: ColorValue;
  blueTertiary: ColorValue;
  blueSecondary: ColorValue;
  bluePrimary: ColorValue;
  greenSecondary: ColorValue;
  greenTertiary: ColorValue;
}

const colors: IColors = {
  white: '#fff',

  bluePrimary: '#121926',
  blueSecondary: '#3B4B69',
  blueTertiary: '#617594',

  greenSecondary: '#38a84b',
  greenTertiary: '#39D353',
};

export default colors;
