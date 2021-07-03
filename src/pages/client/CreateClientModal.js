import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import ConstantService from "src/webservices/constantsService";
import EmployeeService from "src/webservices/employeeService";
import { useFormik } from "formik";

const CreateClientModal = ({
  open,
  onCloseClickListener,
  name,
  status,
  company,
  address,
  phone,
  onSubmitClickListener,
}) => {
  const [meetingDate, setMeetingDate] = useState(Date.now);
  const [meetingTime, setMeetingTime] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      company: "",
      address: "",
      phone: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.name.length === 0) {
        errors.nameError = "required";
      }
      if (values.status.length === 0) {
        errors.statusError = "required";
      }
      if (values.phone.length === 0) {
        errors.phoneError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        name: values.name,
        status: values.status,
        company: values.company,
        phone: values.phone,
        address: values.address,
        phone: values.phone,
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
    },
    validateOnChange: false,
  });

  return (
    <div>
      <Dialog open={open} onClose={onCloseClickListener}>
        <Box py={2} px={4}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New Client</Typography>
              <IconButton onClick={onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  helperText={formik.errors.nameError}
                  error={formik.errors.nameError && true}
                  name="name"
                >
                  {name}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Status"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  helperText={formik.errors.statusError}
                  error={formik.errors.statusError && true}
                  name="status"
                >
                  {status}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Company"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  name="company"
                >
                  {company}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="address"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.meetingTitleError}
                  error={formik.errors.meetingTitleError && true}
                  onChange={formik.handleChange}
                  name="address"
                >
                  {address}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="phone"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.phoneError}
                  error={formik.errors.phoneError && true}
                  onChange={formik.handleChange}
                  name="phone"
                  multiline
                >
                  {phone}
                </TextField>
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

export default CreateClientModal;
