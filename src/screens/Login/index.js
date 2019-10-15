import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {LoginForm} from './loginForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export class Login extends React.Component {
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
        <LoginForm />
      </KeyboardAwareScrollView>
    );
  }
}
