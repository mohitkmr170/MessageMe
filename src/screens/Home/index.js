import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import firebase from 'react-native-firebase';
import {Header} from '../../components';
import {COLOR} from '../../config/color';
import {appConstants} from '../../constants/appConstants';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
          <TouchableOpacity onPress={() => Alert.alert('Image')}>
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
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header headerText="Home" onBackPress={() => this.handleBackButton()} />
        <View style={{flex: 1}}>
          <FlatList
            data={this.state.users}
            extraData={this.state.users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => this.returnItem(item, index)}
          />
        </View>
      </View>
    );
  }
}
