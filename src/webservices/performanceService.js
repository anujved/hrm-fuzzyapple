import ApiClient from "../api-client/apiClient";
import {
CREATE_INDICATOR,
FETCH_INDICATOR,
DELETE_INDICATOR,
UPDATE_INDICATOR,
CREATE_APPRAISAL,
FETCH_APPRAISAL,
DELETE_APPRAISAL,
UPDATE_APPRAISAL,
CREATE_GOAL_TRACKING,
FETCH_GOALS,
DELETE_GOAL_TRACK,
UPDATE_GOAL_TRACK,
} from "src/api-client/endpoints";

export default class PerformanceService {
  static createIndicator = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_INDICATOR,
      data,
      null,
      null,
      false
    );
  };
  static getIndicator = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_INDICATOR,
      data,
      null,
      null,
      false
    );
  };
  static deleteIndicator = async (params) => {
    const updatedURL = `${DELETE_INDICATOR}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
  };

  static updateIndicator = async (params) => {
    const updatedURL = `${UPDATE_INDICATOR}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.PUT, updatedURL, null, null, null, false);
  };

  static createAppraisal = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_APPRAISAL,
      data,
      null,
      null,
      false
    );
  };
  static getAppraisal = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_APPRAISAL,
      data,
      null,
      null,
      false
    );
  };
  static deleteAppraisal = async (params) => {
    const updatedURL = `${DELETE_APPRAISAL}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
  };

  static updateAppraisal = async (params) => {
    const updatedURL = `${UPDATE_APPRAISAL}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.PUT, updatedURL, null, null, null, false);
  };

  static createGoalTracking = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_GOAL_TRACKING,
      data,
      null,
      null,
      false
    );
  };
  static getGoalTracks = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_GOALS,
      data,
      null,
      null,
      false
    );
  };
  static deleteGoalTrack = async (params) => {
    const updatedURL = `${DELETE_GOAL_TRACK}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
  };

  static updateGoalTrack = async (params) => {
    const updatedURL = `${UPDATE_GOAL_TRACK}/${params}`;
    return await ApiClient.call(ApiClient.requestMethod.PUT, updatedURL, null, null, null, false);
  };
}
