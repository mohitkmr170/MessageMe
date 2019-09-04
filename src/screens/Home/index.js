import React from 'react';
import {View, Text} from 'react-native';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}
