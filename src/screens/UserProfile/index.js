import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Header, SnackBar} from '../../components';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/AntDesign';
import {COLOR} from '../../config/color';
import {connect} from 'react-redux';
import {getUser} from '../../store/reducers';
import {get} from 'lodash';
import {appConstants} from '../../constants/appConstants';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';

const W = appConstants.screenWidth / 2;
class UnconnectedUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showNotificationSnackBar: false,
    };
  }

  UNSAFE_componentWillMount = async () => {
    const {getUser} = this.props;
    const body = {
      userId: firebase.auth().currentUser.uid,
    };
    await getUser(body);
    this.setState({loading: false});
  };

  handleBackButton = () => {
    this.props.navigation.goBack();
  };

  handleRightButton = () => {
    this.setState({
      showNotificationSnackBar: !this.state.showNotificationSnackBar,
    });
  };

  render() {
    const {getUserResponse} = this.props;
    return (
      <View style={{flex: 1}}>
        <Header
          headerText="Profile"
          onBackPress={() => this.handleBackButton()}
          handleRightButton={() => this.handleRightButton()}
        />
        {this.state.showNotificationSnackBar && (
          <View
            style={{
              zIndex: 1,
              flex: 1,
              position: 'absolute',
              top: 52,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: COLOR.transparent,
            }}>
            <SnackBar
              clearNotification={() =>
                this.setState({showNotificationSnackBar: false})
              }
            />
          </View>
        )}
        <KeyboardAwareView animated={true}>
          <ScrollView>
            {!this.state.loading ? (
              <View style={{flex: 1, margin: 20}}>
                <Image
                  source={{
                    uri: appConstants.defaultProfileImage,
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
                    <Text style={{fontSize: 16, color: COLOR.grayMain}}>
                      Name
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 18, width: '85%'}}>
                        {get(getUserResponse, 'name', 'NA')}
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
                    <Text style={{fontSize: 16, color: COLOR.grayMain}}>
                      Phone
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 18, width: '85%'}}>
                        {get(getUserResponse, 'phone', 'NA')}
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
                    <Text style={{fontSize: 16, color: COLOR.grayMain}}>
                      Email
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 18, width: '85%'}}>
                        {get(getUserResponse, 'email', 'NA')}
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
          </ScrollView>
        </KeyboardAwareView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getUserResponse: state.getUser.response,
});
const bindActions = dispatch => ({
  getUser: data => dispatch(getUser.fetchCall(data)),
});

export const UserProfile = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedUserProfile);
