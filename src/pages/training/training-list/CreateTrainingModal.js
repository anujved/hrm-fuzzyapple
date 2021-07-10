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

const trainer_options = [
  { id: 1, option: "internal" },
  { id: 2, option: "external" },
];

const CreateTrainingModal = ({
  open,
  onCloseClickListener,
  onSubmitClickListener,
  branches,
  trainers,
  training_type,
  employees,
}) => {

  const [startDate, setStartDate] = React.useState(Date.now());
  const [endDate, setEndDate] = React.useState(Date.now());

  const formik = useFormik({
    initialValues: {
      branch: "",
      trainer_option: "",
      training_type: "",
      trainer: "",
      training_cost: "",
      employee: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      // if (values.branch.length === 0) {
      //   errors.branchError = "required";
      // }
      return errors;
    },
    validateOnChange: false,
    onSubmit: (values) => {
      console.log('---values---', values);
      const data = {
        training_type: values.training_type,
        branch: values.branch,
        trainer_option: values.trainer_option,
        employee: values.employee,
        end_date: endDate._d,
        trainer: values.trainer,
        description: values.description,
        start_date: startDate._d,
        training_cost: values.training_cost,
      };
      onSubmitClickListener(data);

      // });
    },
    validateOnChange: false,
  });

  return (
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        aria-labelledby="form-dialog-title"
      >
        <Box py={2} px={4}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography>Create New Training</Typography>
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
                label="Trainer Option"
                variant="outlined"
                fullWidth
                name="trainer_option"
                onChange={formik.handleChange}
                select
              >
                {trainer_options &&
                  trainer_options.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Training Type"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="training_type"
                select
              >
                {training_type &&
                  training_type.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Trainer"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="trainer"
                select
              >
                { trainers &&
                  trainers.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option.first_name} {option.last_name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Training Cost"
                variant="outlined"
                fullWidth
                name="training_cost"
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={12}>
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
              <KeyboardDatePicker
              autoOk
                disableToolbar
                variant="inline"
                format="MM/DD/yyyy"
                label="startDate"
                value={startDate}
                fullWidth
                onChange={(value) => setStartDate(value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <KeyboardDatePicker
              autoOk
                disableToolbar
                variant="inline"
                format="MM/DD/yyyy"
                label="endDate"
                value={endDate}
                fullWidth
                onChange={(value) => setEndDate(value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                onChange={formik.handleChange}
                multiline
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained"  style={{ marginRight: 10 }}>
                Create
              </Button>
              <Button>Cancel</Button>
            </Grid>
          </Grid>
          </form>
        </Box>
      </Dialog>
  );
};

export default CreateTrainingModal;
