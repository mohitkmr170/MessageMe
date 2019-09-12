import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import firebase from 'react-native-firebase';
import {Header, SnackBar} from '../../components';
import {COLOR} from '../../config/color';
import * as Animatable from 'react-native-animatable';
import {appConstants} from '../../constants/appConstants';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const W = appConstants.screenWidth / 2;
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      imageView: false,
      showNotificationSnackBar: false,
    };
  }

  componentDidMount = () => {
    firebase
      .database()
      .ref('users/')
      .on('value', snap => {
        let userArray = [];
        //Convert onject into array based on Key
        Object.keys(snap.val()).forEach(key => {
          if (key !== firebase.auth().currentUser.uid)
            userArray.push(snap.val()[key]);
        });
        this.setState({users: userArray});
      });
  };

  handleBackButton = () => {
    this.props.navigation.openDrawer();
  };

  returnItem = (item, index) => {
    return (
      <Animatable.View
        ref={ref => (this.view = ref)}
        animation={index % 2 === 0 ? 'bounceInLeft' : 'bounceInRight'}
        duration={1000}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('ChatScreen', {
              name: item.name,
              uid: item.uid,
            })
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
          }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({imageView: true});
              }}>
              <Image
                source={{
                  uri: appConstants.defaultProfileImage,
                }}
                style={{height: 48, width: 48, borderRadius: 24}}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 8,
                marginTop: 4,
              }}>
              <Text style={{fontSize: 18}}>{item.name}</Text>
              <Text>Last message!</Text>
            </View>
          </View>
          <View style={{marginTop: 4}}>
            <Text>10:08 pm</Text>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: COLOR.light_voilet,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginTop: 4,
              }}>
              <Text>4</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  handleRightButton = () => {
    this.setState({
      showNotificationSnackBar: !this.state.showNotificationSnackBar,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          headerText="Home"
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
        <View style={{flex: 1}}>
          {this.state.imageView && (
            <Animatable.View
              ref={ref => (this.view = ref)}
              animation="fadeIn"
              easing="ease-in-circ"
              duration={300}
              style={styles.overayImage}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({imageView: false});
                }}>
                <TouchableWithoutFeedback>
                  <Image
                    source={{
                      uri: appConstants.defaultProfileImage,
                    }}
                    style={{height: W, width: W, borderRadius: W / 2}}
                  />
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </Animatable.View>
          )}
          <FlatList
            data={this.state.users}
            extraData={this.state.users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => this.returnItem(item, index)}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ContactScreen')}
          style={styles.contactIconContainer}>
          <Icon name="contacts" size={24} color={COLOR.white} />
        </TouchableOpacity>
      </View>
    );
  }
}
