import ApiClient from '../api-client/apiClient';
import { 
    CREATE_EMPLOYEE,
    FETCH_EMPLOYEE,
    DELETE_EMPLOYEE
 } from 'src/api-client/endpoints';

export default class EmployeeService {

     static createEmployee = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_EMPLOYEE, data, null, null, false);
    }

    static fetchAllEmployee = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_EMPLOYEE, null, null, null, false);
    }

    static deleteEmployee = async (params) => {
        return await ApiClient.call(ApiClient.requestMethod.DELETE, DELETE_EMPLOYEE, null, params, null, false);
    }
}