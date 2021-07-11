import { FETCH_EMPLOYEE_REQUEST } from "./constants";

export const fetchEmployee = () => ({ type: FETCH_EMPLOYEE_REQUEST });

export const editEmployeeSalary = (formData) => ({ type: FETCH_EMPLOYEE_REQUEST,payload:formData });

