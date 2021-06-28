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

const CreateTripModal = ({ open, onCloseClickListener, onSubmitClickListener, employees }) => {
  const [startDate, setStartDate] = React.useState(Date.now);
  const [endDate, setEndDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      employee: "",
      purposeOfVisit: "",
      placeOfVisit: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.employee.length === 0) {
        errors.employeeError = "required";
      }
      if (values.purposeOfVisit.length === 0) {
        errors.purposeOfVisitError = "required";
      }
      if (values.placeOfVisit.length === 0) {
        errors.placeOfVisitError = "required";
      }
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        employee: values.employee,
        purpose_of_visit: values.purposeOfVisit,
        place_of_visit: values.placeOfVisit,
        description: values.description,
        start_date: startDate._d,
        end_date: endDate._d,
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
            <Typography>Create New Trip</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
              <TextField
                label="Employee"
                variant="outlined"
                fullWidth
                name="employee"
                select
              >
                  {employees &&
                    employees.map((option) => (
                      <MenuItem key={option.id} value={option.option}>
                        {option.option}
                      </MenuItem>
                    ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
            <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Start Date"
                  fullWidth
                  onChange={(value) => setStartDate(value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
            <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="End Date"
                  fullWidth
                  onChange={(value) => setEndDate(value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Purpose of Visit"
                variant="outlined"
                fullWidth
                helperText={formik.errors.purposeOfVisitError}
                error={formik.errors.purposeOfVisitError && true}
                onChange={formik.handleChange}
                name="purposeOfVisit"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Place of Visit"
                variant="outlined"
                fullWidth
                helperText={formik.errors.placeOfVisitError}
                error={formik.errors.placeOfVisitError && true}
                onChange={formik.handleChange}
                name="placeOfVisit"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                helperText={formik.errors.descriptionError}
                error={formik.errors.descriptionError && true}
                onChange={formik.handleChange}
                name="description"
                multiline
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                Create
              </Button>
              <Button onClick={onCloseClickListener}>Cancel</Button>
            </Grid>
          </Grid>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateTripModal;
