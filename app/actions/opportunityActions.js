import * as types from './types';

export function requestOpportunitiesFetch() {
  return {
    type: types.FETCH_OPPORTUNITIES_REQUEST,
  };
}

export function opportunitiesFetchFailed() {
  return {
    type: types.OPPORTUNITIES_FETCH_FAILED,
  };
}

export function onOpportunitiesFetchResponse(response) {
  return {
    type: types.OPPORTUNITIES_FETCH_RESPONSE,
    response,
  };
}

export function enableLoader() {
  return {
    type: types.OPPORTUNITIES_FETCH_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.OPPORTUNITIES_FETCH_DISABLE_LOADER,
  };
}

export function opportunitiesFetchError(error) {
  return {
    type: types.OPPORTUNITIES_FETCH_ERROR,
    payload: error,
  };
}

//opportunity
export function requestSingleOpportunityFetch(id) {
  return {
    type: types.OPPORTUNITY_FETCH_SINGLE_REQUEST,
    payload: id,
  };
}

export function singleOpportunityFetchFailed() {
  return {
    type: types.OPPORTUNITY_FETCH_SINGLE_FAILED,
  };
}

export function onSingleOpportunityFetchResponse(response) {
  return {
    type: types.OPPORTUNITY_FETCH_SINGLE_RESPONSE,
    payload: response,
  };
}

export function enableSingleOpportunityLoader() {
  return {
    type: types.OPPORTUNITY_FETCH_SINGLE_ENABLE_LOADER,
  };
}
export function disbaleSingleOpportunityLoader() {
  return {
    type: types.OPPORTUNITY_FETCH_SINGLE_DISABLE_LOADER,
  };
}

export function singleOpportunityFetchError(error) {
  return {
    type: types.OPPORTUNITY_FETCH_SINGLE_ERROR,
    payload: error,
  };
}

export function getOpportunity() {
  return {
    type: types.OPPORTUNITY_FETCH_SINGLE_RESPONSE,
  };
}

export function changeStatusRequest(id, statusValue, textValue, typeValue) {
  return {
    type: types.CHANGE_STATUS_REQUEST,
    payload: { id, statusValue, textValue, typeValue },
  };
}
export function changeStatusResponse(response) {
  return {
    type: types.CHANGE_STATUS_RESPONSE,
    payload: response,
  };
}
export function changeStatusError(error) {
  return {
    type: types.CHANGE_STATUS_ERROR,
    payload: error,
  };
}
export function changeStatusEnableLoader() {
  return {
    type: types.CHANGE_STATUS_ENABLE_LOADER,
  };
}
export function changeStatusDisableLoader() {
  return {
    type: types.CHANGE_STATUS_DISABLE_LOADER,
  };
}
