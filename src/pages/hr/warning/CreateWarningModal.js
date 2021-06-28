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

const CreateWarningModal = ({ open, onCloseClickListener, onSubmitClickListener, employees }) => {
  const [warningDate, setWarningDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      warningBy: "",
      warningTo: "",
      subject: "",
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
        warning_by: values.warningBy,
        warning_to: values.warningTo,
        subject: values.subject,
        description: values.description,
        warning_date: new Date(warningDate),
      };
      // alert(JSON.stringify(data));
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
        <Box py={2} px={4}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New Warning</Typography>
              <IconButton onClick={onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Warning By"
                  variant="outlined"
                  fullWidth
                  id="warningBy"
                  onChange={e => formik.setFieldValue("warningBy", e.target.value)}
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
                  label="Warning To"
                  variant="outlined"
                  fullWidth
                  id="warningTo"
                  onChange={e => formik.setFieldValue("warningTo", e.target.value)}
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
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.subjectError}
                  error={formik.errors.subjectError && true}
                  onChange={formik.handleChange}
                  id="subject"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Warning Date"
                  fullWidth
                  onChange={(value) => setWarningDate(value)}
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

export default CreateWarningModal;
