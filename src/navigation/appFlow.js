import {Easing, Dimensions} from 'react-native';
import {createAppContainer, create} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {Login, Home, SideBar, UserProfile} from '../screens';

const AppStackNavigator = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    HomeScreen: {
      screen: Home,
    },
    UserProfileScreen: {
      screen: UserProfile,
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

const AppNavigator = createDrawerNavigator(
  {
    AppStackNavigator: {
      screen: AppStackNavigator,
    },
  },
  {
    initialRouteName: 'AppStackNavigator',
    contentComponent: SideBar,
  },
);

export default createAppContainer(AppNavigator);
