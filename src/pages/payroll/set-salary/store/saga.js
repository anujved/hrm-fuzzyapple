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
  import {} from "./ajax"


function* fetchEmployeeSaga() {
  try {
    // let response = yield call(fetchSuppliersRequest);
    // yield put({ type: FETCH_EMPLOYEE_SUCCESS, payload: response.data });
  } catch (e) {
    yield put ({ type: FETCH_EMPLOYEE_FAILED, payload: [] });
    // yield put(snackFailure());
  }
}

function* fetchSupplier(action) {
  try {
    // const data = yield call(fetchSupplierRequest, get(action, "payload.id"));
    // yield put({ type: FETCH_SUPPLIER_SUCCESS, payload: data.data });
    // action.payload.success && action.payload.success(data.data);
  } catch (e) {
    // yield put ({ type: FETCH_SUPPLIER_FAILURE, payload: null });
    // yield put(snackFailure());
  }
}

function* createSupplier(action) {
  try {
  
    // yield call(createSupplierRequest, action.payload.supplier, data);
    // yield put({ type: CREATE_SUPPLIER_SUCCESS });
    // action.payload.success && action.payload.success();
    // yield put(snackSuccess());
  } catch (e) {
    // yield put ({ type: CREATE_SUPPLIER_FAILURE });
    // yield put(snackFailure());
  }
}

function* updateSupplier(action) {
  try {
   
    // yield call(updateSupplierRequest, action.payload.supplier.id, action.payload.id, data);
    // yield put({ type: UPDATE_SUPPLIER_SUCCESS });
    // action.payload.success && action.payload.success();
    // yield put(snackSuccess());
  } catch (e) {
    // yield put ({ type: UPDATE_SUPPLIER_FAILURE });
    // yield put(snackFailure());
  }
}

function* deleteSupplier(action) {
  try {
    // yield call(deleteSupplierRequest, action.payload.id);
    // yield put({ type: DELETE_SUPPLIER_SUCCESS });
    // action.payload.success && action.payload.success();
    // yield put(snackSuccess());
  } catch (e) {
    // yield put ({ type: DELETE_SUPPLIER_FAILURE });
    // yield put(snackFailure());
  }
}

export default function* Employee() {
  yield takeLatest(FETCH_EMPLOYEE_REQUEST, fetchEmployeeSaga);
//   yield takeLatest(FETCH_SUPPLIERS_REQUEST, fetchSuppliers);
//   yield takeLatest(CREATE_SUPPLIER_REQUEST, createSupplier);
//   yield takeLatest(UPDATE_SUPPLIER_REQUEST, updateSupplier);
//   yield takeLatest(DELETE_SUPPLIER_REQUEST, deleteSupplier);
}
