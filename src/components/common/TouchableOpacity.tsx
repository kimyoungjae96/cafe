import React from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { isDarkMode } from '@/infra/utils';

interface TouchableOpacityProps extends RNTouchableOpacityProps {
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  useDefaultStyle?: boolean;
}

const defaultLightStyle = {
  backgroundColor: 'white',
};

const defaultDarkStyle = {
  backgroundColor: 'black',
};

const TouchableOpacity = ({
  style,
  children,
  useDefaultStyle,
  ...others
}: TouchableOpacityProps) => {
  const colorSchemeName = useColorScheme();
  return (
    <RNTouchableOpacity
      style={[
        useDefaultStyle === true && {
          ...(isDarkMode(colorSchemeName)
            ? defaultDarkStyle
            : defaultLightStyle),
        },
        style,
      ]}
      {...others}>
      {children}
    </RNTouchableOpacity>
  );
};

export default TouchableOpacity;
