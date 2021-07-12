import axios from "axios";
import {EMPLOYEE} from "../api-client/endpoints";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuid } from "uuid";

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
      "id": "582fa2b5-73c2-4b33-89ec-a6a610cc90f1",
      "createdAt": 1555016400000,
      "name": "Kerie",
      "employeeId": "#EMP003458",
      "lastLogin": "2021-04-19 18:23:30",
      "payrollType": "Monthly Payslip",
      "salary": "$10,000.00",
      "netSalary": "$11,662.00",
      "allowanceOption": "Taxables",
      "title": 'test',
      "amount": 1000000,
      "loanOptions": 'Health Insurance',
      "laonAmount": '$10,000',
      "startDate": 'Mar 1, 2020',
      "endDate": 'Mar 9, 2020',
      "deductionOption": "Social Security System",
      "numberOfDays": 10,
      "hours": 10,
      "rate": '$100',
    },
    {
      "id": "2df0172b-77b0-4899-9117-4ee775b96f52",
      "createdAt": 1555016400000,
      "name": "Kerie",
      "employeeId": "#EMP0034346",
      "lastLogin": "2021-04-19 18:23:30",
      "payrollType": "Hourly Payslip",
      "salary": "$25,000.00",
      "netSal": "$29,000.00",
      "allowanceOption": "Taxables",
      "title": 'test',
      "amount": 1000000,
      "loanOptions": 'Health Insurance',
      "laonAmount": '$10,000',
      "startDate": 'Mar 1, 2020',
      "endDate": 'Mar 9, 2020',
      "deductionOption": "Social Security System",
      "numberOfDays": 10,
      "hours": 10,
      "rate": '$200',
    }],
    success:true,
    error:false,
    message:''
  });

}

  export default SERVER;