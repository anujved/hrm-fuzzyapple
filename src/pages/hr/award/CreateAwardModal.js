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



const CreateAwardModal = ({
  open,
  onCloseClickListener,
  onSubmitClickListener,
  employees,
}) => {
  const [awardDate, setAwardDate] = React.useState(Date.now);

  const Types = [
    { id: 1, option: "trophy" },
    { id: 2, option: "certificate" },
  ];

  const formik = useFormik({
    initialValues: {
      employee: "",
      awardType: "",
      gift: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};

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
        gift: values.gift,
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
      setTimeout(() => {
        onCloseClickListener();
      }, 1000);
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
                  name="employee"
                  onChange={formik.handleChange}
                  select
                >
                  {employees &&
                    employees.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option?.personalDetail?.employeeName}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Award Type"
                  variant="outlined"
                  fullWidth
                  name="awardType"
                  onChange={formik.handleChange}
                  select
                >
                   {Types &&
                    Types.map((option) => (
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
                  helperText={
                    formik.errors.giftError ? formik.errors.giftError : null
                  }
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
                  helperText={
                    formik.errors.descriptionError
                      ? formik.errors.descriptionError
                      : null
                  }
                  error={formik.errors.descriptionError && true}
                  onChange={formik.handleChange}
                  id="description"
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

export default CreateAwardModal;
