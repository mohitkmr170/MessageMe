import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {};
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 12,
        }}>
        <TouchableOpacity onPress={this.props.onBackPress}>
          <Icon name="left" size={24} />
        </TouchableOpacity>
        {this.props.headerText && (
          <Text style={{fontSize: 24}}>{this.props.headerText}</Text>
        )}
        <TouchableOpacity>
          <Icon name="wechat" size={24} />
        </TouchableOpacity>
      </View>
    );
  }
}
