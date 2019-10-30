import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Clipboard,
  Alert,
  Share,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {Header, Button, SnackBar} from '../../components';
import {referAndEarnBanner, referAndEarnBannerWebp} from '../../assets';
import {appConstants} from '../../constants/appConstants';
import {COLOR} from '../../config/color';
import Toast, {DURATION} from 'react-native-easy-toast';

const W = appConstants.screenWidth,
  H = appConstants.screenHeight;
export class ReferAndEarn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      referralCode: 'MsgMe56',
      showNotificationSnackBar: false,
    };
  }

  copyToClipBoard = async () => {
    await Clipboard.setString(this.state.referralCode);
    this.refs.toast.show('Copied to clipboard!');
    //To read from clipboard
    // const referralCode = await Clipboard.getString();
  };

  handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Sample Share Intent for testing!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('shared with activity type of result.activityType');
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleRightButton = () => {
    this.setState({
      showNotificationSnackBar: !this.state.showNotificationSnackBar,
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Header
          headerText="Refer And Earn"
          onBackPress={() => this.props.navigation.goBack()}
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
        <Image
          source={
            Platform.OS === 'ios' ? referAndEarnBanner : referAndEarnBannerWebp
          }
          style={{width: W, height: H / 4}}
          resizeMode="cover"
        />
        <View style={{flex: 1, marginHorizontal: 12}}>
          <View style={{marginTop: 12}}>
            <View style={{padding: 16}}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Invite your friend to MessageMe App
              </Text>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                and both of you will get voucher
              </Text>
              <Text style={{textAlign: 'center', fontSize: 18}}>Rs. 30</Text>
            </View>
          </View>
          <Text style={{fontSize: 16, textAlign: 'center', marginTop: 20}}>
            Share your referral code
          </Text>
          <View style={{flexDirection: 'row', marginTop: 36}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                backgroundColor: '#F7F6F7',
                padding: 8,
                width: '70%',
              }}>
              {this.state.referralCode}
            </Text>
            <TouchableOpacity
              onPress={() => this.copyToClipBoard()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
                backgroundColor: COLOR.primary,
                width: '30%',
              }}>
              <Text
                style={{fontSize: 16, color: COLOR.white, fontWeight: 'bold'}}>
                Copy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Button buttonText="Share" onPress={() => this.handleShare()} />
        <Toast
          ref="toast"
          opacity={0.8}
          fadeInDuration={750}
          fadeOutDuration={1000}
        />
      </View>
    );
  }
}
