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
  FormHelperText,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";

const CreateTransferModal = ({
  open,
  onCloseClickListener,
  onSubmitClickListener,
  employees,
  branches,
  departments,
}) => {
  const [transferDate, setTransferDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      employee: "",
      branch: "",
      department: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        employee: values.employee,
        branch: values.branch,
        department: values.department,
        description: values.description,
        transfer_date: new Date(transferDate),
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
      // setTimeout(onCloseClickListener, 1000);
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
              <Typography>Create New Transfer</Typography>
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
                  name="employee"
                  onChange={formik.handleChange}
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
                <TextField
                  label="Branch"
                  variant="outlined"
                  fullWidth
                  name="branch"
                  onChange={formik.handleChange}
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
                  label="Department"
                  variant="outlined"
                  fullWidth
                  name="department"
                  onChange={formik.handleChange}
                  select
                >
                  {departments &&
                    departments.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option.name}
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
                  label="Transfer Date"
                  fullWidth
                  onChange={(value) => setTransferDate(value)}
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
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginRight: 10 }}
                >
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

export default CreateTransferModal;
