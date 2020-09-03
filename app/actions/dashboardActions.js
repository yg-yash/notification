/*
 * Reducer actions related with login
 */
import * as types from './types';

//leads Count
export function requestLeadsCount() {
  return {
    type: types.GET_LEADS_COUNT_REQUEST,
  };
}

export function getLeadsCountFailed() {
  return {
    type: types.GET_LEADS_COUNT_FAILED,
  };
}

export function getLeadsCountResponse(response) {
  return {
    type: types.GET_LEADS_COUNT_RESPONSE,
    payload: response,
  };
}

export function enableLoader() {
  return {
    type: types.LEADS_COUNT_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LEADS_COUNT_DISABLE_LOADER,
  };
}

export function getLeadsCountError(error) {
  return {
    type: types.GET_LEADS_COUNT_ERROR,
    payload: error,
  };
}

//opportunities count
export function requestOpportunitiesCount() {
  return {
    type: types.GET_OPPORTUNITIES_COUNT_REQUEST,
  };
}

export function getOpportunitiesCountFailed() {
  return {
    type: types.GET_OPPORTUNITIES_COUNT_FAILED,
  };
}

export function getOpportunitiesCountResponse(response) {
  return {
    type: types.GET_OPPORTUNITIES_COUNT_RESPONSE,
    payload: response,
  };
}

export function opportunitiesEnableLoader() {
  return {
    type: types.OPPORTUNITIES_COUNT_ENABLE_LOADER,
  };
}

export function opportunitiesDisableLoader() {
  return {
    type: types.OPPORTUNITIES_COUNT_DISABLE_LOADER,
  };
}

export function getOpportunitiesCountError(error) {
  return {
    type: types.GET_OPPORTUNITIES_COUNT_ERROR,
    payload: error,
  };
}

export function getDashboardHeaderRequest() {
  return {
    type: types.GET_DASHBOARD_HEADER_REQUEST,
  };
}
export function getDashboardHeaderResponse(data) {
  return {
    type: types.GET_DASHBOARD_HEADER_RESPONSE,
    payload: {
      headerName: data[0].site_name,
      headerLogo: data[0].site_logo,
    },
  };
}
export function getDashboardHeaderError() {
  return {
    type: types.GET_DASHBOARD_HEADER_ERROR,
  };
}

export function dashboardHeaderEnableLoader() {
  return {
    type: types.DASHBOARD_HEADER_ENABLE_LOADER,
  };
}
export function dashboardHeaderDisableLoader() {
  return {
    type: types.DASHBOARD_HEADER_DISABLE_LOADER,
  };
}

export function addLeadsCount() {
  console.log('asd');
  return {
    type: types.ADD_LEADS_COUNT,
  };
}
export function subtractLeadsCount() {
  return {
    type: types.SUBTRACT_LEADS_COUNT,
  };
}
export function addOpportunitiesCount() {
  return {
    type: types.ADD_OPPORTUNITIES_COUNT,
  };
}
export function subtractOpportunitiesCount() {
  return {
    type: types.SUBTRACT_OPPORTUNITIES_COUNT,
  };
}
