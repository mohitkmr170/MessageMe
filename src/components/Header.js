import React from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {headerBanner} from '../assets/index';
import {COLOR} from '../config/color';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};
  render() {
    return (
      <ImageBackground
        source={headerBanner}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 12,
        }}>
        <TouchableOpacity onPress={this.props.onBackPress}>
          <Icon
            name={this.props.headerText === 'Home' ? 'bars' : 'left'}
            size={24}
            color={COLOR.white}
          />
        </TouchableOpacity>
        {this.props.headerText && (
          <Text style={{fontSize: 24, color: COLOR.white}}>
            {this.props.headerText}
          </Text>
        )}
        <TouchableOpacity>
          <Icon name="wechat" size={24} color={COLOR.white} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}
