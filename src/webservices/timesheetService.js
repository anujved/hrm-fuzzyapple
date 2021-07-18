import ApiClient from '../api-client/apiClient';
import {
    CREATE_TIMESHEET,
    FETCH_TIMESHEET,
    DELETE_TIMESHEET,
    CREATE_MANAGE_LEAVE,
    FETCH_LEAVES,
    DELETE_LEAVES,
    UPDATE_LEAVES,
} from 'src/api-client/endpoints';

export default class TimesheetService {

    static createTimesheet = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_TIMESHEET, data, null, null, false);
    }

    static fetchAllTimesheet = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_TIMESHEET, null, null, null, false);
    }

    static deleteTimesheet = async (params) => {
        const endpoint = `${DELETE_TIMESHEET}/${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, endpoint, null, null, null, false);
    }

    static createLeave = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_MANAGE_LEAVE, data, null, null, false);
    }

    static fetchAllLeave = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_LEAVES, null, null, null, false);
    }

    static deleteLeave = async (params) => {
        const endpoint = `${DELETE_LEAVES}/${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, endpoint, null, null, null, false);
    }
    
    static updateLeave = async ({data, params}) => {
        const endpoint = `${UPDATE_LEAVES}/${params}`;
        return await ApiClient.call(ApiClient.requestMethod.PUT, endpoint, data, null, null, false);
    }
}