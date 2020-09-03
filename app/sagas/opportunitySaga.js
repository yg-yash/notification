import { put, call, takeEvery } from 'redux-saga/effects';

import AsyncStorage from '@react-native-community/async-storage';
import * as opportunityActions from 'app/actions/opportunityActions';
import axios from 'axios';
import * as types from 'app/actions/types';

function getOpportunities(token) {
  return axios({
    url: 'https://api.crmbabu.com/opportunities',
    method: 'GET',
    headers: {
      'access-token': token,
    },
  });
}

function getSingleOpportunity(token, id) {
  return axios({
    url: `https://api.crmbabu.com/opportunity/${id}`,
    method: 'GET',
    headers: {
      'access-token': token,
    },
  });
}

function changeStatusApi(token, data) {
  const formData = new FormData();
  formData.append('type', data.typeValue);
  formData.append('status', data.statusValue);
  formData.append('comment', data.textValue);
  return axios({
    url: `http://api.crmbabu.com/staus/${data.id}`,
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'access-token': token,
    },
  });
}

function* opportunitiesAsync() {
  yield put(opportunityActions.enableLoader());

  const token = yield call(getToken);

  const response = yield call(getOpportunities, token);
  if (response.data.SUCCESS === 'ZERO RECORDS') {
    yield put(opportunityActions.onOpportunitiesFetchResponse([]));
    yield put(opportunityActions.disableLoader({}));
    return;
  }

  if (response.data.ERROR) {
    yield put(opportunityActions.opportunityFetchFailed());
    yield put(opportunityActions.disableLoader({}));
    yield put(opportunityActions.opportunityFetchError('Something went wrong'));
    return;
  }

  yield put(opportunityActions.onOpportunitiesFetchResponse(response.data));
  yield put(opportunityActions.disableLoader({}));
}

function* opportunityAsync(action) {
  yield put(opportunityActions.enableSingleOpportunityLoader());

  const token = yield call(getToken);

  const response = yield call(getSingleOpportunity, token, action.payload);

  if (response.data.ERROR) {
    yield put(opportunityActions.singleOpportunityFetchFailed());
    yield put(opportunityActions.disbaleSingleOpportunityLoader({}));
    yield put(
      opportunityActions.singleOpportunityFetchError('Something went wrong'),
    );
    return;
  }

  yield put(opportunityActions.onSingleOpportunityFetchResponse(response.data));
  yield put(opportunityActions.disbaleSingleOpportunityLoader());
}

function* changeStatusAsync(data) {
  yield put(opportunityActions.changeStatusEnableLoader());
  try {
    const token = yield call(getToken);
    const response = yield call(changeStatusApi, token, data.payload);

    if (response.data.ERROR) {
      yield put(opportunityActions.changeStatusDisableLoader());
      yield put(opportunityActions.changeStatusError('Something went wrong'));
      return;
    }
    yield put(opportunityActions.changeStatusDisableLoader());
    yield put(opportunityActions.changeStatusResponse(response.data.SUCCESS));
    yield put(
      opportunityActions.requestSingleOpportunityFetch(data.payload.id),
    );
  } catch (error) {
    yield put(opportunityActions.changeStatusDisableLoader());
    yield put(opportunityActions.changeStatusError('Something went wrong'));
  }
}

function getToken() {
  return AsyncStorage.getItem('token');
}

export function* opportunitiesFetch() {
  yield takeEvery(types.FETCH_OPPORTUNITIES_REQUEST, opportunitiesAsync);
}

export function* opportunitySingleFetch() {
  yield takeEvery(types.OPPORTUNITY_FETCH_SINGLE_REQUEST, opportunityAsync);
}

export function* changeStatus() {
  yield takeEvery(types.CHANGE_STATUS_REQUEST, changeStatusAsync);
}
