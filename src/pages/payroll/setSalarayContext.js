import React, { createContext, useEffect, useState } from "react";
import CommonDialog from "../../common/modal/CommonDialog";

const SetSallaryContext = createContext();

const SetSallaryProvider = ({ children }) => {
  const [isOpen, setIsopen] = useState(false);
  const [renderComponent, setEnderComponent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");
  const OpenDialogWithForm = () => {
    setIsopen(true);

    setDialogTitle("working")
  };
  const CloseDialogWithForm = () => {
    setIsopen(false);
    setEnderComponent(null);
  };

  return (
    <SetSallaryContext.Provider value={{ OpenDialogWithForm }}>
      <>
        {children}
        <CommonDialog open={isOpen} onCloseClickListener={CloseDialogWithForm} title={dialogTitle}>
          {renderComponent}
        </CommonDialog>
      </>
    </SetSallaryContext.Provider>
  );
};

export { SetSallaryProvider, SetSallaryContext };
