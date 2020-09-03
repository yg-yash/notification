/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/actions/types';

const initialState = {
  leads: [],
  error: null,
  lead: null,
  singleLeadError: null,
  dropdownList: [],
  dropDownError: null,
  isAddLeadSuccess: false,
  addLeadError: null,
  changeToCustomerSucessMessage: '',
  changeToCustomerErrorMessage: '',
  changeToQuotationSucessMessage: '',
  changeToQuotationErrorMessage: '',
};

export const leadsReducer = createReducer(initialState, {
  [types.LEADS_FETCH_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.LEADS_FETCH_RESPONSE](state, action) {
    return {
      ...state,
      leads: action.response,
      error: null,
    };
  },
  [types.LEADS_FETCH_FAILED](state) {
    return {
      ...state,
      leads: null,
    };
  },
  [types.LEADS_FETCH_ERROR](state, action) {
    return {
      ...state,
      error: action.payload,
    };
  },
  [types.LEADS_FETCH_SINGLE_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.LEADS_FETCH_SINGLE_RESPONSE](state, action) {
    return {
      ...state,
      lead: action.response,
      singleLeadError: null,
    };
  },
  [types.LEADS_FETCH_SINGLE_FAILED](state) {
    return {
      ...state,
      lead: null,
    };
  },
  [types.LEADS_FETCH_SINGLE_ERROR](state, action) {
    return {
      ...state,
      singleLeadError: action.payload,
    };
  },
  [types.GET_LEADS_DROPDOWN_ERROR](state, action) {
    return {
      ...state,
      dropDownError: action.payload,
    };
  },
  [types.GET_LEADS_DROPDOWN_RESPONSE](state, action) {
    return {
      ...state,
      dropdownList: action.payload,
    };
  },
  [types.GET_LEADS_DROPDOWN_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.ADD_LEADS_RESPONSE](state) {
    return {
      ...state,
      isAddLeadSuccess: true,
    };
  },
  [types.ADD_LEADS_REQUEST](state) {
    return {
      ...state,
      isAddLeadSuccess: false,
    };
  },

  [types.ADD_LEADS_ERROR](state, action) {
    return {
      ...state,
      addLeadError: action.payload,
      isAddLeadSuccess: false,
    };
  },
  [types.ADD_LEADS_FAILED](state) {
    return {
      ...state,
      isAddLeadSuccess: false,
    };
  },
  [types.CLEAR_ADD_DATA](state) {
    return {
      ...state,
      isAddLeadSuccess: false,
      addLeadError: null,
    };
  },
  [types.CHANGE_TO_CUSTOMER_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.CHANGE_TO_CUSTOMER_RESPONSE](state, action) {
    const newLeads = state.leads.filter(lead => lead.id !== action.payload);
    return {
      ...state,
      changeToCustomerSucessMessage: 'Leads Converted Successfully',
      leads: newLeads,
    };
  },
  [types.CHANGE_TO_CUSTOMER_ERROR](state, action) {
    return {
      ...state,
      changeToCustomerErrorMessage: action.payload,
    };
  },
  [types.CLEAR_CHANGE_TO_CUSTOMER_SUCCESS](state, action) {
    return {
      ...state,
      changeToCustomerSuccessMessage: '',
    };
  },
  [types.CHANGE_TO_QUOTATION_REQUEST](state) {
    return {
      ...state,
    };
  },
  [types.CHANGE_TO_QUOTATION_RESPONSE](state, action) {
    console.log(action.payload);
    const newLeads = state.leads.filter(lead => lead.id !== action.payload);
    return {
      ...state,
      changeToCustomerSucessMessage: 'Leads Converted Successfully',
      leads: newLeads,
    };
  },
  [types.CHANGE_TO_QUOTATION_ERROR](state, action) {
    return {
      ...state,
      changeToQuotationErrorMessage: action.payload,
    };
  },
  [types.CLEAR_CHANGE_TO_CUSTOMER_SUCCESS](state, action) {
    return {
      ...state,
      changeToQuotationSucessMessage: 'Converted Successfully',
    };
  },
});
