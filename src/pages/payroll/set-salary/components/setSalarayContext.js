import React, { createContext, useEffect, useState } from "react";
import CommonDialog from "../../../../common/modal/CommonDialog";
import {
  editEmployeeSalary,
  addAllowance,
  addLoan,
  addCommission,
  addOtherPayment,
  addOvertime,
  addSaturationDeduction,
} from "../store/actions"
import { useDispatch } from "react-redux";

const SetSallaryContext = createContext();

const SetSallaryProvider = ({ children }) => {
  const [isOpen, setIsopen] = useState(false);
  const [RenderComponent, setEnderComponent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const dispatch = useDispatch()
 
  const OpenDialogWithForm = (component) => {
      setEnderComponent(component[0]);
      setDialogTitle(component[1]);
      setIsopen(true);
  };
  
  const CloseDialogWithForm = () => {
    setIsopen(false);
    setEnderComponent(null);
  };
 
  const AllowanceSubmitHandler = (e) => {
    console.log(e)
    dispatch(addAllowance(e))
  }

  const LoanSubmitHandler = (e) => {
    console.log(e)
    dispatch(addLoan(e))

  }
  
  const EmployeeSetSalaryHanlder = (e) => {
    console.log(e)
    dispatch(editEmployeeSalary(e))
  }
  const CommissionHanlder = (e) => {
    console.log(e)
    dispatch(addCommission(e))

  }
  const OtherPaymentsHanlder = (e) => {
    console.log(e)
    dispatch(addOtherPayment(e))

  }
  const SaturationHandler = (e) => {
    console.log(e)
    dispatch(addSaturationDeduction(e))

  }
 
  const OvertimeHandler = (e) => {
    console.log(e)
    dispatch(addOvertime(e))

  }

  return (
    <SetSallaryContext.Provider value={
      {
        OpenDialogWithForm,
        AllowanceSubmitHandler,
        LoanSubmitHandler,
        EmployeeSetSalaryHanlder,
        CommissionHanlder,
        OtherPaymentsHanlder,
        SaturationHandler,
        OvertimeHandler
      }}>
      <>
        {children}
        <CommonDialog
          open={isOpen}
          onCloseClickListener={CloseDialogWithForm}
          title={dialogTitle}
        >
         {RenderComponent}
        </CommonDialog>
      </>
    </SetSallaryContext.Provider>
  );
};

export { SetSallaryProvider, SetSallaryContext };
