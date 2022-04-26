import * as React from 'react';
import { StyleSheet } from 'react-native';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';

import {
  aroundIcon,
  dibsIcon,
  feedIcon,
  footStampIcon,
  myIcon,
  recordIcon,
} from '@/assets/images';
import { Text, TouchableOpacity, View } from '@/components';
import { isIOS, theme, WINDOW_HEIGHT, WINDOW_WIDTH } from '@/infra';
import { ScreenName } from '@/infra/route';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [isWritingPressed, setIsWritingPressed] = React.useState(false);

  const renderMenu = (route: any, index: number) => {
    const { options } = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const getIcon = (name: 'Feed' | 'Around' | 'Dibs' | 'My') => {
      return {
        Feed: feedIcon,
        Around: aroundIcon,
        Dibs: dibsIcon,
        My: myIcon,
      }[name];
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.menuIconWrapper}>
        <FastImage
          style={{ width: 24, height: 24 }}
          source={getIcon(route.name as any)}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={{
            color: isFocused ? '#673ab7' : '#222',
            fontSize: 8,
            fontWeight: 'bold',
            marginTop: 3,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {isWritingPressed && (
        <TouchableOpacity
          onPress={() => {
            setIsWritingPressed(false);
          }}
          style={{
            position: 'absolute',
            width: WINDOW_WIDTH,
            height: isIOS ? WINDOW_HEIGHT - 48 : WINDOW_HEIGHT,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.5,
              backgroundColor: 'black',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenName.Record);
            }}
            style={{
              ...styles.writingButton,
              marginBottom: 8,
            }}>
            <FastImage
              source={recordIcon}
              style={{ width: 22, height: 26 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 11, marginTop: 4 }}>기록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.writingButton,
              marginBottom: 36,
            }}>
            <FastImage
              source={footStampIcon}
              style={{ width: 28, height: 31 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 11, marginTop: 4 }}>발도장</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      <View
        style={{
          flexDirection: 'row',
        }}>
        {[state.routes[0], state.routes[1]].map(renderMenu)}
        <View
          style={{
            width: 68,
            height: '100%',
          }}>
          <View style={{ flex: 1, zIndex: 2 }}>
            <View
              style={{
                ...styles.circleForCenterButton,
                left: -18,
              }}
            />
            <View
              style={{
                ...styles.circleForCenterButton,
                right: -18,
              }}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.centerButton}
              onPress={() => {
                setIsWritingPressed(true);
              }}>
              <Text style={{ color: 'white', fontSize: 32, top: -2 }}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: 'white', height: 48 }} />
        </View>
        {[state.routes[2], state.routes[3]].map((route, index) =>
          renderMenu(route, index + 2),
        )}
      </View>
    </>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  menuIconWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 14,
    paddingBottom: 11,
  },
  writingButton: {
    width: 66,
    height: 66,
    backgroundColor: 'white',
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleForCenterButton: {
    width: 28,
    height: 28,
    borderRadius: 28,
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
  },
  centerButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme['color-primary-500'],
    alignSelf: 'center',
    top: -8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
