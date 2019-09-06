import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import firebase from 'react-native-firebase';
import Contacts from 'react-native-contacts';
import {Header} from '../../components';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleBackButton = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    console.log('contacts123', this.state);
    return (
      <View style={{flex: 1}}>
        <Header headerText="Home" onBackPress={() => this.handleBackButton()} />
        <View style={{flex: 1}}>
          <Text>Home Screen</Text>
        </View>
      </View>
    );
  }
}
