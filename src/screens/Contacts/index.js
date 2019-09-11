import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {Header, Button} from '../../components';
import Contacts from 'react-native-contacts';
import {COLOR} from '../../config/color';
import {get} from 'lodash';
import {connect} from 'react-redux';
import {getContacts} from '../../store/reducers/index';
import * as Animatable from 'react-native-animatable';
import {appConstants} from '../../constants/appConstants';
import {ContactDetail} from './ContactDetails';

const W = appConstants.screenWidth;
class UnconnectedContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [],
      loading: true,
      showContactDetail: null,
    };
  }

  componentDidMount = async () => {
    const {getContacts} = this.props;
    await getContacts();
    const {getContactsResponse} = this.props;
    if (get(getContactsResponse, 'data', null)) {
      this.setState({loading: false});
    }
  };

  renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => this.setState({showContactDetail: item})}
        style={{
          margin: 12,
          flexDirection: 'row',
          borderColor: '#F7F6F7',
          borderWidth: 2,
          borderRadius: 8,
          padding: 8,
        }}>
        <Image
          source={{uri: appConstants.defaultProfileImage}}
          style={{height: 52, width: 52, borderRadius: 26}}
        />
        <Text style={{alignSelf: 'center', marginLeft: 8, fontSize: 18}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  onChatPress = () => {
    this.setState({showContactDetail: false});
    this.props.navigation.navigate('ChatScreen', {
      name: this.state.showContactDetail.name,
      uid: this.state.showContactDetail.uid,
    });
  };

  onCancelPress = () => {
    this.setState({showContactDetail: false});
  };

  render() {
    const {getContactsResponse} = this.props;
    const contacts = get(getContactsResponse, 'data', []);
    return (
      <View style={styles.mainContainer}>
        <Header
          headerText="Select Contact"
          search={true}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 24,
            marginTop: 12,
            color: COLOR.grayMain,
            marginBottom: 8,
          }}>
          Contacts on MessageMe!
        </Text>
        {!this.state.loaded && contacts ? (
          <ScrollView
            contentContainerStyle={{
              flex: 1,
            }}>
            {contacts.map((item, index) => this.renderItem(item, index))}
          </ScrollView>
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 14}}>
              Syncing with your local contact list!
            </Text>
            <ActivityIndicator size="large" color={COLOR.primary} />
          </View>
        )}
        {this.state.showContactDetail && (
          <ContactDetail
            showContactDetail={this.state.showContactDetail}
            onChatPress={() => this.onChatPress()}
            onCancelPress={() => this.onCancelPress()}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getContactsResponse: state.getContacts,
});

const bindActions = dispatch => ({
  getContacts: data => dispatch(getContacts.saveCall(data)),
});

export const Contact = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedContact);
