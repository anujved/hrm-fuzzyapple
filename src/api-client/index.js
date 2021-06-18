import Axios from "axios";
import EnvConfig from "src/utils/envConfig";
import Logger from "src/utils/logger";

export default class ApiClient {
  static RequestMethodType = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
  };

  static addCommonHeaders(headers) {
    headers["Content-Type"] = "application/json";
    headers["Accept"] = "application/json";
    return headers;
  }

  static async call(
    methodType,
    requestUrl,
    payload,
    apiHeaders,
    params
  ) {
    let headers = apiHeaders ? apiHeaders : {};
    let requestParams = params ? params : {};

    // add common headers
    headers = this.addCommonHeaders(headers);

    // add auth header
    let token = ""; // Get token from the localStorage
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    Logger.log(
      "Web Service Request URL: ",
      EnvConfig.getBaseUrl() + requestUrl
    );
    Logger.log("Web Service method type: ", methodType);
    Logger.log("Web Service headers: ", headers);
    Logger.log("Web Service request payload: ", payload);
    Logger.log("Web Service params: ", requestParams);

    //create axios instance with basic config
    let axiosInstance = Axios.create({
      baseURL: EnvConfig.getBaseUrl(),
    });

    try {
      let response = await axiosInstance.request({
        method: methodType,
        url: requestUrl,
        data: payload,
        headers: headers,
        params: requestParams,
      });

      Logger.log("Web Service response: ", response);

      if (response.status === 200 || response.status === 201) {
        if (response.data !== null) {
          if (!response.data.success) {
            throw new HRMSError(response.data.errors[0]);
          }
          return response.data.data;
        } else {
          throw new Error('Something went wrong');
        }
      } else {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      Logger.log("Web Service Error: ", error);
      if (error.response) {
        if (error.response.status == 401) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          Logger.recordError(error);
          // Logout the user if 401 occured
          //TODO: show alert and dispatch logout action here
        } else {
          throw error;
        }
      } else if (error.request) {
        console.log("ApiClient-error.request", error);
        // The request was made but no resposne was received
        throw error;
      } else {
        //Something happened in setting up the request that triggered the Error
        throw error;
      }
    }
  }
}
