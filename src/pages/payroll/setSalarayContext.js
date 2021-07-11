import React, { createContext, useEffect, useState } from "react";
import CommonDialog from "../../common/modal/CommonDialog";


const SetSallaryContext = createContext();

const SetSallaryProvider = ({ children }) => {
  const [isOpen, setIsopen] = useState(false);
  const [RenderComponent, setEnderComponent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
 
  const OpenDialogWithForm = (component) => {
      setEnderComponent(component[0]);
      setDialogTitle(component[1]);
      setIsopen(true);
  };
  
  const CloseDialogWithForm = () => {
    setIsopen(false);
    setEnderComponent(null);
  };
  const AllowanceSubmitHandler = (e) =>{
    console.log(e)
  }


  return (
    <SetSallaryContext.Provider value={{ OpenDialogWithForm, AllowanceSubmitHandler }}>
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
