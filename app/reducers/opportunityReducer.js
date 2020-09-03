import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  opportunities: null,
  error: null,
  opportunity: null,
  singleOpportunityError: null,
  changeStatusError: null,
};

export const opportunityReducer = createReducer(initialState, {
  [types.FETCH_OPPORTUNITIES_REQUEST](state, action) {
    return {
      ...state,
    };
  },
  [types.OPPORTUNITIES_FETCH_RESPONSE](state, action) {
    return {
      ...state,
      opportunities: action.response,
      error: null,
    };
  },
  [types.OPPORTUNITIES_FETCH_FAILED](state) {
    return {
      ...state,
      opportunities: null,
    };
  },
  [types.OPPORTUNITIES_FETCH_ERROR](state, action) {
    return {
      ...state,
      error: action.payload,
    };
  },
  [types.OPPORTUNITY_FETCH_SINGLE_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.OPPORTUNITY_FETCH_SINGLE_RESPONSE](state, action) {
    return {
      ...state,
      opportunity: action.payload,
      singleOpportunityError: null,
    };
  },
  [types.OPPORTUNITY_FETCH_SINGLE_FAILED](state) {
    return {
      ...state,
      opportunity: null,
    };
  },
  [types.OPPORTUNITY_FETCH_SINGLE_ERROR](state, action) {
    return {
      ...state,
      singleOpportunityError: action.payload,
    };
  },
  [types.CHANGE_STATUS_REQUEST](state, action) {
    return {
      ...state,
    };
  },
  [types.CHANGE_STATUS_RESPONSE](state, action) {
    return {
      ...state,
      changeStatusError: '',
    };
  },
  [types.CHANGE_STATUS_ERROR](state, action) {
    return {
      ...state,
      changeStatusError: action.payload,
    };
  },
});
