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
import EventService from "src/webservices/eventService";
import ConstantService from "src/webservices/constantsService";
import EmployeeService from "src/webservices/employeeService";
import { useFormik } from "formik";

const CreateEventModal = ({
  open,
  onCloseClickListener,
  branches,
  employees,
  departments,
  onSubmitClickListener,
}) => {
  const [eventStartDate, setEventStartDate] = useState(Date.now());
  const [eventEndDate, setEventEndDate] = useState(Date.now());

  const formik = useFormik({
    initialValues: {
      branch: "",
      employee: "",
      department: "",
      event_title: "",
      event_color: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.event_title.length === 0) {
        errors.event_title_error = "required";
      }
      if (values.description.length === 0) {
        errors.description_error = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        event_title: values.event_title,
        event_description: values.description,
        event_end_date: eventEndDate._d,
        start_event_date: eventStartDate._d,
        event_select_color: values.event_color,
        event_description: values.description,
      };
      console.log("--data--", data);
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
              <Typography>Create New Event</Typography>
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
                    branches.map((option) => (
                      <MenuItem key={option._id} value={option}>
                        {option.branchName}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  name="department"
                  select
                >
                  {departments &&
                    departments.map((option) => (
                      <MenuItem key={option._id} value={option}>
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Employee"
                  variant="outlined"
                  fullWidth
                  onChange={formik.handleChange}
                  name="employee"
                  select
                >
                  {employees &&
                    employees.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option.personalDetail.employeeName}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Event Title"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.event_title_error}
                  error={formik.errors.event_title_error && true}
                  onChange={formik.handleChange}
                  name="event_title"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Event Start Date"
                  value={eventStartDate}
                  fullWidth
                  onChange={(value) => setEventStartDate(value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Event End Date"
                  value={eventEndDate}
                  fullWidth
                  onChange={(date) => setEventEndDate(date)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Enter Event Description"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.description_error}
                  error={formik.errors.description_error && true}
                  onChange={formik.handleChange}
                  name="description"
                  multiline
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <TextField
                  label="event color"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.description_error}
                  error={formik.errors.description_error && true}
                  onChange={formik.handleChange}
                  name="description"
                  multiline
                />
              </Grid> */}
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

export default CreateEventModal;
