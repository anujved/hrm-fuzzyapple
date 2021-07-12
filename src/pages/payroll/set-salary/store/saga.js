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
import {
  fetchEmployee,
  addAllowance,
  addCommission,
  addEmployeeSalary,
  addLoan,
  addOvertime,
  addOther,
  addSaturationDeduction
} from "./ajax"


function* fetchEmployeeSaga() {
  try {
    const data = yield (fetchEmployee)
    console.log(data)
  } catch (e) {
   console.log(e)
  }
}


function* createEmployeeSaga() {
  try {
   const data= yield(addEmployeeSalary)
   console.log(data)
  } catch (e) {
    console.log(e)
    
  }
}
function* addAllowanceSaga() {
  try {
    const data= yield(addAllowance)
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
function* addCommissionSaga() {
  try {
    const data= yield(addCommission)
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
function* addLoanSaga() {
  try {
    const data= yield(addLoan)
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
function* addSaturationSaga() {
  try {
    const data= yield(addSaturationDeduction)
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
function* addOtherSaga() {
  try {
    const data= yield(addOther)
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}
function* addOvertimeSaga() {
  try {
    const data= yield(addOvertime)
    console.log(data)
  } catch (e) {
    console.log(e)
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
