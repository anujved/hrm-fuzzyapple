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

const CreateComplaintModal = ({ open, onCloseClickListener, onSubmitClickListener, employees }) => {
  const [complaintDate, setComplaintDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      complaintFrom: "",
      complaintAgainst: "",
      title: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.title.length === 0) {
        errors.titleError = "required";
      }
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        complaint_from: values.complaintFrom,
        complaint_against: values.complaintAgainst,
        title: values.title,
        description: values.description,
        complaint_date: complaintDate._d,
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
            <Typography>Create New Complaint</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
              <TextField
                label="Complaint From"
                variant="outlined"
                fullWidth
                name="complaintFrom"
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
              <TextField
                label="Complaint Against"
                variant="outlined"
                fullWidth
                name="complaintAgainst"
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
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                helperText={formik.errors.titleError}
                error={formik.errors.titleError && true}
                onChange={formik.handleChange}
                name="title"
              />
            </Grid>
            <Grid item xs={12} md={6}>
            <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Complaint Date"
                  fullWidth
                  onChange={(value) => setComplaintDate(value)}
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

export default CreateComplaintModal;
