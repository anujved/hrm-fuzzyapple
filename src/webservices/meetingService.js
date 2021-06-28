import ApiClient from '../api-client/apiClient';
import { 
    CREATE_MEETING,
    FETCH_MEETING,
    DELETE_MEETING
 } from 'src/api-client/endpoints';

export default class MeetingService {

     static createMeeting = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_MEETING, data, null, null, false);
    }

    static fetchAllMeeting = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_MEETING, null, null, null, false);
    }

    static deleteMeeting = async (params) => {
        const updatedURL = `${DELETE_MEETING}${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
    }
}