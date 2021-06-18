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
  const {departments} = props;

  const formik = useFormik({
    initialValues: {
      department: "",
      name: "",
    },
    validate: (values) => {
      const error = {};
      // if (values.departmentName.length === 0) {
      //   error.departmentNameError = "Please select department";
      // }

      // if (values.designationName.length === 0) {
      //   error.designationNameError = "Please enter designation name";
      // }

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
                    label="Select Department"
                    variant="outlined"
                    fullWidth
                    select
                    onChange={formik.handleChange}
                    name="department"
                  >
                    {departments && departments.length > 0 && departments.map((department, index) => (
                      <MenuItem key={index} value={department}>
                        {department.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box mt={3}>
                  <TextField
                    label="Designation Name"
                    variant="outlined"
                    fullWidth
                    // helperText={formik.errors.desginationNameError && "Invalid Name"}
                    // error={formik.errors.desginationNameError && true}
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
  departments: PropTypes.array,
};

export default TransitionsModal;
