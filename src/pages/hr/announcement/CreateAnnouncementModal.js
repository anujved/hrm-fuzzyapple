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

const CreateAnnouncementModal = ({
  open,
  branches,
  departments,
  employees,
  onCloseClickListener,
  onSubmitClickListener,
}) => {
  const [announcement, setAnnouncement] = React.useState(0);

  const formik = useFormik({
    initialValues: {
      announcement_title: "",
      branch: "",
      department: "",
      description: "",
      employee: "",
      announcement_start_date: new Date(),
      announcement_end_date: new Date(),
    },
    validate: (values) => {
      const errors = {};
      if (values.announcement_title.length === 0) {
        errors.announcement_title_Error = "required";
      }
      if (values.branch.length === 0) {
        errors.branchError = "required";
      }
      if (values.department.length === 0) {
        errors.departmentError = "required";
      }
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }
      if (values.employee.length === 0) {
        errors.employeeError = "required";
      }
      return errors;
    },
    validateOnChange: false,
    onSubmit: (values) => {
      // formik.validateForm(values).then(() => {
      //   onSubmitClickListener(values);

      const data = {
        announcement_title: values.annoincement_title,
        branch: values.branch,
        department: values.department,
        employee: values.employee,
        announcement_end_date: values.announcement_end_date,
        description: values.description,
        announcement_start_date: values.announcement_start_date,
      };
      onSubmitClickListener(values);

      // });
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
        <form onSubmit={formik.handleSubmit}>
          <Box py={2} px={4}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New Announcement</Typography>
              <IconButton onClick={onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Announcement Title"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.titleError}
                  error={formik.errors.titleError}
                  onChange={(e) =>
                    formik.setFieldValue("announcement_title", e.target.value)
                  }
                  id="announcement_title"
                >
                  {announcement}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Branch"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.branchError}
                  error={formik.errors.branchError && true}
                  onChange={(e) =>
                    formik.setFieldValue("branch", e.target.value)
                  }
                  id="branch"
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
              <Grid item xs={12} md={6}>
                <TextField
                  label="Department"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.departmentError}
                  error={formik.errors.departmentError}
                  onChange={(e) =>
                    formik.setFieldValue("department", e.target.value)
                  }
                  id="department"
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
              <Grid item xs={12} md={6}>
                <TextField
                  label="Employee"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.employeeError}
                  error={formik.errors.employeeError}
                  onChange={(e) =>
                    formik.setFieldValue("employee", e.target.value)
                  }
                  id="employee"
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
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="DD/MM/yyyy"
                  id="date-picker"
                  label="Announcement Start Date"
                  value={formik.values.announcement_start_date}
                  fullWidth
                  onChange={(date) =>
                    formik.setFieldValue("announcement_start_date", date)
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="DD/MM/yyyy"
                  id="date-picker"
                  label="Announcement End Date"
                  value={formik.values.announcement_end_date}
                  fullWidth
                  onChange={(date) =>
                    formik.setFieldValue("announcement_end_date", date)
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Announcement Description"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.descriptionError}
                  error={formik.errors.descriptionError && true}
                  onChange={formik.handleChange}
                  id="description"
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ marginRight: 10 }}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateAnnouncementModal;
