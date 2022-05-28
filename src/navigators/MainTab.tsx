import * as React from 'react';
import { View, Text } from '@/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from '@/components/mainTab/TabBar';
import { FeedScreen } from '@/screens/mainTab';

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

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}>
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
  );
};

export default MainTab;
