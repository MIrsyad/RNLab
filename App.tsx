import React from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from './screens/homescreen';

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView>
      <HomeScreen />
    </GestureHandlerRootView>
  );
}

export default App;
