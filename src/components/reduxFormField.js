import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInputBox} from './textInputBox';

export class ReduxFormField extends React.Component {
  render() {
    const {
      input,
      newValue,
      meta: {touched, error},
    } = this.props;
    const customContainerStyle = touched && error ? {borderColor: 'red'} : {};

    return (
      <View>
        <TextInputBox
          {...this.props}
          {...input}
          customContainerStyle={[Styles.containerStyle, customContainerStyle]}
          labelStyle={Styles.labelStyle}
        />
        <View style={Styles.fieldError}>
          {touched && error ? (
            <Text style={Styles.errorText}>{`*${error}`}</Text>
          ) : null}
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 4,
  },
  labelStyle: {
    marginTop: 6,
  },
  fieldError: {
    alignItems: 'flex-end',
    height: 14,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    lineHeight: 14,
  },
});
