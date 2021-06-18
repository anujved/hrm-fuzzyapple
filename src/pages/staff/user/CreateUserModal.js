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
  MenuItem,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useFormik } from "formik";
import axios from "axios";

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
  console.log("--props---", props);
  const classes = useStyles();
  const { roles, user } = props || {};
  const [role, setRole] = React.useState(props.user ? props.user?.role : "");

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      // role: ""
    },
    validate: (values) => {
      const errors = {};
      if (formik.touched.name && !formik.values.name) {
        errors.nameError = "required";
      }

      if (formik.touched.email && !formik.values.email) {
        errors.emailError = "required";
      }

      if (formik.touched.password && !formik.values.password) {
        errors.passwordError = "required";
      }
      
      console.log(errors);
      return errors;
    },
    onSubmit: (values) => {
      const data = { ...values, role };
      // alert(JSON.stringify(data));
      console.log("--data--", data);
      const endpoint = process.env.REACT_APP_BASE_URL+"/create-user";
      axios
        .put(endpoint, data)
        .then((res) => {
          props.onCreateUserSuccessListener(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validateOnChange: true,
  });

  const _onCancelClickListener = () => {
    formik.errors.nameError = null;
    formik.errors.emailError = null;
    formik.errors.passwordError = null;
    formik.errors.roleError = null;

    props.onCloseClickListener();
  };

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
          <Grid container alignItems="center">
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
            <form onSubmit={formik.handleSubmit} style={{ width: "100vw" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box mt={3}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={user ? user.name : formik.values.name}
                      helperText={formik.errors.nameError}
                      error={formik.errors.nameError && true}
                      onChange={formik.handleChange}
                      id="name"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mt={3}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={user ? user.email : formik.values.email}
                      helperText={formik.errors.emailError}
                      error={formik.errors.emailError && true}
                      onChange={formik.handleChange}
                      id="email"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mt={3}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      value={user ? user.password : formik.values.password}
                      helperText={formik.errors.passwordError}
                      error={formik.errors.passwordError && true}
                      onChange={formik.handleChange}
                      id="password"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box mt={3}>
                    <TextField
                      label="Role"
                      variant="outlined"
                      fullWidth
                      select
                      value={user ? user.role : role}
                      // helperText={formik.errors.roleError}
                      // error={formik.errors.roleError && true}
                      onChange={handleRoleChange}
                      id="role"
                    >
                      {roles?.map((option) => (
                        <MenuItem key={option.roleType} value={option.roleType}>
                          {option.roleType}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} justifyContent="flex-start">
                <Box mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginRight: 10 }}
                  >
                    Create
                  </Button>
                  <Button onClick={_onCancelClickListener}>Cancel</Button>
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
