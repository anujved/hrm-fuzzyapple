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

const CreateMeetingModal = ({
  open,
  onCloseClickListener,
  branches,
  employees,
  departments,
  onSubmitClickListener,
}) => {
  const [meetingDate, setMeetingDate] = useState(Date.now);
  const [meetingTime, setMeetingTime] = useState(null);

  const formik = useFormik({
    initialValues: {
      branch: "",
      employee: "",
      department: "",
      meetingTitle: "",
      meetintNote: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.meetingTitle.length === 0) {
        errors.meetingTitleError = "required";
      }
      if (values.meetingNote.length === 0) {
        errors.meetingNoteError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        meeting_title: values.meetingTitle,
        meeting_note: values.meetingNote,
        meeting_date: meetingDate._d,
        meeting_time: meetingTime._d,
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
              <Typography>Create New Meeting</Typography>
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
                  label="Meeting Title"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.meetingTitleError}
                  error={formik.errors.meetingTitleError && true}
                  onChange={formik.handleChange}
                  name="meetingTitle"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Meeting Date"
                  fullWidth
                  onChange={(value) => setMeetingDate(value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardTimePicker
                  label="Meeting Time"
                  variant="inline"
                  mask="__:__ _M"
                  value={meetingTime}
                  onChange={(date) => setMeetingTime(date)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Meeting Note"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.meetingNoteError}
                  error={formik.errors.meetingNoteError && true}
                  onChange={formik.handleChange}
                  name="meetingNote"
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

export default CreateMeetingModal;
