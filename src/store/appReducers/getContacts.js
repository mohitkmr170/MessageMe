import {values, get} from 'lodash';
import {AppStoreData} from './base';
import Contacts from 'react-native-contacts';
import firebase from 'react-native-firebase';
import {parsePhoneNumberFromString} from 'libphonenumber-js';

var arraySort = require('array-sort');

class GetContacts extends AppStoreData {
  constructor() {
    super('getContacts');
  }

  getPhoneNumber = phone => {
    let phoneNumber = parsePhoneNumberFromString(phone, 'IN');
    return get(phoneNumber, 'number', null);
  };

  saveCall(data) {
    const that = this;
    let error = false;
    return dispatch => {
      Contacts.getAll((err, contacts) => {
        firebase
          .database()
          .ref('users/')
          .once('value', snap => {
            let contactList = [];
            // Convert onject into array based on Key
            Object.keys(snap.val()).forEach(key => {
              contacts.map((item, index) => {
                const phoneNumber = this.getPhoneNumber(
                  get(item, 'phoneNumbers[0].number', null),
                );
                if (phoneNumber === get(snap.val()[key], 'phone', null)) {
                  contactList.push(snap.val()[key]);
                }
                if (contacts.length - 1 === index) {
                  arraySort(contactList, 'name');
                  dispatch(that.actions.save(contactList));
                }
              });
            });
          });
      });
    };
  }
}

export const getContacts = new GetContacts();
