import SERVER from "../../../../store/axiosInstance";
import { EMPLOYEE } from "../../../../api-client/endpoints";

export const fetchEmployee = async () => {
    const data = await SERVER.get(EMPLOYEE);
    return data
}

export const addAllowance = (payload, id) => {
    return SERVER.patch('https://api.driftacademy.in/update-employee-allowance/' + id, {
        allowance: {
            ...payload
        }
    })
}
export const deleteAllowance = (userId, id) => {
    return SERVER.patch('https://api.driftacademy.in/delete-employee-allowance/' + userId + "/" + id)
}


export const addCommission = async (payload, id) => {
    return SERVER.patch('https://api.driftacademy.in/update-employee-commission/' + id, {
        commission: {
            ...payload
        }
    })
}
export const deleteEmployeeCommision = (userId, id) => {
    return SERVER.patch("https://api.driftacademy.in/delete-employee-commission/" + userId + "/" + id)
}
export const addEmployeeSalary = async () => {



    return
}
export const addLoan = async (payload, userId) => {
    return SERVER.patch('https://api.driftacademy.in/update-employee-loan/' + userId, {
        loan: {
            ...payload
        }
    })
}
export const addOvertime = async (payload, userId) => {

    return SERVER.patch('https://api.driftacademy.in/update-employee-overtime/' + userId, {
        overtime: {
            ...payload
        }
    })
}
export const deleteOvertime = async (userId, id) => {
    return SERVER.patch("https://api.driftacademy.in/delete-employee-overtime/" + userId + "/" + id)
}
export const addSaturationDeduction = async (payload, userId) => {



    return SERVER.patch('https://api.driftacademy.in/update-employee-sat-ded/' + userId, {
        saturation_deduction: {
            ...payload
        }
    })
}
export const deleteSaturationDeduction = async (userId, id) => {
    return SERVER.patch("https://api.driftacademy.in/delete-employee-sat-ded/" + userId + "/" + id)
}

export const addOtherPayment = async (payload, userId) => {
    return SERVER.patch('https://api.driftacademy.in/update-employee-other-pay/' + userId, {
        other_payment: {
            ...payload
        }
    })
}
export const deleteOtherPayment = async (userId, id) => {
    return SERVER.patch("https://api.driftacademy.in/delete-employee-other-pay/" + userId + "/" + id)
}

export const addSalary = async () => {
    return
}
export const addOther = async () => {
    return
}