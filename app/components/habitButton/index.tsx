import React from 'react';
import {Pressable, TextProps} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RouteParams} from '../../navigation';
import HabitText, {IText} from '../habitText';

type NavigationProps = NavigationProp<RouteParams, 'habitCreate'>;
interface HabitButtonProps {
  type: 'navigate' | 'goBack';
  screen: keyof RouteParams;
  labelProps: TextProps & IText;
}
const HabitButton = (props: HabitButtonProps) => {
  const {navigate, goBack} = useNavigation<NavigationProps>();

  return (
    <Pressable
      onPress={() =>
        props.type === 'goBack' ? goBack() : navigate(props.screen)
      }>
      <HabitText fontWeight="500" {...props.labelProps} />
    </Pressable>
  );
};

export default HabitButton;
