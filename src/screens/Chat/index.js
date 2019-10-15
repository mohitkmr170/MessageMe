import React from 'react';
import {View, Text, Alert, Dimensions} from 'react-native';
import {COLOR} from '../../config/color';
import {GiftedChat} from 'react-native-gifted-chat';
import {Header} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import firebase from 'react-native-firebase';

export class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isNonTextMessage: false,
    };
  }

  ref() {
    return firebase.database().ref('messages');
  }

  on = callback => {
    this.ref()
      .limitToLast(20)
      .on('child_added', snap => {
        //value
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
    this.on(message => {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }));
    });
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

  handleLongPress = (context, message) => {
    Alert.alert(
      'Delete Message!',
      'Are you sure you want to Delete this message ?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
        {
          text: 'OK',
          onPress: () => {
            firebase
              .database()
              .ref('messages/' + message._id)
              .remove()
              .then(res => {
                const filteredMessage = this.state.messages.filter(
                  item => item._id !== message._id,
                );
                this.setState({messages: filteredMessage});
              })
              .catch(err => {});
          },
        },
      ],
    );
  };

  handleImage = () => {
    this.setState({isNonTextMessage: !this.state.isNonTextMessage});
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
          alwaysShowSend={false}
          showUserAvatar
          isAnimated
          isLoadingEarlier
          onLongPress={this.handleLongPress}
          // renderActions={() => {
          //   return (
          //     <Icon
          //       name="paperclip"
          //       size={32}
          //       hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          //       onPress={() => this.handleImage()}
          //       style={{
          //         position: 'absolute',
          //         zIndex: 2,
          //         right: 12,
          //       }}
          //     />
          //   );
          // }}
        />
        {this.state.isNonTextMessage && (
          <Animatable.View
            ref={ref => (this.view = ref)}
            animation="bounceInUp"
            delay={100}
            style={{
              position: 'absolute',
              bottom: 46,
              backgroundColor: COLOR.transparent,
              width: '100%',
            }}>
            <Text style={{fontSize: 32, color: COLOR.white}}>Image</Text>
          </Animatable.View>
        )}
      </View>
    );
  }
}
