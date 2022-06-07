import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';

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
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef } from 'react';

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const [isWritingPressed, setIsWritingPressed] = React.useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const spinValue = React.useState(new Animated.Value(0))[0];

  React.useEffect(() => {
    if (isWritingPressed) {
      Animated.spring(spinValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(spinValue, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isWritingPressed, spinValue]);

  const spinDeg = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const animatedScaleStyle = {
    transform: [{ rotate: spinDeg }],
  };

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
            setIsWritingPressed(prev => !prev);
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
          <BottomSheet
            snapPoints={[187]}
            style={{
              flex: 1,
              paddingTop: 22,
              paddingHorizontal: 20,
              backgroundColor: 'grey',
            }}
            ref={bottomSheetRef}
            enableContentPanningGesture={false}
            enableHandlePanningGesture={false}
            enableOverDrag={false}
            handleIndicatorStyle={{ display: 'none' }}
            handleStyle={{ padding: 0 }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsWritingPressed(false);
                  navigation.navigate(ScreenName.Record);
                }}
                style={{
                  borderBottomColor: '#E2E2E2',
                  borderBottomWidth: 1,
                  marginBottom: 18,
                  paddingBottom: 18,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FastImage
                  source={recordIcon}
                  style={{ width: 22, height: 26 }}
                  resizeMode="contain"
                />
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontSize: 17 }}>기록하기</Text>
                  <Text style={{ fontSize: 13, marginTop: 5, opacity: 0.3 }}>
                    방문했던 카페의 기록을 남길 수 있어요.
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  setIsWritingPressed(false);
                  navigation.navigate(ScreenName.Record);
                }}>
                <FastImage
                  source={footStampIcon}
                  style={{ width: 22, height: 26 }}
                  resizeMode="contain"
                />
                <View style={{ marginLeft: 16 }}>
                  <Text style={{ fontSize: 17 }}>발도장 남기기</Text>
                  <Text style={{ fontSize: 13, marginTop: 5, opacity: 0.3 }}>
                    발도장만 남기고 나중에 기록을 추가할 수 있어요.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </BottomSheet>
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
                setIsWritingPressed(prev => !prev);
              }}>
              <Animated.View style={[animatedScaleStyle]}>
                <Text style={{ color: 'white', fontSize: 32, top: -2 }}>+</Text>
              </Animated.View>
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
    borderTopWidth: 1,
    borderColor: '#E2E2E2',
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
