import { AsyncStorage, Alert } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import Function from '../utilities/Function';
import Header from './Header';
import moment from 'moment';
import axios from 'axios';

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
        } else {
          setTimeout(() => Alert.alert('error', json.errors.user), 100);
          response = null;
        }
      }
      else {
        console.log('error login..., ' + JSON.stringify(json))
        console.log('status login, ' + res.info().status)
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

async function Register(data) {
  var response = null;
  await RNFetchBlob.fetch(
    'POST',
    baseUrl + '/api/users/register',
    Header.getHeaderNoToken(),

    JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }))
    // when response status code is 200
    .then((res) => {
      let text = res.text();
      let json = res.json();

      if (res.info().status < 300) {
        if (json.success == true) {
          // AsyncStorage.setItem('@saiyanGolfStore:register', json);
          AsyncStorage.setItem('@saiyanGolfStore:tokens', json['token']);
          response = 'registered';
        } else {
          setTimeout(() => Alert.alert('Info', json.errors.users), 100);
          response = null;
        }
      }
      else {
        if (json.success == true) {
          setTimeout(() => Alert.alert('Info', json.errors.users), 100);
          response = null;
        } else {
          setTimeout(() => Alert.alert('Info', json.errors.users), 100);
          response = null;
        }
      }
    })
    // Status code is not 200
    .catch((errorMessage, statusCode) => {
      // error handling
      console.log('errors register' + errorMessage + statusCode);
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
          errorMessage.toString(),
          [
            { text: 'Ok' },
          ]
        ), 100);
        response = null;
      }
    })

  return response;
}

async function getDataRoundHistory() {
  var response = null;
  var token = null;

  await AsyncStorage.getItem('@saiyanGolfStore:tokens', (err, result) => {
    if (result != null) {
      token = result;
    }
  });

  if (token != null && token != "") {
    await RNFetchBlob.fetch(
      'GET',
      baseUrl + '/api/rounds/',
      Header.getHeaderToken(token)
    )
      .then((res) => {
        // the following conversions are done in js, it's SYNC
        let text = res.text()
        let json = res.json()

        if (res.info().status < 300) {
          if (json.success == true) {
            var data = json['data'];
            AsyncStorage.setItem('@saiyanGolfStore:roundHistory', JSON.stringify(data));
            response = data;
          } else {
            response = null
          }
        }
        else {
          response = null
        }
      })
      // Status code is not 200
      .catch((errorMessage, statusCode) => {
        // error handling
        response = null;
      })

    return response
  }
}

async function sendRound(dataPost) {
  var responseData = null;
  var token = null;

  await AsyncStorage.getItem('@saiyanGolfStore:tokens', (err, result) => {
    if (result != null) {
      token = result;
    }
  });

  if (token != null && token != "") {
    await RNFetchBlob.fetch(
      'POST', baseUrl + '/api/rounds/', {
        'Authorization': token,
        'Content-Type': 'application/json'
      }, JSON.stringify(dataPost))
      .then((res) => {
        let text = res.text();
        let json = res.json();

        if (res.info().status < 300) {
          responseData = 'dataSend'
        } else {
          setTimeout(() => Alert.alert('error', json), 100);
          responseData = null
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
          responseData = null;
        }
        else {
          setTimeout(() => Alert.alert(
            'Failed',
            errorMessage.toString(),
            [
              { text: 'Ok' },
            ]
          ), 100);
          responseData = null;
        }
      })

    return responseData;
  }
}

async function getCurrentUser() {
  var responseData = null;
  var token = null;

  await AsyncStorage.getItem('@saiyanGolfStore:tokens', (err, result) => {
    if (result != null) {
      token = result;
    }
  });

  console.log('token current user, ' + token)
  if (token != null && token != "") {
    await fetch(baseUrl + "/api/users/current", {
      method: 'GET',
      headers: Header.getHeaderToken(token)
    })
      .then((response) => {
        // the following conversions are done in js, it's SYNC
        let text = response.text()

        if (response.status < 300) {
          let json = response.json()
          var data = json;
          AsyncStorage.setItem('@saiyanGolfStore:dataUser', JSON.stringify(data));
          responseData = 'dataUser';
        }
        else {
          responseData = 'noData'
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
          responseData = null;
        }
        else {
          setTimeout(() => Alert.alert(
            'Failed',
            errorMessage.toString(),
            [
              { text: 'Ok' },
            ]
          ), 100);
          responseData = null;
        }
      })

    return responseData
  }
}

