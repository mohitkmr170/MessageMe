import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header, Button} from '../../components';
import {InputField} from './InputField';
import Toast, {DURATION} from 'react-native-easy-toast';
import firebase from 'react-native-firebase';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      email: '',
      name: '',
    };
  }

  onChangeText = (type, val) => {
    if (type === 'email') {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (!reg.test(val)) {
        this.setState({isValid: false});
      } else this.setState({isValid: true, email: val});
    } else {
      this.setState({name: val});
    }
  };

  onPress = () => {
    if (this.state.email && this.state.name) {
      // Create user Firebase
      const currUser = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref('/users/' + currUser)
        .set({
          name: this.state.name,
          email: this.state.email,
          phone: firebase.auth().currentUser.phoneNumber,
          uid: currUser,
        })
        .then(() => this.props.navigation.navigate('TabNavigatorScreen'))
        .catch(err => {});

      //
    } else this.refs.toast.show('Invalid entry!');
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header headerText="Profile Details" onBackPress={() => {}} />
        <View style={{flex: 1, margin: 32}}>
          <InputField
            textIcon="adduser"
            text="FULL NAME"
            placeholder="enter your name"
            onChangeText={val => this.onChangeText('name', val)}
          />
          <InputField
            textIcon="mail"
            text="E-MAIL ADDRESS"
            placeholder="enter your email"
            onChangeText={val => this.onChangeText('email', val)}
            isValid={this.state.isValid}
          />
        </View>
        <Button buttonText="Proceed" onPress={() => this.onPress()} />
        <Toast
          ref="toast"
          opacity={0.8}
          fadeInDuration={750}
          fadeOutDuration={1000}
        />
      </View>
    );
  }
}
