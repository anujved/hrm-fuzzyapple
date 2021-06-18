import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  IconButton,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useFormik } from "formik";
import MenuItem from '@material-ui/core/MenuItem';

const options = [
  {
    value: 'Required',
    label: 'Required',
  },
  {
    value: 'Not Required',
    label: 'Not Required',
  }
];

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

const TransitionsModal = (props) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      isRequired: "",
      name: "",
    },
    validate: (values) => {
      const error = {};
      if (values.name.length === 0) {
        error.nameError = "Document name is required";
      }
      return error;
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      props.onChangeText(values);
    },
    validateOnChange : true
  });

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
        <div className={classes.paper}>
          <Grid container style={{ alignItems: "center" }}>
            <Grid item xs={12} md={6}>
              <Typography>{props.title}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <IconButton
                style={{ float: "right" }}
                onClick={props.onCloseClickListener}
                color="primary"
              >
                <CancelRoundedIcon />
              </IconButton>
            </Grid>
            <form onSubmit={formik.handleSubmit} style={{width: '100vw'}} autoComplete="off">
              <Grid item xs={12} md={12}>
                <Box mt={3}>
                  <TextField
                    label="Required Field"
                    variant="outlined"
                    fullWidth
                    select
                    onChange={formik.handleChange}
                    name="isRequired"
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box mt={3}>
                  <TextField
                    label="Document Name"
                    variant="outlined"
                    fullWidth
                    helperText={formik.errors.nameError}
                    error={formik.errors.nameError && true}
                    onChange={formik.handleChange}
                    name="name"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={12} justifyContent="flex-start">
                <Box mt={3}>
                  <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                    Create
                  </Button>
                  <Button>Cancel</Button>
                </Box>
              </Grid>
            </form>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

TransitionsModal.propTypes = {
  title: PropTypes.string,
  closeButtonText: PropTypes.string,
  open: PropTypes.bool,
  onCloseClickListener: PropTypes.func,
  onChangeText: PropTypes.func,
};

export default TransitionsModal;
