import { call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import {
  FETCH_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEE_SUCCESS,
 
  CREATE_EMPLOYEE_CREATE_SALARY_REQUEST,
  CREATE_EMPLOYEE_CREATE_ALLOWANCE_REQUEST,
  ADD_EMPLOYEE_COMMISSION_REQUEST,
  ADD_EMPLOYEE_lOAN_REQUEST,
  ADD_EMPLOYEE_SATURATION_DEDUCTION_REQUEST,
  ADD_EMPLOYEE_OVERTIME_REQUEST,
  ADD_EMPLOYEE_OTHER_REQUEST,

  } from "./constants";
  import {fetchEmployee} from "./ajax"


function* fetchEmployeeSaga() {
  try {

   
    
  } catch (e) {
    
   
  }
}
function* createEmployeeSaga() {
  try {

  
  } catch (e) {
    
    
  }
}
function* addAllowanceSaga() {
  try {

  
    
  } catch (e) {
    
   
  
  }
}
function* addCommissionSaga() {
  try {

  
    
  } catch (e) {
    
   
    
  }
}
function* addLoanSaga() {
  try {

   
    
  } catch (e) {
    
    
  }
}
function* addSaturationSaga() {
  try {

  } catch (e) {
    
  
  }
}
function* addOtherSaga() {
  try {

  
    
  } catch (e) {
    
  
  }
}
function* addOvertimeSaga() {
  try {

   
    
  } catch (e) {
    
   
  }
}


export default function* Employee() {
  
  yield takeLatest(FETCH_EMPLOYEE_REQUEST, fetchEmployeeSaga);

  yield takeLatest(CREATE_EMPLOYEE_CREATE_SALARY_REQUEST, createEmployeeSaga);
  yield takeLatest(CREATE_EMPLOYEE_CREATE_ALLOWANCE_REQUEST, addAllowanceSaga);
  yield takeLatest(ADD_EMPLOYEE_COMMISSION_REQUEST, addCommissionSaga);
  yield takeLatest(ADD_EMPLOYEE_lOAN_REQUEST, addLoanSaga);
  yield takeLatest(ADD_EMPLOYEE_SATURATION_DEDUCTION_REQUEST, addSaturationSaga);
  yield takeLatest(ADD_EMPLOYEE_OVERTIME_REQUEST, addOvertimeSaga);
  yield takeLatest(ADD_EMPLOYEE_OTHER_REQUEST, addOtherSaga);
  yield takeLatest(FETCH_EMPLOYEE_REQUEST, fetchEmployeeSaga);

}
