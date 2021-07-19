import axios from 'axios';

export default class ApiClient {

    static requestMethod = {
        GET: 'GET',
        POST: 'POST',
        DELETE: 'DELETE',
        PUT: 'PUT',
    }

    static addCommonHeaders(headers) {
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
        return headers;
    }

    static async call(methodType, url, payload, params, apiHeaders, isAuthTokenRequired = true) {

        let headers = apiHeaders ? apiHeaders : {};
        let requestParams = params ? params : {};

        headers = this.addCommonHeaders(headers);
        const token = '';

        if (isAuthTokenRequired) {
            headers["Authorization"] = "Bearer " + token;
        }

        let axiosInstance = axios.create({ baseURL: "https://api.driftacademy.in" });

        try {
            let response = await axiosInstance.request({
                method: methodType,
                url: url,
                data: payload,
                params: requestParams,
                headers: headers,
            });
            if (response.status === 200) {
                if (response.data != null) {
                    return response.data;
                } else {
                    throw new Error('Something went wrong');
                }
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            throw error;
        }

    }
}