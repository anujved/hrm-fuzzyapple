import SERVER from "../../../../store/axiosInstance";
import { EMPLOYEE } from "../../../../api-client/endpoints";

export const fetchEmployee = async () => {
    const data = await SERVER.get(EMPLOYEE);
    return data
}

export const addAllowance =  (payload, id) => {
    return  SERVER.patch('https://api.driftacademy.in/update-employee-allowance/'+id, {
            allowance: {
               ...payload
           }
        })
    }
export const deleteAllowance =  (id) => {
    return  SERVER.patch('https://api.driftacademy.in/delete-employee-allowance/'+id)
    }


export const addCommission = async () => {
    


    return 
}
export const addEmployeeSalary = async () => {
    


    return 
}
export const addLoan = async () => {
    


    return 
}
export const addOvertime = async () => {
    


    return 
}
export const addSaturationDeduction = async () => {
    


    return 
}

export const addSalary = async () => {
    return
}
export const addOther = async () => {
    return
}