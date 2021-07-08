import ApiClient from "../api-client/apiClient";
import {
  CREATE_TRAINER,
  FETCH_TRAINER,
  DELETE_TRAINER,
  UPDATE_TRAINER,
} from "src/api-client/endpoints";

export default class TrainerService {
  static createTrainer = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_TRAINER,
      data,
      null,
      null,
      false
    );
  };
  static getTrainer = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_TRAINER,
      data,
      null,
      null,
      false
    );
  };

  static deleteTrainer = async (params) => {
    const updatedURL = `${DELETE_TRAINER}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
  }

  static updateTrainer = async (params) => {
    const updatedURL = `${UPDATE_TRAINER}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.PUT, updatedURL, null, null, null, false);
  }

}
