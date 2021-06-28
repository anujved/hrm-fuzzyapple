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

const leaveTypes = [
  { id: 1, option: "Casual Leave" },
  { id: 2, option: "Medical Leave" },
];

const CreateTerminationModal = ({ open, onCloseClickListener, onSubmitClickListener }) => {

  const [noticeDate, setNoticeDate] = React.useState(new Date())
  const [terminationDate, setTerminationDate] = React.useState(new Date())

  const formik = useFormik({
    initialValues: {
      employee: "",
      termination_type: "",
      notice_date: "",
      termination_date: "",
      description: ""
    },
    validate: (values) => {
      const errors = {};
      if (values.employee.length === 0) {
        errors.employeeError = "required";
      }
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(data));
      const data = {
        ...values,
        notice_date: noticeDate,
        termination_date: terminationDate
      }
      onSubmitClickListener(data);
      setTimeout(onCloseClickListener, 1000)
    },
    validateOnChange: true,
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={formik.handleSubmit} autoComplete={"off"}>
          <Box py={2} px={4}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New Termination</Typography>
              <IconButton onClick={onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Employee"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.employeeError}
                  error={formik.errors.employeeError && true}
                  onChange={e => formik.setFieldValue("employee", e.target.value)}
                  id="employee"
                  select
                >
                  {leaveTypes &&
                    leaveTypes.map((option) => (
                      <MenuItem key={option.id} value={option.option}>
                        {option.option}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Termination Type"
                  variant="outlined"
                  fullWidth
                  onChange={e => formik.setFieldValue("termination_type", e.target.value)}
                  id="termination_type"
                  select
                >
                  {leaveTypes &&
                    leaveTypes.map((option) => (
                      <MenuItem key={option.id} value={option.option}>
                        {option.option}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  id="date-picker"
                  label="Notice Date"
                  value={noticeDate}
                  fullWidth
                  onChange={(date) => setNoticeDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  id="date-picker"
                  label="Termination Date"
                  value={terminationDate}
                  fullWidth
                  onChange={(date) => setTerminationDate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.descriptionError}
                  error={formik.errors.descriptionError}
                  onChange={formik.handleChange}
                  id="description"
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant="contained" type="submit" style={{ marginRight: 10 }}>
                  Create
                </Button>
                <Button>Cancel</Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateTerminationModal;
