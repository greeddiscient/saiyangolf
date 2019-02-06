import { AsyncStorage, Alert } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import Function from '../utilities/Function';
import Header from './Header';
import moment from 'moment';

const protocol = "https:"
const baseUrl = "https://saiyan-api-v2.herokuapp.com"

async function Login(email, password) {
  var response = null
  await RNFetchBlob.fetch('POST', baseUrl + '/api/users/login', {
    'Content-Type': 'application/json',
  }, JSON.stringify({
    email: email,
    password: password,
  }))
    // when response status code is 200
    .then((res) => {
      let text = res.text();
      let json = res.json();

      if (res.info().status < 300) {
        if (json['errors'] == null) {
          var data = json
          AsyncStorage.setItem('@saiyanGolfStore:tokens', json['token']);
          response = data
        }else{
          setTimeout(() => Alert.alert('error', json.errors.user), 100);
          response = null;
        }
      }
      else {
        setTimeout(() => Alert.alert('error', json.errors.user), 100);
        response = null;
      }
    })
    // Status code is not 200
    .catch((errorMessage, statusCode) => {
      // error handling
      if (errorMessage == null || errorMessage == '') {
        setTimeout(() => Alert.alert(
          'Failed',
          'Something wrong. Please try again',
          [
            { text: 'Ok' },
          ]
        ), 100);
        response = null;
      }
      else {
        setTimeout(() => Alert.alert(
          'Failed',
          'No Internet Connection',
          // errorMessage.toString(),
          [
            { text: 'Ok' },
          ]
        ), 100);
        response = null;
      }
    })

  return response;
}

export default {
  protocol,
  baseUrl,
  Login,
}
