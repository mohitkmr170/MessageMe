import React from 'react';
import {View, Text} from 'react-native';
import {COLOR} from '../../config/color';
import {GiftedChat} from 'react-native-gifted-chat';
import {Header} from '../../components';
import firebase from 'react-native-firebase';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  ref() {
    return firebase.database().ref('messages');
  }

  on = callback => {
    this.ref()
      .limitToLast(20)
      .on('child_added', snap => {
        if (
          (snap.val().user._id === firebase.auth().currentUser.uid &&
            snap.val().user.receiver_id ===
              this.props.navigation.state.params.uid) ||
          (snap.val().user._id === this.props.navigation.state.params.uid &&
            snap.val().user.receiver_id === firebase.auth().currentUser.uid)
        )
          callback(this.parse(snap));
      });
  };

  parse = snap => {
    const {timestamp: numberStamp, text, user} = snap.val();
    const {key: _id} = snap;

    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  off = () => {
    this.ref().off();
  };

  uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp(),
      };
      this.append(message);
    }
  };

  append = message => this.ref().push(message);

  componentDidMount = () => {
    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      })),
    );
  };

  componentWillUnmount = () => {
    this.off();
  };

  user = () => {
    return {
      name: this.props.navigation.state.params.name,
      _id: this.uid(),
      receiver_id: this.props.navigation.state.params.uid,
    };
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          headerText={this.props.navigation.state.params.name}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={msg => this.send(msg)}
          user={this.user()}
        />
      </View>
    );
  }
}
