import React from 'react';
import {SafeAreaView} from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <SafeAreaView>
      <QueryClientProvider client={queryClient}></QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
