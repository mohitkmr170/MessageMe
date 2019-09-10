import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/configStore';

import AppNavigator from './src/navigation/appFlow';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{flex: 1}}>
            <AppNavigator />
          </SafeAreaView>
        </Fragment>
      </PersistGate>
    </Provider>
  );
};

export default App;
