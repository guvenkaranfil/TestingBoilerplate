import {StyleSheet, Text, TextProps} from 'react-native';
import React from 'react';
import colors, {IColors} from '../../utils/colors';

export enum TextTypes {
  h1,
  h2,
  h3,
  h4,
  body,
  caption,
  small,
}

export interface IText {
  type?: TextTypes;
  text: string;
  color?: keyof IColors;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
}

export default function HabitText(props: TextProps & IText) {
  return (
    <Text
      style={[
        styles[props.type ?? TextTypes.caption],
        styles.family,
        {
          color: colors[props.color ?? 'bluePrimary'],
          fontWeight: props.fontWeight,
        },
        props.style,
      ]}
      {...props}>
      {props.text}
    </Text>
  );
}

const styles = StyleSheet.create({
  [TextTypes.h1]: {
    fontSize: 24,
  },
  [TextTypes.h2]: {
    fontSize: 22,
  },
  [TextTypes.h3]: {
    fontSize: 20,
  },
  [TextTypes.h4]: {
    fontSize: 18,
  },
  [TextTypes.body]: {
    fontSize: 16,
  },
  [TextTypes.caption]: {
    fontSize: 14,
  },
  [TextTypes.small]: {
    fontSize: 12,
  },
  family: {
    fontFamily: 'Roboto-Regular',
  },
});
