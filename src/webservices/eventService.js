import ApiClient from "../api-client/apiClient";
import {
  CREATE_EVENT,
  FETCH_EVENTS,
  DELETE_EVENT,
  UPDATE_EVENT,
} from "src/api-client/endpoints";

export default class EventService {
  // Account List
  static createEvent = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_EVENT,
      data,
      null,
      null,
      false
    );
  };

  static fetchAllEvents = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_EVENTS,
      null,
      null,
      null,
      false
    );
  };

  static deleteEvent = async (params) => {
    const updatedURL = `${DELETE_EVENT}${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  static updateEvent = async (params) => {
    const updatedURL = `${UPDATE_EVENT}${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };
}
