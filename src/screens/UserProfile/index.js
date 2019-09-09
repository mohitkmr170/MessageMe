import React from 'react';
import {View, Text, ActivityIndicator, Image, Dimensions} from 'react-native';
import {Header} from '../../components';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../../config/color';

const W = Dimensions.get('window').width / 2;
export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currUserDetails: null,
    };
  }

  componentDidMount = () => {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', snap => {
        this.setState({currUserDetails: snap.val()});
      });
  };

  handleBackButton = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          headerText="Profile"
          onBackPress={() => this.handleBackButton()}
        />
        {this.state.currUserDetails ? (
          <View style={{flex: 1, margin: 20}}>
            <Image
              source={{
                uri:
                  'https://previews.123rf.com/images/triken/triken1608/triken160800028/61320729-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg',
              }}
              style={{
                height: W,
                width: W,
                borderRadius: W / 2,
                alignSelf: 'center',
              }}
            />

            <View style={{flexDirection: 'row', marginTop: 12}}>
              <Icon name="user" size={24} />
              <View style={{marginLeft: 12}}>
                <Text style={{fontSize: 16, color: COLOR.grayMain}}>Name</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 18, width: '85%'}}>
                    {this.state.currUserDetails.name}
                  </Text>
                  <Icon
                    name="pencil"
                    size={18}
                    color={COLOR.grayMain}
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                  />
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 12}}>
              <Icon name="phone" size={24} />
              <View style={{marginLeft: 12}}>
                <Text style={{fontSize: 16, color: COLOR.grayMain}}>Phone</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 18, width: '85%'}}>
                    {this.state.currUserDetails.phone}
                  </Text>
                  <Icon
                    name="pencil"
                    size={18}
                    color={COLOR.grayMain}
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                  />
                </View>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 12}}>
              <Icons name="mail" size={24} />
              <View style={{marginLeft: 12}}>
                <Text style={{fontSize: 16, color: COLOR.grayMain}}>Email</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 18, width: '85%'}}>
                    {this.state.currUserDetails.email}
                  </Text>
                  <Icon
                    name="pencil"
                    size={18}
                    color={COLOR.grayMain}
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                  />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={COLOR.primary} />
          </View>
        )}
      </View>
    );
  }
}
