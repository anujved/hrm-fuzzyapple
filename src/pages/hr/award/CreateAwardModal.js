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


const CreateAwardModal = ({ open, onCloseClickListener, onSubmitClickListener, employees, awardTypes }) => {

  const [awardDate, setAwardDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      employee: "",
      awardType: "",
      gift: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.employee.length === 0) {
        errors.employeeError = "required";
      }
      if (values.awardType.length === 0) {
        errors.awardTypeError = "required";
      }
      if (values.gift.length === 0) {
        errors.giftError = "required";
      }
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        employee: values.employee,
        award_type: values.awardType,
        description: values.description,
        date: new Date(awardDate),
        gift: values.gift
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
      setTimeout(() => {
        onCloseClickListener()
      }, 1000);
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
        <Box py={2} px={4}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New Award</Typography>
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
                  id="employee"
                  onChange={e => formik.setFieldValue("employee", e.target.value)}
                  select
                  error={formik.errors.employeeError}
                  helperText={formik.errors.employeeError ? formik.errors.employeeError : null}
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
                  label="Award Type"
                  variant="outlined"
                  fullWidth
                  id="awardType"
                  onChange={e => formik.setFieldValue("awardType", e.target.value)}
                  error={formik.errors.awardTypeError}
                  helperText={formik.errors.awardTypeError ? formik.errors.employeeError : null}
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
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Award Date"
                  fullWidth
                  onChange={(value) => setAwardDate(value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Gift"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.giftError ? formik.errors.giftError : null}
                  error={formik.errors.giftError && true}
                  onChange={formik.handleChange}
                  id="gift"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.descriptionError ? formik.errors.descriptionError : null}
                  error={formik.errors.descriptionError && true}
                  onChange={formik.handleChange}
                  id="description"
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

export default CreateAwardModal;
