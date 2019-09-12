import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLOR} from '../config/color';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export class SnackBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [
        {
          title: 'Message received!',
          message: 'You have received one message from XYZ',
        },
        {
          title: 'Message send!',
          message: 'Your message has been sent to XYZ',
        },
        {
          title: 'Referral bonus!',
          message: 'XYZ signed in using your referral, you received 30 coins',
        },
      ],
      clearAll: false,
    };
  }

  componentDidMount() {}

  returnItem = (item, index) => {
    console.log('asudbjasd', item);
    return (
      <Animatable.View
        ref={ref => (this.listView = ref)}
        style={{paddingHorizontal: 12, padding: 8}}>
        <Text style={{fontSize: 18, color: COLOR.black}}>{item.title}</Text>
        <Text style={{fontSize: 14, color: COLOR.black}}>{item.message}</Text>
      </Animatable.View>
    );
  };

  handleClearAll = () => {
    this.listView.fadeOutRight(100);
    this.view.bounceInUp(150);
    this.setState({notifications: []});
    this.props.clearNotification();
  };

  render() {
    return (
      <View>
        <Animatable.View
          ref={ref => (this.view = ref)}
          animation="bounceInDown"
          delay={200}
          onAnimationEnd={() => {
            this.setState({clearAll: true});
          }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
          }}>
          <View
            style={{
              backgroundColor: COLOR.white,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              borderBottomColor: COLOR.grayMain,
              borderBottomWidth: 1,
              paddingVertical: 8,
            }}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state.notifications}
              data={this.state.notifications}
              renderItem={({item, index}) => this.returnItem(item, index)}
            />
          </View>
          {this.state.clearAll && (
            <View
              style={{
                height: 24,
                alignSelf: 'flex-end',
                marginRight: 12,
              }}>
              <TouchableOpacity onPress={() => this.handleClearAll()}>
                <Icon
                  name="notification-clear-all"
                  size={36}
                  color={COLOR.white}
                />
              </TouchableOpacity>
            </View>
          )}
        </Animatable.View>
      </View>
    );
  }
}
