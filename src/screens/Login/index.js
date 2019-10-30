import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {LoginForm} from './loginForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
export class Login extends React.Component {
  render() {
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
        <LoginForm navigation={navigation} />
      </KeyboardAwareScrollView>
    );
  }
}
