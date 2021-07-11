import axios from "axios";
import {EMPLOYEE} from "../api-client/endpoints";
import MockAdapter from "axios-mock-adapter";

const SERVER = axios.create({

    baseURL: 'https://api.driftacademy.in',

    timeout: 1000,

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

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
 var mock = new MockAdapter(SERVER);
 mock.onGet(EMPLOYEE).reply(200, {
    data:[{
        id: 1,
        employeeId: '#EMP0886787',
        name: 'Karie Smith',
        payrollType: 'Monthly Slip',
        salary: '$300000',
        netSalary: '$310000',
        status: 'unpaid',
    },
    {
        id: 1,
        employeeId: '#EMP08834387',
        name: 'Will Clare',
        payrollType: 'Hourly Slip',
        salary: '$300000',
        netSalary: '$310000',
        status: 'paid',
    }],
    success:true,
    error:false,
    message:''
  });

}

  export default SERVER;