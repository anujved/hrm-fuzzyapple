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
  { id: 1, option: "Invoice Goal" },
  { id: 2, option: "Event Goal" },
];

const CreateGoalModal = ({ open, onCloseClickListener, branches, onSubmitClickListener }) => {

  const [startDate, setStartDate] = React.useState(Date.now);
  const [endDate, setEndDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      branch: "",
      goals_type: "",
      subject: "",
      targetAchievement: "",
      description: "",
      progress:"",
    },
    validate: (values) => {
      const errors = {};
      if (values.branch.length === 0) {
        errors.branchError = "required";
      }
      return errors;
    },
    validateOnChange: false,
    onSubmit: (values) => {
      const data = {
        branch: values.branch,
        goals_type: values.goals_type,
        subject: values.subject,
        description: values.description,
        target_achievement: values.targetAchievement,
        status: values.progress,
        start_date: startDate._d,
        end_date: endDate._d,
      };
      console.log('---values-data---', data);
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
            <Typography>Create New Goal Tracking</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Branch"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="branch"
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
                label="Goal Type"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="goals_type"
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
                format="MM/DD/yyyy"
                id="date-picker"
                label="Start Date"
                value={startDate}
                fullWidth
                onChange={(value) => setStartDate(value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/yyyy"
                id="date-picker"
                label="End Date"
                value={endDate}
                fullWidth
                onChange={(value) => setEndDate(value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="subject"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Target Achievement"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="targetAchievement"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
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
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateGoalModal;
