import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  useColorScheme,
} from 'react-native';
import { isDarkMode } from '@/infra/utils';

interface TextProps extends RNTextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  useDefaultStyle?: boolean;
}

const defaultLightStyle = {
  color: 'black',
};

const defaultDarkStyle = {
  color: 'white',
};

const Text = ({ style, children, useDefaultStyle, ...others }: TextProps) => {
  const colorSchemeName = useColorScheme();
  return (
    <RNText
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
    </RNText>
  );
};

export default Text;
