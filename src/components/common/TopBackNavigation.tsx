import React from 'react';
import { Text, TouchableOpacity, View } from '@/components';

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { isAOS } from '@/infra';
import FastImage from 'react-native-fast-image';
import { backIcon } from '@/assets/images';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: isAOS ? 20 : 20,
    zIndex: 1,
  },
  chevronLeft: {
    top: isAOS ? 8 : 0,
    marginLeft: 20,
    width: 21,
    height: 18,
    zIndex: 3,
    backgroundColor: 'transparent',
    padding: 20,
  },
  chevronLeftWrapper: {
    position: 'absolute',
    left: 20,
    backgroundColor: 'transparent',
    top: 12,
  },
  titleView: { flex: 1, backgroundColor: 'transparent', alignItems: 'center' },
});

export const TopBackNavigation: React.FC<{
  title?: string;
  titleStyle?: TextStyle;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}> = ({ title, titleStyle, containerStyle = {}, onPress }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.titleView}>
        <Text style={titleStyle}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.chevronLeftWrapper}>
        <FastImage source={backIcon} style={{ width: 21, height: 17 }} />
      </TouchableOpacity>
    </View>
  );
};
