/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as themeReducer from './themeReducer';
import * as leadsReducer from './leadsReducer';
import * as opportunityReducer from './opportunityReducer';
import * as dashboardReducer from './dashboardReducer';
export default Object.assign(
  loginReducer,
  loadingReducer,
  themeReducer,
  leadsReducer,
  opportunityReducer,
  dashboardReducer,
);
