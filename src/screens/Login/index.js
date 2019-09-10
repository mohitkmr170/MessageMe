import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import {CheckBox} from '../../components';
import {styles} from './styles';
import Toast, {DURATION} from 'react-native-easy-toast';
import {COLOR} from '../../config/color';
import CodeInput from 'react-native-confirmation-code-input';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    let screenWidth = Dimensions.get('window').width,
      screenHeight = Dimensions.get('window').height;
    this.state = {
      phoneNumber: '',
      isChecked: false,
      isValid: false,
      confirmResult: null,
      code: '',
      loading: true,
      user: null,
    };
  }

  componentDidMount = () => {
    this.authSubscription = firebase.auth().onAuthStateChanged(user => {
      this.setState({loading: false, user});
      if (user) this.props.navigation.navigate('TabNavigatorScreen');
    });
  };

  componentWillUnmount = () => {
    this.authSubscription();
  };

  handleLoginPress = () => {
    const {isValid, phoneNumber, isChecked} = this.state;
    if (phoneNumber.length === 10 && isChecked) {
      //
      firebase
        .auth()
        .signInWithPhoneNumber('+91' + phoneNumber)
        .then(confirmResult => {
          this.setState({confirmResult: confirmResult, isValid: true});
        })
        .catch(err => {});
      //
    } else this.refs.toast.show('Invalid entry!');
  };

  onChecked = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  handleOtpVerification = confirmResult => {
    confirmResult
      .confirm(this.state.code)
      .then(res => {
        this.props.navigation.navigate('SignUpScreen');
      })
      .catch(err => {});
  };

  render() {
    const {isChecked, phoneNumber, isValid} = this.state;
    if (this.state.loading)
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator size="large" color={COLOR.primary} />
        </View>
      );
    else
      return (
        <View style={styles.mainContainer}>
          <View style={styles.topContanier}>
            {!this.state.confirmResult ? (
              <View style={styles.shadowCardContainer}>
                <Text style={{fontSize: 24}}>Hi there,</Text>
                <Text
                  style={{fontSize: 18, color: COLOR.grayMain, paddingTop: 4}}>
                  Login to your account
                </Text>
                <View style={styles.numberContainer}>
                  <Text style={{fontSize: 18, paddingVertical: 4}}>+91 </Text>
                  <TextInput
                    placeholder="Mobile number"
                    style={[
                      styles.phoneInputContainer,
                      {
                        borderBottomColor:
                          !isValid && phoneNumber.length !== 10
                            ? COLOR.primary
                            : COLOR.grayMain,
                      },
                    ]}
                    maxLength={10}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus
                    onChangeText={phoneNumber => this.setState({phoneNumber})}
                  />
                </View>
              </View>
            ) : (
              <Animatable.View
                ref={ref => (this.view = ref)}
                animation="bounceInRight"
                duration={1000}
                style={styles.shadowCardContainer}>
                <Text
                  style={{marginTop: 24, fontSize: 24, color: COLOR.grayMain}}>
                  Enter your OTP!
                </Text>
                <CodeInput
                  secureTextEntry
                  keyboardType="numeric"
                  activeColor={COLOR.primary}
                  inactiveColor={COLOR.primary}
                  autoFocus={true}
                  ignoreCase={true}
                  inputPosition="center"
                  size={36}
                  className={'border-b-t'}
                  codeLength={6}
                  onFulfill={(isValid, code) => {
                    this.setState({code: isValid});
                  }}
                  containerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    marginBottom: 24,
                  }}
                  codeInputStyle={{borderWidth: 1.5}}
                />
                <Text>
                  OTP sent to{' '}
                  <Text style={{color: COLOR.primary}}>
                    {this.state.phoneNumber}
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.handleOtpVerification(this.state.confirmResult)
                  }
                  style={[styles.loginButtonContainer, {marginBottom: 24}]}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    VERIFY
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>

          {!this.state.confirmResult && (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <CheckBox checked={isChecked} onCheckBoxPress={this.onChecked} />
              <Text>Agree and Continue</Text>
            </View>
          )}
          {!this.state.confirmResult && (
            <TouchableOpacity
              onPress={() => this.handleLoginPress()}
              style={styles.loginButtonContainer}>
              <Text style={{color: '#fff', fontWeight: 'bold'}}>PROCEED</Text>
            </TouchableOpacity>
          )}
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
