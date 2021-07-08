import ApiClient from "../api-client/apiClient";
import {
  CREATE_TRAINING_LIST,
  FETCH_TRAINING,
  DELETE_TRAINING,
  UPDATE_TRAINING,
  CREATE_TRAINING_TYPE,
  FETCH_TRAINING_TYPE,
} from "src/api-client/endpoints";

export default class TrainingListService {
  static createTraining = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_TRAINING_LIST,
      data,
      null,
      null,
      false
    );
  };
  static getTraining = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_TRAINING,
      data,
      null,
      null,
      false
    );
  };
  static deleteTraining = async (params) => {
    const updatedURL = `${DELETE_TRAINING}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
  };

  static updateTraining = async (params) => {
    const updatedURL = `${UPDATE_TRAINING}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.PUT, updatedURL, null, null, null, false);
  };

  static getTrainingType = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_TRAINING_TYPE,
      data,
      null,
      null,
      false
    );
  };

  static createTrainingType = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_TRAINING_TYPE,
      data,
      null,
      null,
      false
    );
  };
}
