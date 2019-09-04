import React from 'react';
import {View, Text, TouchableOpacity, Alert, TextInput} from 'react-native';
import {CheckBox} from '../../components';
import {styles} from './styles';
import Toast, {DURATION} from 'react-native-easy-toast';
import {COLOR} from '../../config/color';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '+91',
      isChecked: false,
      isValid: false,
    };
  }

  handleLoginPress = () => {
    const {isValid, phoneNumber, isChecked} = this.state;
    if (phoneNumber.length === 10 && isChecked) {
      this.setState({isValid: true});
      this.props.navigation.navigate('HomeScreen');
    } else this.refs.toast.show('Invalid entry!');
  };

  onChecked = () => {
    this.setState({isChecked: !this.state.isChecked});
  };

  render() {
    const {isChecked, phoneNumber, isValid} = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topContanier}>
          <Text style={{fontSize: 24}}>Hi there,</Text>
          <Text style={{fontSize: 18, color: COLOR.grayMain, paddingTop: 4}}>
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

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <CheckBox checked={isChecked} onCheckBoxPress={this.onChecked} />
          <Text>Agree and Continue</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.handleLoginPress()}
          style={styles.loginButtonContainer}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>LOGIN</Text>
        </TouchableOpacity>
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
