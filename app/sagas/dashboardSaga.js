import { put, call, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import * as dashboardActions from 'app/actions/dashboardActions';
import axios from 'axios';
import * as types from 'app/actions/types';

function getLeadsCount(token) {
  return axios({
    url: 'http://api.crmbabu.com/leadcount',
    method: 'GET',
    headers: {
      'access-token': token,
    },
  });
}
function getOpportunitiesCount(token) {
  return axios({
    url: 'http://api.crmbabu.com/oppcount',
    method: 'GET',
    headers: {
      'access-token': token,
    },
  });
}
function getHeader(token) {
  return axios({
    url: 'http://api.crmbabu.com/settings',
    method: 'GET',
    headers: {
      'access-token': token,
    },
  });
}

function* leadsCountAsync() {
  yield put(dashboardActions.enableLoader());

  try {
    const token = yield call(getToken);
    const response = yield call(getLeadsCount, token);

    if (response.data.ERROR) {
      yield put(dashboardActions.getLeadsCountFailed());
      yield put(dashboardActions.disableLoader());
      yield put(dashboardActions.getLeadsCountError('Something went wrong'));
    } else {
      yield put(
        dashboardActions.getLeadsCountResponse(response.data.LEADS_COUNT),
      );
      yield put(dashboardActions.disableLoader({}));
    }
  } catch (error) {
    yield put(dashboardActions.getLeadsCountFailed());
    yield put(dashboardActions.disableLoader());
    yield put(dashboardActions.getLeadsCountError('Something went wrong'));
  }
}
function* opportunitiesCountAsync() {
  yield put(dashboardActions.opportunitiesEnableLoader());

  const token = yield call(getToken);

  const response = yield call(getOpportunitiesCount, token);

  if (response.data.ERROR) {
    yield put(dashboardActions.getOpportunitiesCountFailed());
    yield put(dashboardActions.opportunitiesDisableLoader({}));
    yield put(dashboardActions.getOpportunitiesCountError());
  } else {
    yield put(
      dashboardActions.getOpportunitiesCountResponse(
        response.data.OPPORTUNITY_COUNT,
      ),
    );
    yield put(dashboardActions.opportunitiesDisableLoader({}));
  }
}

function* getHederAsync() {
  yield put(dashboardActions.dashboardHeaderEnableLoader());

  const token = yield call(getToken);

  const response = yield call(getHeader, token);

  if (response.data.ERROR) {
    yield put(dashboardActions.dashboardHeaderDisableLoader({}));
    yield put(dashboardActions.getDashboardHeaderError());
    return;
  }
  yield put(dashboardActions.getDashboardHeaderResponse(response.data));
  yield put(dashboardActions.dashboardHeaderDisableLoader({}));
}

function getToken() {
  return AsyncStorage.getItem('token');
}

export function* leadsCountFetch() {
  yield takeEvery(types.GET_LEADS_COUNT_REQUEST, leadsCountAsync);
}

export function* opportunitiesCountFetch() {
  yield takeEvery(
    types.GET_OPPORTUNITIES_COUNT_REQUEST,
    opportunitiesCountAsync,
  );
}
export function* dashboardHeaderFetch() {
  yield takeEvery(types.GET_DASHBOARD_HEADER_REQUEST, getHederAsync);
}
