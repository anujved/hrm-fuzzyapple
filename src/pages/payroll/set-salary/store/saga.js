import { call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import {
  FETCH_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEE_FAILED,
  CREATE_EMPLOYEE_CREATE_SALARY_REQUEST,
  CREATE_EMPLOYEE_CREATE_SALARY_SUCCESS,
  CREATE_EMPLOYEE_CREATE_SALARY_FAILED,
  CREATE_EMPLOYEE_CREATE_ALLOWANCE_REQUEST,
  CREATE_EMPLOYEE_CREATE_ALLOWANCE_SUCCESS,
  CREATE_EMPLOYEE_CREATE_ALLOWANCE_FAILED
  } from "./constants";
  import {fetchEmployee} from "./ajax"


function* fetchEmployeeSaga() {
  try {

    let response = yield call(fetchEmployee);

    yield put({type:FETCH_EMPLOYEE_SUCCESS, payload:response})
    
  } catch (e) {
    
    console.log(e);
    // yield put({type:FETCH_EMPLOYEE_FAILED, payload:e})


  }
}


export default function* Employee() {
  
  yield takeLatest(FETCH_EMPLOYEE_REQUEST, fetchEmployeeSaga);

}
