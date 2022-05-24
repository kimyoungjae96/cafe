import React from 'react';

import { Text, TouchableOpacity, View } from '@/components';
import { theme } from '@/infra';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';

const Option = ({
  text,
  selected,
  onClickOption,
  image,
}: {
  text: string;
  selected: boolean;
  onClickOption: Function;
  image: any;
}) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          width: 76,
          height: 76,
          backgroundColor: selected ? theme['color-primary-500'] : '#F6F6F6',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          onClickOption();
        }}>
        <FastImage
          source={image}
          style={{ width: 47, height: 47 }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      <Text style={selected ? styles.selectedText : styles.notSelectedText}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedText: {
    marginTop: 10,
    fontWeight: '700',
    color: theme['color-primary-500'],
  },
  notSelectedText: {
    marginTop: 10,
    fontWeight: '700',
    color: '#999',
  },
});

export default Option;
