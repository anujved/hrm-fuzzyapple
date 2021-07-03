import ApiClient from "../api-client/apiClient";
import {
  CREATE_ClIENT,
  FETCH_CLIENTS,
  DELETE_CLIENT,
  UPDATE_CLIENT,
} from "src/api-client/endpoints";

export default class EventService {
  // Account List
  static createClient = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_ClIENT,
      data,
      null,
      null,
      false
    );
  };

  static fetchAllClients = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_CLIENTS,
      null,
      null,
      null,
      false
    );
  };

  static deleteClient = async (params) => {
    const updatedURL = `${DELETE_CLIENT}${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  static updateClient = async (params) => {
    const updatedURL = `${UPDATE_CLIENT}${params}`;
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
