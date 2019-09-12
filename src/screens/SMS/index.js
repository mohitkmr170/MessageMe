import React from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import {Header, Button} from '../../components';
import SendSMS from 'react-native-sms';
import {COLOR} from '../../config/color';

export class SMS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }

  handleMessageSend = () => {
    SendSMS.send(
      {
        body: 'Sample Message',
        recipients: [this.state.phone],
        successTypes: ['send', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            'error: ' +
            error,
        );
      },
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          headerText="SMS"
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={{flex: 1, margin: 12}}>
          <TextInput
            style={{
              fontSize: 16,
              borderColor: COLOR.grayMain,
              borderWidth: 1,
              padding: 8,
              borderRadius: 8,
            }}
            onChangeText={val => this.setState({phone: val})}
          />
        </View>
        <Button buttonText="Send" onPress={() => this.handleMessageSend()} />
      </View>
    );
  }
}
