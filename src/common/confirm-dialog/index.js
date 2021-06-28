import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialog = ({open = false, onCancelClickListener, onConfirmClickListener}) => {

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCancelClickListener}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        Are you sure?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
            This action can not be undone. Do you want to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onConfirmClickListener} color="primary">
          Yes
        </Button>
        <Button onClick={onCancelClickListener} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
