/**
 *  Redux saga class init
 */
import { takeEvery, all } from 'redux-saga/effects';

import loginSaga from './loginSaga';
import {
  leadsFetch,
  leadSingleFetch,
  dropDownListFetch,
  addLead,
  changeToCustomer,
  changeToQuotation,
} from './leadsSaga';
import {
  opportunitiesFetch,
  opportunitySingleFetch,
  changeStatus,
} from './opportunitySaga';
import {
  leadsCountFetch,
  opportunitiesCountFetch,
  dashboardHeaderFetch,
} from './dashboardSaga';

export default function* watch() {
  yield all([
    loginSaga(),
    leadsFetch(),
    leadSingleFetch(),
    opportunitiesFetch(),
    opportunitySingleFetch(),
    leadsCountFetch(),
    opportunitiesCountFetch(),
    dropDownListFetch(),
    dashboardHeaderFetch(),
    addLead(),
    changeToCustomer(),
    changeToQuotation(),
    changeStatus(),
  ]);
}
