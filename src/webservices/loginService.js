import ApiClient from "../api-client/apiClient";
import { LOGIN, LOGOUT, GETME } from "src/api-client/endpoints";

export default class LoginService {
  static login = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.POST,
      LOGIN,
      data,
      null,
      null,
      false
    );
  };

  static logout = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      LOGOUT,
      null,
      null,
      null,
      false
    );
  };

  static getMe = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      GETME,
      data,
      null,
      null,
      false
    );
  };
}
