import React from 'react';
import { View } from 'react-native';

interface IProps {
  backgroundColor: string;
  width: number;
  height: number;
  borderRadius: number;
  style?: any;
  key?: number;
}

const Dot = ({
  backgroundColor,
  width,
  height,
  borderRadius,
  style,
}: IProps) => {
  return (
    <View style={[style, { width, height, borderRadius, backgroundColor }]} />
  );
};

export default Dot;
