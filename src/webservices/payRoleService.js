import ApiClient from '../api-client/apiClient';
import {
    FETCH_PAYSLIP,
    CREATE_PAYSLIP,
    UPDATE_PAYSLIP,
    DELETE_PAYSLIP
} from 'src/api-client/endpoints';

export default class PayRollService {
    static FetchPaySlip = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_PAYSLIP, null, null, null, false);
    }
    static CreatePaySlip = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_PAYSLIP, data, null, null, false);
    }
    static UpdatePaySlip = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, UPDATE_PAYSLIP, data, null, null, false);
    }
    static DeletePaySlip = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.DELETE, DELETE_PAYSLIP, data, null, null, false);
    }
}