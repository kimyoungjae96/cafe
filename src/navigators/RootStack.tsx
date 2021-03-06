import React, { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUp, Record, Search, SearchResult } from '@/screens';
import MainTab from '@/navigators/MainTab';
import { ScreenName } from '@/infra/route';
import CafeDetail from '@/screens/CafeDetail';

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
            <Stack.Screen name={ScreenName.MainTab} component={MainTab} />
            <Stack.Screen name={ScreenName.CafeDetail} component={CafeDetail} />
            <Stack.Screen name={ScreenName.Record} component={Record} />
            <Stack.Screen name={ScreenName.Search} component={Search} />
            <Stack.Screen
              name={ScreenName.SearchResult}
              component={SearchResult}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Group>
          {/*<Stack.Screen name="SignIn" component={SignIn} />*/}
          <Stack.Screen name={ScreenName.SignUp} component={SignUp} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
