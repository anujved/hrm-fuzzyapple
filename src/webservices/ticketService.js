import ApiClient from '../api-client/apiClient';
import { 
    CREATE_TICKET,
    FETCH_TICKET,
    DELETE_TICKET
 } from 'src/api-client/endpoints';

export default class TicketService {

     static createTicket = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_TICKET, data, null, null, false);
    }

    static fetchAllTicket = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_TICKET, null, null, null, false);
    }

    static deleteTicket = async (params) => {
        return await ApiClient.call(ApiClient.requestMethod.DELETE, DELETE_TICKET, null, params, null, false);
    }
}