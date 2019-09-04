import {Easing} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Login, Home} from '../screens';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    HomeScreen: {
      screen: Home,
    },
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 100,
      },
    }),
  },
);

export default createAppContainer(AppNavigator);
