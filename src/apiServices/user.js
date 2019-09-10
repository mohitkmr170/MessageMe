import firebase from 'react-native-firebase';
import {get} from 'lodash';

export function getUser(data) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref('/users/' + data.userId)
      .once('value', snap => {
        resolve(snap.val() || null);
      })
      .catch(err => reject(err));
  });
}
