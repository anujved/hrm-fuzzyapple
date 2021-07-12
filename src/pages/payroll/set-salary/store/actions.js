import {
    FETCH_EMPLOYEE_REQUEST,
    CREATE_EMPLOYEE_CREATE_ALLOWANCE_REQUEST,
    ADD_EMPLOYEE_COMMISSION_REQUEST,
    ADD_EMPLOYEE_lOAN_REQUEST,
    ADD_EMPLOYEE_SATURATION_DEDUCTION_REQUEST,
    ADD_EMPLOYEE_OTHER_REQUEST,
    ADD_EMPLOYEE_OVERTIME_REQUEST,
    CREATE_EMPLOYEE_CREATE_SALARY_REQUEST


} from "./constants";

export const fetchEmployee = () => ({ type: FETCH_EMPLOYEE_REQUEST });
export const editEmployeeSalary = (formData) => ({ type: CREATE_EMPLOYEE_CREATE_SALARY_REQUEST,payload:formData });
export const addAllowance = (formData) => ({ type: CREATE_EMPLOYEE_CREATE_ALLOWANCE_REQUEST,payload:formData });
export const addCommission = (formData) => ({ type: ADD_EMPLOYEE_COMMISSION_REQUEST,payload:formData });
export const addSaturationDeduction = (formData) => ({ type: ADD_EMPLOYEE_SATURATION_DEDUCTION_REQUEST,payload:formData });
export const addOvertime = (formData) => ({ type: ADD_EMPLOYEE_OVERTIME_REQUEST,payload:formData });
export const addLoan = (formData) => ({ type: ADD_EMPLOYEE_lOAN_REQUEST,payload:formData });
export const addOtherPayment = (formData) => ({ type: ADD_EMPLOYEE_OTHER_REQUEST,payload:formData });

