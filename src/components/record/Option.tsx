import React from 'react';

import { Text, TouchableOpacity, View } from '@/components';
import { theme } from '@/infra';

const Option = ({
  text,
  selected,
  onClickOption,
}: {
  text: string;
  selected: boolean;
  onClickOption: Function;
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          width: 76,
          height: 76,
          backgroundColor: selected ? theme['color-primary-500'] : '#F6F6F6',
          borderRadius: 10,
        }}
        onPress={() => {
          onClickOption();
        }}
      />
      <Text style={{ marginTop: 10 }}>{text}</Text>
    </View>
  );
};

export default Option;
