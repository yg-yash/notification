/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call, select, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';

import * as loginActions from 'app/actions/loginActions';

import axios from 'axios';
import * as types from 'app/actions/types';

function loginUser(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('pwd', password);
  return axios({
    url: 'https://api.crmbabu.com/login',
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
    },
  });
}

// Our worker Saga that logins the user
function* loginAsync(action) {
  yield put(loginActions.enableLoader());
  //how to call api

  const response = yield call(loginUser, action.username, action.password);
  //mock response
  // const response = { success: true, data: { id: 1 } };

  if (response.data.SUCCESS) {
    // yield call(navigationActions.navigateToHome);
    //yield put(loginActions.tokenExists());
    yield put(loginActions.onLoginResponse(response.data));
    yield put(loginActions.disableLoader({}));
    yield call(storeToken, response.data.SUCCESS);
    // yield put(loginActions.addToken())
    // no need to call navigate as this is handled by redux store with SwitchNavigator
  } else {
    yield put(loginActions.loginFailed());
    yield put(loginActions.disableLoader({}));
    if (response.data.ERROR) {
      yield put(loginActions.loginError('Invalid Credentials'));
      return;
    } else {
      yield put(loginActions.loginError('Something went wrong'));
      return;
    }

    // setTimeout(() => {
    //   Alert.alert('BoilerPlate', response.Message);
    // }, 200);
  }
}

function storeToken(token) {
  console.log(token);
  AsyncStorage.setItem('token', token);
}

export default function* login() {
  yield takeEvery(types.LOGIN_REQUEST, loginAsync);
}