async function getListDetailDrill(data) {
  var response = null;
  var token = null;

  await AsyncStorage.getItem('@saiyanGolfStore:tokens', (err, result) => {
    if (result != null) {
      token = result;
    }
  });

  if (token != null && token != "") {
    await RNFetchBlob.fetch(
      'GET',
      baseUrl + '/api/drills/summary?drillId=' + data.drillId,
      Header.getHeaderToken(token)
    )
      .then((res) => {
        // the following conversions are done in js, it's SYNC
        let text = res.text()
        let json = res.json()

        if (res.info().status < 300) {
          if (json.success == true) {
            var data = json['data'];
            AsyncStorage.setItem('@saiyanGolfStore:listDetailDrill', JSON.stringify(data));
            response = data;
          } else {
            response = null
          }
        }
        else {
          response = null
        }
      })
      // Status code is not 200
      .catch((errorMessage, statusCode) => {
        // error handling
        console.log('errors register' + errorMessage + statusCode);
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
            errorMessage.toString(),
            [
              { text: 'Ok' },
            ]
          ), 100);
          response = null;
        }
      })

    return response
  }
}

async function sendScore(data) {
  var responseData = null;
  var token = null;

  await AsyncStorage.getItem('@saiyanGolfStore:tokens', (err, result) => {
    if (result != null) {
      token = result;
    }
  });

  await RNFetchBlob.fetch(
    'POST',
    baseUrl + '/api/drills',
    Header.getHeaderGeneral(token),

    JSON.stringify({
      drillId: data.drillId,
      typeId: data.typeId,
      score: data.score,
    }))
    // when response status code is 200
    .then((res) => {
      let text = res.text();
      let json = res.json();

      if (res.info().status < 300) {
        if (json.success == true) {
          responseData = 'postScore'
        } else {
          setTimeout(() => Alert.alert('error', json), 100);
          responseData = null;
        }
      }
      else {
        if (json.success == true) {
          setTimeout(() => Alert.alert('error', json), 100);
          responseData = null;
        } else {
          setTimeout(() => Alert.alert('error', JSON.stringify(json)), 100);
          responseData = null;
        }
      }
    })
    // Status code is not 200
    .catch((errorMessage, statusCode) => {
      // error handling
      console.log('errors register' + errorMessage + statusCode);
      if (errorMessage == null || errorMessage == '') {
        setTimeout(() => Alert.alert(
          'Failed',
          'Something wrong. Please try again',
          [
            { text: 'Ok' },
          ]
        ), 100);
        responseData = null;
      }
      else {
        setTimeout(() => Alert.alert(
          'Failed',
          errorMessage.toString(),
          [
            { text: 'Ok' },
          ]
        ), 100);
        responseData = null;
      }
    })

  return responseData;
}

async function getHistoryDrill(data) {
  var responseData = null;
  var token = null;

  await AsyncStorage.getItem('@saiyanGolfStore:tokens', (err, result) => {
    if (result != null) {
      token = result;
    }
  });

  console.log('data history drill send, ' + JSON.stringify(data))
  await RNFetchBlob.fetch(
    'GET',
    baseUrl + '/api/drills?drillId=' + data.drillId + '&typeId=' + data.typeId + '&page=' + data.page + '&limit=' + data.limit,
    Header.getHeaderToken(token),
  )
    // when response status code is 200
    .then((res) => {
      let text = res.text();
      let json = res.json();

      if (res.info().status < 300) {
        if (json.success == true) {
          var data = json;
          AsyncStorage.setItem('@saiyanGolfStore:historyDrillType', JSON.stringify(data.data));
          response = data;
        } else {
          setTimeout(() => Alert.alert('error', json), 100);
          response = null;
        }
      }
      else {
        if (json.success == true) {
          setTimeout(() => Alert.alert('error', json), 100);
          response = null;
        } else {
          setTimeout(() => Alert.alert('error', JSON.stringify(json)), 100);
          response = null;
        }
      }
    })
    // Status code is not 200
    .catch((errorMessage, statusCode) => {
      // error handling
      console.log('errors register' + errorMessage + statusCode);
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
          errorMessage.toString(),
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
  Register,
  Login,
  getDataRoundHistory,
  sendRound,
  getCurrentUser,
  getListDetailDrill,
  sendScore,
  getHistoryDrill
}
