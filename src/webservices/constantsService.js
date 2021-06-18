import { 
    CREATE_BRANCH, 
    FETCH_BRANCHES, 
    CREATE_DEPARTMENT, 
    FETCH_DEPARTMENTS, 
    CREATE_DESIGNATION, 
    FETCH_DESIGNATIIONS,
    CREATE_DOCUMENT_TYPE,
    FETCH_DOCUMENTS_TYPE,
    CREATE_PAYSLIP_TYPE,
    FETCH_PAYSLIP_TYPE,
    CREATE_ALLOWANCE_OPTION,
    FETCH_ALLOWANCE_OPTION,
    CREATE_LOAN_OPTION,
    FETCH_LOAN_OPTION,
    CREATE_DEDUCTION_OPTION,
    FETCH_DEDUCTION_OPTION
 } from 'src/api-client/endpoints';
import ApiClient from '../api-client/apiClient';

export default class ConstantService {

    /**
     * ****** Branch Services ******
     */
    static createBranch = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_BRANCH, data, null, null, false);
    }

    static fetchAllBranch = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_BRANCHES, null, null, null, false);
    }

    /**
     * ****** Department Services ******
     */
    static createDepartment = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_DEPARTMENT, data, null, null, null);
    }

    static fetchAllDepartment = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_DEPARTMENTS, null, null, null, false);
    }

    /**
     * ****** Designation Services ******
     */
     static createDesignation = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_DESIGNATION, data, null, null, null);
    }

    static fetchAllDesignation = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_DESIGNATIIONS, null, null, null, false);
    }


     /**
     * ****** Document Type Services ******
     */
      static createDocumentType = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_DOCUMENT_TYPE, data, null, null, null);
    }

    static fetchAllDocumentType = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_DOCUMENTS_TYPE, null, null, null, false);
    }

     /**
     * ****** Payslip Type Services ******
     */
      static createPayslipType = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_PAYSLIP_TYPE, data, null, null, null);
    }

    static fetchAllPayslipType = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_PAYSLIP_TYPE, null, null, null, false);
    }

     /**
     * ****** Allowance Option Services ******
     */
      static createAllowanceOption = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_ALLOWANCE_OPTION, data, null, null, null);
    }

    static fetchAllAllowanceOption = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_ALLOWANCE_OPTION, null, null, null, false);
    }

     /**
     * ****** Loan Option Services ******
     */
      static createLoanOption = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_LOAN_OPTION, data, null, null, null);
    }

    static fetchAllLoanOption = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_LOAN_OPTION, null, null, null, false);
    }

     /**
     * ****** Deduction Option Services ******
     */
      static createDeductionOption = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_DEDUCTION_OPTION, data, null, null, null);
    }

    static fetchAllDeductionOption = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_DEDUCTION_OPTION, null, null, null, false);
    }
}
