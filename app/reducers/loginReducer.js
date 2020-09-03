/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isLoggedIn: false,
  username: '',
  password: '',
  loginError: '',
  tokenExists: false,
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      username: action.username,
      password: action.password,
    };
  },
  [types.LOGIN_LOADING_ENDED](state) {
    return { ...state };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      isLoggedIn: true,
      loginError: '',
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.LOGIN_ERROR](state) {
    return {
      ...state,
      isLoggedIn: false,
      loginError: 'Invalid Credentials',
    };
  },
  ['TOKEN_EXISTS'](state) {
    console.log('Asdas');
    return {
      ...state,
      tokenExists: true,
    };
  },
  ['TOKEN_NOT_EXISTS'](state) {
    console.log('asd');
    return {
      ...state,
      tokenExists: false,
    };
  },
});
