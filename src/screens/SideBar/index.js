import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from 'react-native-firebase';

const sideBarData = [
  {
    iconName: 'user',
    title: 'User Profile',
    screen: 'UserProfileScreen',
  },
  {
    iconName: 'gift',
    title: 'Refer And Earn',
    screen: 'ReferAndEarnScreen',
  },
  {
    iconName: 'mail',
    title: 'Send Message',
    screen: 'SMSScreen',
  },
  {
    iconName: 'logout',
    title: 'Log Out',
    screen: '',
  },
];

export class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleButtonClick = () => {
    this.props.navigation.closeDrawer();
    Alert.alert('Logging Out!', 'Are you sure you want to logout ?', [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
      {
        text: 'OK',
        onPress: () => {
          firebase
            .auth()
            .signOut()
            .then(res => {
              this.props.navigation.navigate('LoginScreen');
            })
            .catch(err => {});
        },
      },
    ]);
  };

  render() {
    return (
      <ScrollView style={{flex: 1, paddingVertical: 40, marginHorizontal: 12}}>
        {sideBarData.map((item, index) => {
          return (
            <TouchableOpacity
              style={{flexDirection: 'row', marginBottom: 8}}
              onPress={() =>
                item.screen
                  ? this.props.navigation.navigate(item.screen)
                  : this.handleButtonClick()
              }>
              <Icon name={item.iconName} size={20} />
              <Text style={{fontSize: 18, marginLeft: 12}}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}
