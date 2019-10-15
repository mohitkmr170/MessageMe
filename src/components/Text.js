import React from 'react';
import {Text, View} from 'react-native';

export class TextCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text {...this.props}>{this.props.t}</Text>
      </View>
    );
  }
}
