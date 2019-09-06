import React from 'react';
import {View, Text} from 'react-native';
import {Header} from '../../components';

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View>
        <Header
          headerText="Profile"
          onBackPress={() => this.handleBackButton()}
        />
        <Text>User Profile</Text>
      </View>
    );
  }
}
