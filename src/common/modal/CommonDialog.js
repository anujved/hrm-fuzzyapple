import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CommonDialog = (props) => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={props.onCloseClickListener}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open} style={{ width: "50vw" }}>
        <div className={classes.paper}>{props.chilren}</div>
      </Fade>
    </Modal>
  );
};

CommonDialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onCloseClickListener: PropTypes.func,
};

export default CommonDialog;
