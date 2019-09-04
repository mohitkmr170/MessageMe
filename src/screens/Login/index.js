import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <Text>Login Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
