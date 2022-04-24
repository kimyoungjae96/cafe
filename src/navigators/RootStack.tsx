import React, { useState } from 'react';
import { SignUp, Home } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from '@/navigators/MainTab';
import { WritingButtonsScreen } from '@/screens/WritingButtons';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <>
          <Stack.Group>
            <Stack.Screen name="Main" component={MainTab} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="WritingButtons"
              component={WritingButtonsScreen}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Group>
          {/*<Stack.Screen name="SignIn" component={SignIn} />*/}
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
