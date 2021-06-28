import React from "react";
import {
  Grid,
  Typography,
  Dialog,
  IconButton,
  Button,
  TextField,
  Box,
  MenuItem,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import { useFormik } from "formik";

const CreateEventModal = ({
  open,
  onCloseClickListener,
  branches,
  employees,
  departments,
  onSubmitClickListener,
}) => {
    const [eventStartDate, setEventStartDate] = React.useState(Date.now);
    const [eventEndDate, setEventEndDate] = React.useState(Date.now);

    const formik = useFormik({
        initialValues: {
          branch: "",
          department: "",
          employee: "",
          eventTitle: "",
          description: "",
        },
        validate: (values) => {
          const errors = {};
          if (values.subject.length === 0) {
            errors.subjectError = "required";
          }
          if (values.description.length === 0) {
            errors.descriptionError = "required";
          }
          return errors;
        },
        onSubmit: (values) => {
          const data = {
            branch: values.branch,
            department: values.department,
            employee: values.employee,
            event_title: values.eventTitle,
            description: values.description,
            event_start_date: eventStartDate._d,
            event_end_date: eventEndDate._d,
          };
          // alert(JSON.stringify(data));
          onSubmitClickListener(data);
        },
        validateOnChange: false,
      });
  return (
    <>
      <Dialog open={open} onClose={onCloseClickListener}>
        <Box py={2} px={4}>
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
                  helperText={formik.errors.meetingTitleError}
                  error={formik.errors.meetingTitleError && true}
                  onChange={formik.handleChange}
                  name="eventTitle"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Start Date"
                  value={eventStartDate}
                  fullWidth
                  onChange={(value) => setEventStartDate(value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  label="End Date"
                  variant="inline"
                  autoOk
                  format="DD/MM/yyyy"
                  value={eventEndDate}
                  onChange={(date) => setEventEndDate(date)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Event Note"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.meetingNoteError}
                  error={formik.errors.meetingNoteError && true}
                  onChange={formik.handleChange}
                  name="description"
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                  Create
                </Button>
                <Button>Cancel</Button>
              </Grid>
            </Grid>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateEventModal
