import SERVER from "../../../../store/axiosInstance";
import {EMPLOYEE} from "../../../../api-client/endpoints";

export const fetchEmployee = async () => {
    
    const data = await SERVER.get(EMPLOYEE);
    console.log(data);
    return data

}