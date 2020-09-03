/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  isLoginLoading: false,
  isLeadsLoading: false,
  isLeadLoading: false,
  isOpportunitiesLoading: false,
  isOpportunityLoading: false,
  isDashboardLoading: false,
  isDropDownListLoading: false,
  isHeaderLoading: false,
  isAddLeadLoading: false,
  isChangeToCustomerLoading: false,
  isChangeToQuotationLoading: false,
  isStatusChanging: false,
};

export const loadingReducer = createReducer(initialState, {
  [types.LOGIN_ENABLE_LOADER](state) {
    return { ...state, isLoginLoading: true };
  },
  [types.LOGIN_DISABLE_LOADER](state) {
    return { ...state, isLoginLoading: false };
  },

  [types.LEADS_FETCH_ENABLE_LOADER](state) {
    return { ...state, isLeadsLoading: true };
  },
  [types.LEADS_FETCH_DISABLE_LOADER](state) {
    return { ...state, isLeadsLoading: false };
  },

  [types.LEADS_FETCH_SINGLE_ENABLE_LOADER](state) {
    return { ...state, isLeadLoading: true };
  },
  [types.LEADS_FETCH_SINGLE_DISABLE_LOADER](state) {
    return { ...state, isLeadLoading: false };
  },
  [types.OPPORTUNITIES_FETCH_ENABLE_LOADER](state) {
    return { ...state, isOpportunitiesLoading: true };
  },
  [types.OPPORTUNITIES_FETCH_DISABLE_LOADER](state) {
    return { ...state, isOpportunitiesLoading: false };
  },

  [types.OPPORTUNITY_FETCH_SINGLE_ENABLE_LOADER](state) {
    return { ...state, isOpportunityLoading: true };
  },
  [types.OPPORTUNITY_FETCH_SINGLE_DISABLE_LOADER](state) {
    return { ...state, isOpportunityLoading: false };
  },

  [types.LEADS_COUNT_ENABLE_LOADER](state) {
    return { ...state, isDashboardLoading: true };
  },
  [types.LEADS_COUNT_DISABLE_LOADER](state) {
    return { ...state, isDashboardLoading: false };
  },
  [types.LEADS_DROPDOWN_ENABLE_LOADER](state) {
    return { ...state, isDropDownListLoading: true };
  },
  [types.LEADS_DROPDOWN_DISABLE_LOADER](state) {
    return { ...state, isDropDownListLoading: false };
  },
  [types.DASHBOARD_HEADER_ENABLE_LOADER](state) {
    return { ...state, isHeaderLoading: true };
  },
  [types.DASHBOARD_HEADER_DISABLE_LOADER](state) {
    return { ...state, isHeaderLoading: false };
  },
  [types.ADD_LEADS_ENABLE_LOADER](state) {
    return { ...state, isAddLeadLoading: true };
  },
  [types.ADD_LEADS_DISABLE_LOADER](state) {
    return { ...state, isAddLeadLoading: false };
  },
  [types.CHANGE_TO_CUSTOMER_ENABLE_LOADER](state) {
    return { ...state, isChangeToCustomerLoading: true };
  },
  [types.CHANGE_TO_CUSTOMER_DISABLE_LOADER](state) {
    return { ...state, isChangeToCustomerLoading: false };
  },
  [types.CHANGE_TO_QUOTATION_ENABLE_LOADER](state) {
    return { ...state, isChangeToQuotationLoading: true };
  },
  [types.CHANGE_TO_QUOTATION_DISABLE_LOADER](state) {
    return { ...state, isChangeToQuotationLoading: false };
  },
  [types.CHANGE_STATUS_ENABLE_LOADER](state) {
    return { ...state, isStatusChanging: true };
  },
  [types.CHANGE_STATUS_DISABLE_LOADER](state) {
    return { ...state, isStatusChanging: false };
  },
});
