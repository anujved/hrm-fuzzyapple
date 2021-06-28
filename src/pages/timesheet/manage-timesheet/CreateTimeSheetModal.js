import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";

const CreateTimeSheetModal = ({ open, onCloseClickListener, employees, onSubmitClickListener, updateTimeSheet }) => {

  const [date, setDate] = useState(() => {
    return updateTimeSheet ? updateTimeSheet.initialValues.date :
      Date.now
  });

  const formikInitialValues = updateTimeSheet ? updateTimeSheet.initialValues : {
    employee: "",
    hours: "",
    remark: "",
  }

  const handleSubmit = (data) => {
    if (updateTimeSheet) {
      updateTimeSheet.onUpdate(data)
    } else {
      onSubmitClickListener(data)
    }
  }

  const formik = useFormik({
    initialValues: formikInitialValues,
    validate: (values) => {
      const errors = {};
      if (values.employee.length === 0) {
        errors.employeeError = "required";
      }
      if (values.hours.length === 0) {
        errors.hoursError = "required";
      }
      if (values.remark.length === 0) {
        errors.remarkError = "required";
      }

      return errors;
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        date: date._d,
      };
      handleSubmit(data);
    },
    validateOnChange: false,
  });

  const handleClose = () => {
    if (updateTimeSheet) {
      updateTimeSheet.onClose()
    }
    onCloseClickListener()
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Box py={2} px={4}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New</Typography>
              <IconButton onClick={handleClose}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Employee"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.employeeError}
                  error={formik.errors.employeeError && true}
                  onChange={formik.handleChange}
                  value={formik.values.employee}
                  name="employee"
                  select
                >
                  {employees && employees.map((employee, index) => <MenuItem key={index} value={employee._id}>
                    {employee.personalDetail.employeeName}
                  </MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Date"
                  value={date}
                  fullWidth
                  onChange={(date) => setDate(date)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Hours"
                  variant="outlined"
                  fullWidth
                  value={formik.values.hours}
                  helperText={formik.errors.hoursError}
                  error={formik.errors.hoursError && true}
                  onChange={formik.handleChange}
                  name="hours"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Remarks"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.remarkError}
                  error={formik.errors.remarkError && true}
                  value={formik.values.remark}
                  onChange={formik.handleChange}
                  name="remark"
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                  Submit
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

export default CreateTimeSheetModal;