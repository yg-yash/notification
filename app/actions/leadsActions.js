/*
 * Reducer actions related with login
 */
import * as types from './types';

export function requestLeadsFetch() {
  return {
    type: types.LEADS_FETCH_REQUEST,
  };
}

export function leadsFetchFailed() {
  return {
    type: types.LEADS_FETCH_FAILED,
  };
}

export function onLeadsFetchResponse(response) {
  return {
    type: types.LEADS_FETCH_RESPONSE,
    response,
  };
}

export function enableLoader() {
  return {
    type: types.LEADS_FETCH_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LEADS_FETCH_DISABLE_LOADER,
  };
}

export function leadsFetchError(error) {
  return {
    type: types.LEADS_FETCH_ERROR,
    payload: error,
  };
}

//lead
export function requestSingleLeadsFetch(id) {
  return {
    type: types.LEADS_FETCH_SINGLE_REQUEST,
    payload: id,
  };
}

export function singleLeadFetchFailed() {
  return {
    type: types.LEADS_FETCH_SINGLE_FAILED,
  };
}

export function onSingleLeadFetchResponse(response) {
  return {
    type: types.LEADS_FETCH_SINGLE_RESPONSE,
    response,
  };
}

export function enableSingleLeadLoader() {
  return {
    type: types.LEADS_FETCH_SINGLE_ENABLE_LOADER,
  };
}
export function disbaleSingleLeadLoader() {
  return {
    type: types.LEADS_FETCH_SINGLE_DISABLE_LOADER,
  };
}

export function singleLeadFetchError(error) {
  return {
    type: types.LEADS_FETCH_SINGLE_ERROR,
    payload: error,
  };
}

//dropdown  actions
export function requestLeadsDropdown() {
  return {
    type: types.GET_LEADS_DROPDOWN_REQUEST,
  };
}

export function errorLeadsDropdown(error) {
  return {
    type: types.GET_LEADS_DROPDOWN_ERROR,
    payload: error,
  };
}
export function onLeadsDropdownResponse(response) {
  return {
    type: types.GET_LEADS_DROPDOWN_RESPONSE,
    payload: response,
  };
}

export function dropdownEnableLoader() {
  return {
    type: types.LEADS_DROPDOWN_ENABLE_LOADER,
  };
}
export function dropdownDisableLoader() {
  return {
    type: types.LEADS_DROPDOWN_DISABLE_LOADER,
  };
}

//add leads actions
export function requestAddLeads(data) {
  return {
    type: types.ADD_LEADS_REQUEST,
    payload: data,
  };
}

export function addLeadsError(error) {
  return {
    type: types.ADD_LEADS_ERROR,
    payload: error,
  };
}
export function onAddLeadsResponse() {
  return {
    type: types.ADD_LEADS_RESPONSE,
  };
}

export function addLeadsEnableLoader() {
  return {
    type: types.ADD_LEADS_ENABLE_LOADER,
  };
}
export function addLeadsDisableLoader() {
  return {
    type: types.ADD_LEADS_DISABLE_LOADER,
  };
}

export function clearAddData() {
  return {
    type: types.CLEAR_ADD_DATA,
  };
}

export function changeToCustomerRequest(leadId) {
  return {
    type: types.CHANGE_TO_CUSTOMER_REQUEST,
    leadId,
  };
}
export function changeToCustomerResponse(response) {
  return {
    type: types.CHANGE_TO_CUSTOMER_RESPONSE,
    payload: response,
  };
}
export function changeToCustomerError(error) {
  return {
    type: types.CHANGE_TO_CUSTOMER_ERROR,
    payload: error,
  };
}
export function changeToCustomerEnableLoader() {
  return {
    type: types.CHANGE_TO_CUSTOMER_ENABLE_LOADER,
  };
}
export function changeToCustomerDisableLoader() {
  return {
    type: types.CHANGE_TO_CUSTOMER_DISABLE_LOADER,
  };
}
export function clearChangeToCustomerSuccess() {
  return {
    type: types.CLEAR_CHANGE_TO_CUSTOMER_SUCCESS,
  };
}

export function changeToQuotationRequest(leadId) {
  return {
    type: types.CHANGE_TO_QUOTATION_REQUEST,
    leadId,
  };
}
export function changeToQuotationResponse(response) {
  return {
    type: types.CHANGE_TO_QUOTATION_RESPONSE,
    payload: response,
  };
}
export function changeToQuotationError(error) {
  return {
    type: types.CHANGE_TO_QUOTATION_ERROR,
    payload: error,
  };
}
export function changeToQuotationEnableLoader() {
  return {
    type: types.CHANGE_TO_QUOTATION_ENABLE_LOADER,
  };
}
export function changeToQuotationDisableLoader() {
  return {
    type: types.CHANGE_TO_QUOTATION_DISABLE_LOADER,
  };
}
