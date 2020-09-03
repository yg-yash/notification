/*
 * Reducer actions related with login
 */
import * as types from './types';
import AsyncStorage from '@react-native-community/async-storage';

export function requestLogin(username, password) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function logOut() {
  clearToken();
  tokenNotExists();
  return {
    type: types.LOG_OUT,
  };
}

export function loginError() {
  return {
    type: types.LOGIN_ERROR,
  };
}

export function tokenExists() {
  return {
    type: 'TOKEN_EXISTS',
  };
}
export function tokenNotExists() {
  return {
    type: 'TOKEN_NOT_EXISTS',
  };
}

async function clearToken() {
  const token = await AsyncStorage.removeItem('token');
  console.log(token);
}
