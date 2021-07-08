import ApiClient from "../api-client/apiClient";
import {
  CREATE_ROLE,
  GET_MODULES,
  DELETE_ROLE,
  UPDATE_ROLE,
  FETCH_ROLES,
} from "src/api-client/endpoints";

export default class RoleService {
  static createRole = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_ROLE,
      data,
      null,
      null,
      false
    );
  };

  static fetchAllRoles = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_ROLES,
      null,
      null,
      null,
      false
    );
  };

  static deleteRole = async (params) => {
    const updatedURL = `${DELETE_ROLE}${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  static fetchModules = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      GET_MODULES,
      null,
      null,
      null,
      false
    );
  };
}
