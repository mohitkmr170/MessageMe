import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogOut = () => {
    console.log('asdhgasqw');
    firebase
      .auth()
      .signOut()
      .then(res => {
        console.log('asdhgas', res);
        this.props.navigation.navigate('LoginScreen');
      })
      .catch(err => {});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Home Screen</Text>
        <TouchableOpacity onPress={() => this.handleLogOut()}>
          <Text>LogOut</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
