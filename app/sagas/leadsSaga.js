import { put, call, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import * as leadsActions from 'app/actions/leadsActions';
import * as dashboardActions from 'app/actions/dashboardActions';
import * as opportunityActions from 'app/actions/opportunityActions';
import axios from 'axios';
import * as types from 'app/actions/types';
import * as navigationService from '../navigation/NavigationService';

function getLeads(token) {
  return axios({
    url: 'https://api.crmbabu.com/leads',
    method: 'GET',
    headers: {
      'access-token': token,
    },
  });
}

function getSingleLead(token, id) {
  return axios({
    url: `https://api.crmbabu.com/lead/${id}`,
    method: 'GET',
    headers: {
      'access-token': token,
    },
  });
}

function getDropdownList(token) {
  return axios({
    url: 'http://api.crmbabu.com/opstatus/6',
    method: 'GET',
    headers: {
      'access-token': token,
    },
  });
}

function addLeadApi(token, data) {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('compname', data.compname);
  formData.append('cname', data.cname);
  formData.append('mobileno', data.mobileno);
  formData.append('emailid', data.emailid);
  formData.append('priority', data.priority);
  formData.append('notes', data.notes);
  return axios({
    url: 'http://api.crmbabu.com/al',
    method: 'POST',
    data: formData,
    headers: {
      Accept: 'application/json',
      'access-token': token,
    },
  });
}

function changeToCustomerApi(token, leadId) {
  return axios({
    url: `http://api.crmbabu.com/convert/c${leadId}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'access-token': token,
    },
  });
}
function changeToQuotationApi(token, leadId) {
  return axios({
    url: `http://api.crmbabu.com/convert/q${leadId}`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'access-token': token,
    },
  });
}

function* leadsAsync() {
  yield put(leadsActions.enableLoader());

  const token = yield call(getToken);

  const response = yield call(getLeads, token);
  if (response.data.SUCCESS === 'ZERO RECORDS') {
    yield put(leadsActions.onLeadsFetchResponse([]));
    yield put(leadsActions.disableLoader({}));
    return;
  }

  if (response.data.ERROR) {
    yield put(leadsActions.leadsFetchFailed());
    yield put(leadsActions.disableLoader({}));
    yield put(leadsActions.leadsFetchError('Something went wrong'));
    return;
  }

  yield put(leadsActions.onLeadsFetchResponse(response.data));
  yield put(leadsActions.disableLoader({}));
}

function* leadSingleAsync(action) {
  yield put(leadsActions.enableSingleLeadLoader());

  const token = yield call(getToken);

  const response = yield call(getSingleLead, token, action.payload);

  if (response.data.ERROR) {
    yield put(leadsActions.singleLeadFetchFailed());
    yield put(leadsActions.disbaleSingleLeadLoader({}));
    yield put(leadsActions.singleLeadFetchError('Something went wrong'));
    return;
  }

  yield put(leadsActions.onSingleLeadFetchResponse(response.data));
  yield put(leadsActions.disbaleSingleLeadLoader());
}

function* leadsDropDownAsync() {
  yield put(leadsActions.dropdownEnableLoader());
  const token = yield call(getToken);
  const response = yield call(getDropdownList, token);
  console.log(response.data);
  if (response.data.ERROR) {
    yield put(leadsActions.dropdownDisableLoader({}));
    yield put(leadsActions.errorLeadsDropdown('Something went wrong'));
    return;
  }
  yield put(leadsActions.onLeadsDropdownResponse(response.data));
  yield put(leadsActions.dropdownDisableLoader());
}

function* addLeadAsync(data) {
  yield put(leadsActions.addLeadsEnableLoader());
  const token = yield call(getToken);
  const response = yield call(addLeadApi, token, data.payload);

  if (response.data.ERROR) {
    yield put(leadsActions.addLeadsDisableLoader({}));
    yield put(leadsActions.addLeadsError('Something went wrong'));
    return;
  }
  yield put(dashboardActions.addLeadsCount());
  yield put(leadsActions.onAddLeadsResponse());
  yield put(leadsActions.addLeadsDisableLoader());
  yield put(leadsActions.requestLeadsFetch());
  yield call(navigationService.default.goBack);
}

function* changeToCustomerAsync(data) {
  yield put(leadsActions.changeToCustomerEnableLoader());
  const token = yield call(getToken);
  const response = yield call(changeToCustomerApi, token, data.leadId);
  if (response.data.ERROR) {
    yield put(leadsActions.changeToCustomerDisableLoader());
    yield put(leadsActions.changeToCustomerError('Change To Customer Failed'));
    return;
  }
  yield put(leadsActions.changeToCustomerDisableLoader());
  yield put(leadsActions.changeToCustomerResponse(data.leadId));
  yield put(dashboardActions.subtractLeadsCount());

  yield call(navigationService.default.goBack);
}
function* changeToQuotationAsync(data) {
  yield put(leadsActions.changeToQuotationEnableLoader());
  const token = yield call(getToken);
  const response = yield call(changeToQuotationApi, token, data.leadId);

  if (response.data.ERROR) {
    yield put(leadsActions.changeToQuotationDisableLoader());
    yield put(
      leadsActions.changeToQuotationError('Change To Quotation Failed'),
    );
    return;
  }
  yield put(leadsActions.changeToQuotationDisableLoader());
  yield put(leadsActions.changeToQuotationResponse(data.leadId));
  yield put(dashboardActions.subtractLeadsCount());
  yield put(dashboardActions.addOpportunitiesCount());
  yield put(opportunityActions.requestOpportunitiesFetch());

  yield call(navigationService.default.goBack);
}

function getToken() {
  return AsyncStorage.getItem('token');
}

export function* leadsFetch() {
  yield takeEvery(types.LEADS_FETCH_REQUEST, leadsAsync);
}

export function* leadSingleFetch() {
  yield takeEvery(types.LEADS_FETCH_SINGLE_REQUEST, leadSingleAsync);
}
export function* dropDownListFetch() {
  yield takeEvery(types.GET_LEADS_DROPDOWN_REQUEST, leadsDropDownAsync);
}
export function* addLead() {
  yield takeEvery(types.ADD_LEADS_REQUEST, addLeadAsync);
}

export function* changeToCustomer() {
  yield takeEvery(types.CHANGE_TO_CUSTOMER_REQUEST, changeToCustomerAsync);
}
export function* changeToQuotation() {
  yield takeEvery(types.CHANGE_TO_QUOTATION_REQUEST, changeToQuotationAsync);
}
