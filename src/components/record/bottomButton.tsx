import React from 'react';

import { theme, WINDOW_WIDTH } from '@/infra';
import { Text, TouchableOpacity } from '@/components';

const BottomButton = ({
  disabled,
  onClickNext,
}: {
  disabled: boolean;
  onClickNext: Function;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        onClickNext();
      }}
      style={{
        position: 'absolute',
        width: WINDOW_WIDTH,
        height: 60,
        bottom: 0,
        backgroundColor: disabled ? '#DEDEDE' : theme['color-primary-500'],
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
        다음
      </Text>
    </TouchableOpacity>
  );
};

export default BottomButton;
