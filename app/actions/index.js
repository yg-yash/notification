// export action creators
import * as loginActions from './loginActions';
import * as navigationActions from './navigationActions';
import * as themeActions from './themeActions';
import * as leadsActions from './leadsActions';
import * as opportunityActions from './opportunityActions';
import * as dashboardActions from './dashboardActions';

export const ActionCreators = Object.assign(
  {},
  loginActions,
  navigationActions,
  themeActions,
  leadsActions,
  opportunityActions,
  dashboardActions,
);
