import React from 'react';
import {Easing, Dimensions, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {createAppContainer, create} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {Login, Home, SideBar, UserProfile, SignUp, Chat} from '../screens';
import {COLOR} from '../config/color';

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: () => <Icon name="home" size={24} />,
      },
    },
    User: {
      screen: UserProfile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: () => <Icon name="user" size={24} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: COLOR.primary,
      inactiveTintColor: COLOR.grayMain,
      showIcon: true,
      labelStyle: {
        fontSize: 14,
      },
    },
  },
);

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
    TabNavigatorScreen: {
      screen: TabNavigator,
    },
    SignUpScreen: {
      screen: SignUp,
    },
    ChatScreen: {
      screen: Chat,
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
