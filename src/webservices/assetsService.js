import ApiClient from '../api-client/apiClient';
import { 
    CREATE_ASSET,
    FETCH_ASSETS,
    DELETE_ASSET
 } from 'src/api-client/endpoints';

export default class AssetsService {

     static createAsset = async (data) => {
        return await ApiClient.call(ApiClient.requestMethod.PUT, CREATE_ASSET, data, null, null, false);
    }

    static fetchAllAssets = async () => {
        return await ApiClient.call(ApiClient.requestMethod.GET, FETCH_ASSETS, null, null, null, false);
    }

    static deleteAsset = async (params) => {
        const updatedURL = `${DELETE_ASSET}${params}`;
        return await ApiClient.call(ApiClient.requestMethod.DELETE, updatedURL, null, null, null, false);
    }
}