import React from 'react';
import {
  View as RNView,
  ViewProps as RNViewProps,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { isDarkMode } from '@/infra/utils';

interface ViewProps extends RNViewProps {
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

const View = ({ style, children, useDefaultStyle, ...others }: ViewProps) => {
  const colorSchemeName = useColorScheme();
  return (
    <RNView
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
    </RNView>
  );
};

export default View;
