import ApiClient from '../api-client/apiClient';
import { 
    CREATE_ACCOUNTLIST,
    FETCH_ACCOUNTS,
    DELETE_ACCOUNT,
    CREATE_PAYEE,
    FETCH_PAYEES,
    DELETE_PAYEE,
    CREATE_PAYER,
    FETCH_PAYERS,
    DELETE_PAYER,
    CREATE_DEPOSIT,
    FETCH_DEPOSITS,
    DELETE_DEPOSIT,
    CREATE_EXPENSE,
    FETCH_EXPENSES,
    DELETE_EXPENSE,
 } from 'src/api-client/endpoints';

export default class FinanceService {

    // Account List
     static createAccountList = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_ACCOUNTLIST, data, null, null, false);
    }

    static fetchAllAccountList = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_ACCOUNTS, null, null, null, false);
    }

    static deleteAccountList = async (params) => {
        const updatedURL = `${DELETE_ACCOUNT}${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
    }

    // Payees
    static createPayee = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_PAYEE, data, null, null, false);
    }

    static fetchAllPayee = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_PAYEES, null, null, null, false);
    }

    static deletePayee = async (params) => {
        const updatedURL = `${DELETE_PAYEE}${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
    }

     // Payers
     static createPayer = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_PAYER, data, null, null, false);
    }

    static fetchAllPayers = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_PAYERS, null, null, null, false);
    }

    static deletePayer = async (params) => {
        const updatedURL = `${DELETE_PAYER}${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
    }

     // Deposit
     static createDeposit = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_DEPOSIT, data, null, null, false);
    }

    static fetchAllDeposits = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_DEPOSITS, null, null, null, false);
    }

    static deleteDeposit = async (params) => {
        const updatedURL = `${DELETE_DEPOSIT}${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
    }

      // EXPENSE
      static createExpense = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_EXPENSE, data, null, null, false);
    }

    static fetchAllExpenses = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_EXPENSES, null, null, null, false);
    }

    static deleteExpense = async (params) => {
        const updatedURL = `${DELETE_EXPENSE}${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
    }
}