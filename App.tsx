import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  Text,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useStore} from './src/store';

const App = () => {
  const t = useStore(state => state.name);
  const changeT = useStore(state => state.setName);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>{t}</Text>
      <Button
        title={'헤헤'}
        onPress={() => {
          console.log('hi');
          changeT('hk');
        }}></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
