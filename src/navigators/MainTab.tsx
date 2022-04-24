import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  aroundIcon,
  dibsIcon,
  feedIcon,
  footStampIcon,
  myIcon,
  recordIcon,
} from '@/assets/images';
import FastImage from 'react-native-fast-image';
import { isIOS, theme, WINDOW_HEIGHT, WINDOW_WIDTH } from '@/infra';
import { useState } from 'react';

function FeedScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function AroundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function DibsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [isWritingPressed, setIsWritingPressed] = useState(false);

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
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingTop: 14,
          paddingBottom: 11,
        }}>
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
              width: WINDOW_WIDTH,
              height: isIOS ? WINDOW_HEIGHT - 48 : WINDOW_HEIGHT,
              opacity: 0.5,
              backgroundColor: 'black',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setIsWritingPressed(false);
            }}
            style={{
              width: 66,
              height: 66,
              backgroundColor: 'white',
              borderRadius: 33,
              marginBottom: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage
              source={recordIcon}
              style={{ width: 22, height: 26 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 66,
              height: 66,
              backgroundColor: 'white',
              borderRadius: 33,
              marginBottom: 36,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage
              source={footStampIcon}
              style={{ width: 28, height: 31 }}
              resizeMode="contain"
            />
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
                width: 28,
                height: 28,
                borderRadius: 28,
                position: 'absolute',
                backgroundColor: 'white',
                top: 0,
                left: -18,
              }}
            />
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 28,
                position: 'absolute',
                backgroundColor: 'white',
                top: 0,
                right: -18,
              }}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: theme['color-primary-500'],
                alignSelf: 'center',
                top: -8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setIsWritingPressed(true);
              }}>
              <View>
                <Text style={{ color: 'white', fontSize: 32, top: -2 }}>+</Text>
              </View>
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
}

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'bottom', 'left']}>
      <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="Feed"
          options={{ tabBarLabel: '피드' }}
          component={FeedScreen}
        />
        <Tab.Screen
          name="Around"
          options={{ tabBarLabel: '주변' }}
          component={AroundScreen}
        />
        <Tab.Screen
          name="Dibs"
          options={{ tabBarLabel: '찜' }}
          component={DibsScreen}
        />
        <Tab.Screen
          name="My"
          options={{ tabBarLabel: 'MY' }}
          component={MyScreen}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainTab;
