import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import firebase from 'react-native-firebase';
import {Header} from '../../components';
import {GiftedChat} from 'react-native-gifted-chat';
import {COLOR} from '../../config/color';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: false,
      message: [],
    };
  }

  handleMessageSent = msg => {
    let arr = this.state.message;
    arr.push(msg);
    this.setState({message: arr});
  };

  handleBackButton = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header headerText="Home" onBackPress={() => this.handleBackButton()} />
        <TouchableOpacity onPress={() => this.setState({chat: true})}>
          <Text>Home Screen</Text>
        </TouchableOpacity>
        {this.state.chat && (
          <View style={{flex: 1, borderColor: COLOR.primary, borderWidth: 1}}>
            <GiftedChat onSend={msg => this.handleMessageSent(msg)} />
          </View>
        )}
      </View>
    );
  }
}
