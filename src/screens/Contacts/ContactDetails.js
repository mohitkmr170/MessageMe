import React from 'react';
import {View, Text, Touchable, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLOR} from '../../config/color';
import {appConstants} from '../../constants/appConstants';

const W = appConstants.screenWidth;

export class ContactDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps && this.props.showContactDetail) {
      console.log('Contact changed!');
    }
  };

  render() {
    return (
      <Animatable.View
        ref={ref => (this.view = ref)}
        animation="bounceInUp"
        delay={100}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 12,
          right: 12,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.transparent,
            marginTop: W / 3,
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}>
          <Image
            source={{uri: appConstants.defaultProfileImage}}
            style={{
              height: W / 3,
              width: W / 3,
              borderRadius: W / 6,
              zIndex: 2,
              position: 'absolute',
              top: -W / 6,
              alignSelf: 'center',
            }}
          />
          <View style={{marginTop: W / 6, margin: 12}}>
            <Text
              style={{
                color: COLOR.white,
                fontSize: 20,
                textAlign: 'center',
                paddingVertical: 6,
              }}>
              Name : {this.props.showContactDetail.name}
            </Text>
            {/* GET USER DETAILS THROUGH ID/PHONE NUMBER */}
            <Text
              style={{
                color: COLOR.white,
                fontSize: 20,
                textAlign: 'center',
                paddingVertical: 6,
              }}>
              E-mail : {this.props.showContactDetail.email}
            </Text>
            <Text
              style={{
                color: COLOR.white,
                fontSize: 20,
                textAlign: 'center',
                paddingVertical: 6,
              }}>
              Phone : {this.props.showContactDetail.phone}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 12,
              }}>
              <TouchableOpacity
                onPress={this.props.onChatPress}
                style={{
                  width: '45%',
                  backgroundColor: COLOR.primary,
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>GO TO CHAT!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.props.onCancelPress}
                style={{
                  width: '45%',
                  backgroundColor: COLOR.primary,
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animatable.View>
    );
  }
}
