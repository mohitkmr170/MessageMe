import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {checked, onCheckBoxPress} = this.props;
    return (
      <TouchableOpacity
        style={{height: 32, width: 32}}
        onPress={onCheckBoxPress}>
        <Icon
          name="check-square"
          size={20}
          color={checked ? '#9A0FFD' : '#8A8C9B'}
        />
      </TouchableOpacity>
    );
  }
}
