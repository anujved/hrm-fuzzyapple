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
  CREATE_EMPLOYEE_CREATE_ALLOWANCE_FAILED,
} from "./constants";

const initialState = {
  data: [],
  loading: false,
  firstTime: false,
  error: false,
  message:""
};

const Employee = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_EMPLOYEE_REQUEST:
      state = { ...state, firstLoading: true, loading: true };
      break;
    case FETCH_EMPLOYEE_SUCCESS:
      state = { ...state, loading: false, data: get(payload,'data') };
      break;
    case FETCH_EMPLOYEE_FAILED:
      state = {
        ...state,
        loading: false,
        error: true,
        message: payload.message,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Employee;
