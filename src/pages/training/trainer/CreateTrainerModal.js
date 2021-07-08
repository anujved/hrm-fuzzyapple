import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";


const CreateTrainerModal = ({ open, onCloseClickListener, branches, onSubmitClickListener }) => {

  const formik = useFormik({
    initialValues: {
      branch: "",
      firstname: "",
      lastname: "",
      contact: "",
      email: "",
      expertise: "",
      address: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.firstname.length === 0) {
        errors.firstNameError = "required";
      }
      if (values.expertise.length === 0) {
        errors.expertiseError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        first_name: values.firstname,
        last_name: values.lastname,
        contact: values.contact,
        email: values.email,
        branch: values.branch,
        expertise: values.expertise,
        address: values.address,
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
    },
    validateOnChange: false,
  });
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        aria-labelledby="form-dialog-title"
      >
        <Box py={2} px={4}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New Trainer</Typography>
              <IconButton onClick={onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Branch"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  name="branch"
                  select
                >
                  {branches &&
                    branches.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option.branchName}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Firstname"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.nameError && "Invalid Name"}
                  error={formik.errors.nameError && true}
                  onChange={formik.handleChange}
                  id="firstname"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Lastname"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.nameError && "Invalid Name"}
                  // error={formik.errors.nameError && true}
                  onChange={formik.handleChange}
                  name="lastname"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact"
                  variant="outlined"
                  fullWidth
                  // helperText={formik.errors.nameError && "Invalid Name"}
                  // error={formik.errors.nameError && true}
                  onChange={formik.handleChange}
                  name="contact"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  // helperText={formik.errors.nameError && "Invalid Name"}
                  // error={formik.errors.nameError && true}
                  onChange={formik.handleChange}
                  name="email"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Expertise"
                  variant="outlined"
                  fullWidth
                  // helperText={formik.errors.nameError && "Invalid Name"}
                  // error={formik.errors.nameError && true}
                  onChange={formik.handleChange}
                  name="expertise"
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  // helperText={formik.errors.nameError && "Invalid Name"}
                  // error={formik.errors.nameError && true}
                  onChange={formik.handleChange}
                  name="address"
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  style={{ marginRight: 10 }}
                >
                  Create
                </Button>
                <Button>Cancel</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateTrainerModal;
