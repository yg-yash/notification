import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  leadsCount: 0,
  error: null,
  opportunitesCount: 0,
  headerName: '',
  headerLogo: null,
  headerError: null,
};

export const dashboardReducer = createReducer(initialState, {
  [types.GET_LEADS_COUNT_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.GET_LEADS_COUNT_RESPONSE](state, action) {
    return {
      ...state,
      leadsCount: action.payload,
      error: '',
    };
  },
  [types.GET_LEADS_COUNT_FAILED](state) {
    return {
      ...state,
    };
  },

  [types.GET_LEADS_COUNT_ERROR](state, action) {
    return {
      ...state,
      error: action.payload,
    };
  },
  [types.GET_OPPORTUNITIES_COUNT_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.GET_OPPORTUNITIES_COUNT_RESPONSE](state, action) {
    return {
      ...state,
      opportunitesCount: action.payload,
      error: '',
    };
  },
  [types.GET_OPPORTUNITIES_COUNT_FAILED](state) {
    return {
      ...state,
    };
  },
  [types.GET_OPPORTUNITIES_COUNT_ERROR](state, action) {
    return {
      ...state,
      error: action.payload,
    };
  },

  [types.GET_DASHBOARD_HEADER_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.GET_DASHBOARD_HEADER_RESPONSE](state, action) {
    return {
      ...state,
      headerName: action.payload.headerName,
      headerLogo: action.payload.headerLogo,
      headerError: '',
    };
  },
  [types.GET_DASHBOARD_HEADER_ERROR](state, action) {
    return {
      ...state,
      headerError: action.payload,
    };
  },
  [types.ADD_LEADS_COUNT](state) {
    return {
      ...state,
      leadsCount: +state.leadsCount + 1,
    };
  },
  [types.SUBTRACT_LEADS_COUNT](state) {
    return {
      ...state,
      leadsCount: state.leadsCount - 1,
    };
  },
  [types.ADD_OPPORTUNITIES_COUNT](state) {
    return {
      ...state,
      opportunitesCount: +state.opportunitesCount + 1,
    };
  },
  [types.SUBTRACT_OPPORTUNITIES_COUNT](state) {
    return {
      ...state,
      opportunitesCount: state.opportunitesCount - 1,
    };
  },
});
