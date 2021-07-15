import axios from "axios";
import {EMPLOYEE} from "../api-client/endpoints";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuid } from "uuid";

const SERVER = axios.create({

    baseURL: 'https://api.driftacademy.in',

    // timeout: 1000,

});

  SERVER.interceptors.request.use(function (config) {

    const token = '';

    config.headers['Authorization'] = "Bearer " + token;

    return config;

}, function (error) {

    return Promise.reject(error);

});

  SERVER.interceptors.response.use(function (response) {
          
    return response?.data
  
}, function (error) {

    return Promise.reject(error);

});

/**
 * @description mock api response is starting
 */

// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
// //  var mock = new MockAdapter(SERVER);
 

// }

  export default SERVER;