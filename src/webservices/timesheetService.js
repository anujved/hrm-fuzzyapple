import ApiClient from '../api-client/apiClient';
import {
    CREATE_TIMESHEET,
    FETCH_TIMESHEET,
    DELETE_TIMESHEET
} from 'src/api-client/endpoints';

export default class TimesheetService {

    static createTimesheet = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_TIMESHEET, data, null, null, false);
    }

    static fetchAllTimesheet = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_TIMESHEET, null, null, null, false);
    }

    static deleteTimesheet = async (params) => {
        const endpoint = `${DELETE_TIMESHEET}/${params.id}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, endpoint, null, null, null, false);
    }
}