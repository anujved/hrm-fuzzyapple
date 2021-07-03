import ApiClient from "../api-client/apiClient";
import {
  CREATE_ANNOUNCEMENT,
  FETCH_ANNOUNCEMENTS,
  DELETE_ANNOUNCEMENT,
  CREATE_AWARD,
  FETCH_AWARDS,
  DELETE_AWARD,
  CREATE_TRANSFER,
  FETCH_TRANSFERS,
  DELETE_TRANSFER,
  CREATE_RESIGNATION,
  FETCH_RESIGNATIONS,
  DELETE_RESIGNATION,
  CREATE_TRIP,
  FETCH_TRIPS,
  DELETE_TRIP,
  CREATE_PROMOTION,
  FETCH_PROMOTIONS,
  DELETE_PROMOTION,
  CREATE_COMPLAINT,
  FETCH_COMPLAINTS,
  DELETE_COMPLAINT,
  CREATE_WARNING,
  FETCH_WARNINGS,
  DELETE_WARNING,
  CREATE_TERMINATION,
  FETCH_TERMINATIONS,
  DELETE_TERMINATION,
  CREATE_HOLIDAY,
  FETCH_HOLIDAYS,
  DELETE_HOLIDAY,
} from "src/api-client/endpoints";

export default class HrServices {
  // announcements

  static createAnnouncement = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_ANNOUNCEMENT,
      data,
      null,
      null,
      false
    );
  };

  static fetchAnnouncements = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_ANNOUNCEMENTS,
      null,
      null,
      null,
      false
    );
  };

  static deleteAnnouncement = async (params) => {
    const updatedURL = `${DELETE_ANNOUNCEMENT}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // awards
  static createAward = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_AWARD,
      data,
      null,
      null,
      false
    );
  };

  static fetchAwards = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_AWARDS,
      null,
      null,
      null,
      false
    );
  };

  static deleteAward = async (params) => {
    const updatedURL = `${DELETE_AWARD}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // Transfer
  static createTransfer = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_TRANSFER,
      data,
      null,
      null,
      false
    );
  };

  static fetchTransfers = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_TRANSFERS,
      null,
      null,
      null,
      false
    );
  };

  static deleteTransfer = async (params) => {
    const updatedURL = `${DELETE_TRANSFER}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // Resignation
  static createResignation = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_RESIGNATION,
      data,
      null,
      null,
      false
    );
  };

  static fetchResignations = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_RESIGNATIONS,
      null,
      null,
      null,
      false
    );
  };

  static deleteResignation = async (params) => {
    const updatedURL = `${DELETE_RESIGNATION}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // Trip
  static createTrip = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_TRIP,
      data,
      null,
      null,
      false
    );
  };

  static fetchTrips = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_TRIPS,
      null,
      null,
      null,
      false
    );
  };

  static deleteTrip = async (params) => {
    const updatedURL = `${DELETE_TRIP}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // Promotion
  static createPromotion = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_PROMOTION,
      data,
      null,
      null,
      false
    );
  };

  static fetchPromotions = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_PROMOTIONS,
      null,
      null,
      null,
      false
    );
  };

  static deletePromotion = async (params) => {
    const updatedURL = `${DELETE_PROMOTION}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // Complaints
  static createComplaint = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_COMPLAINT,
      data,
      null,
      null,
      false
    );
  };

  static fetchComplaints = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_COMPLAINTS,
      null,
      null,
      null,
      false
    );
  };

  static deleteComplaint = async (params) => {
    const updatedURL = `${DELETE_COMPLAINT}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // Warning
  static createWarning = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_WARNING,
      data,
      null,
      null,
      false
    );
  };

  static fetchWarnings = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_WARNINGS,
      null,
      null,
      null,
      false
    );
  };

  static deleteWarning = async (params) => {
    const updatedURL = `${DELETE_WARNING}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // Termination
  static createTermination = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_TERMINATION,
      data,
      null,
      null,
      false
    );
  };

  static fetchTerminations = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_TERMINATIONS,
      null,
      null,
      null,
      false
    );
  };

  static deleteTermination = async (params) => {
    const updatedURL = `${DELETE_TERMINATION}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };

  // Holiday
  static createHoliday = async (data) => {
    return await ApiClient.call(
      ApiClient.requestMethod.PUT,
      CREATE_HOLIDAY,
      data,
      null,
      null,
      false
    );
  };

  static fetchHolidays = async () => {
    return await ApiClient.call(
      ApiClient.requestMethod.GET,
      FETCH_HOLIDAYS,
      null,
      null,
      null,
      false
    );
  };

  static deleteHoliday = async (params) => {
    const updatedURL = `${DELETE_HOLIDAY}/${params}`;
    return await ApiClient.call(
      ApiClient.requestMethod.DELETE,
      updatedURL,
      null,
      null,
      null,
      false
    );
  };
}
