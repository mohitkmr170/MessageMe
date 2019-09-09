import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../../config/color';

export class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{marginVertical: 12}}>
        <View style={{flexDirection: 'row'}}>
          <Icon name={this.props.textIcon} size={16} />
          <Text style={{marginLeft: 8}}>{this.props.text}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor:
              !this.props.isValid && this.props.text === 'E-MAIL ADDRESS'
                ? COLOR.primary
                : COLOR.grayMain,
            borderBottomWidth: 1,
            justifyContent: 'space-between',
            paddingVertical: 4,
          }}>
          <TextInput
            placeholder={this.props.placeholder}
            style={{fontSize: 16}}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.props.onChangeText}
          />
          {this.props.textInputIcon && (
            <Icon name={this.props.textInputIcon} size={16} />
          )}
        </View>
      </View>
    );
  }
}
