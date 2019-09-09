import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {headerBanner} from '../assets';
import {COLOR} from '../config/color';

export class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ImageBackground source={headerBanner} style={{width: '100%'}}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={this.props.onPress}>
          <Text style={{fontSize: 20, paddingVertical: 12, color: COLOR.white}}>
            {this.props.buttonText}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
