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

const CreatePromotionModal = ({
  open,
  onCloseClickListener,
  onSubmitClickListener,
  employees,
  designations,
}) => {
  const [promotionDate, setPromotionDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      employee: "",
      designation: "",
      promotionTitle: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.employee.length === 0) {
        errors.employeeError = "required";
      }
      if (values.designation.length === 0) {
        errors.designationError = "required";
      }
      if (values.promotionTitle.length === 0) {
        errors.promotionTitleError = "required";
      }
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        employee: values.employee,
        designation: values.designation,
        promotion_title: values.promotionTitle,
        description: values.description,
        promotion_date: new Date(promotionDate),
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
      setTimeout(onCloseClickListener, 1000);
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
              <Typography>Create New Promotion</Typography>
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
                  helperText={formik.errors.promotionTitleError}
                  error={formik.errors.promotionTitleError && true}
                  onChange={(e) =>
                    formik.setFieldValue("employee", e.target.value)
                  }
                  select
                >
                  {employees &&
                    employees.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {console.log(option.personalDetail.employeeName)}
                        {option.personDetail.employeeName}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Designation"
                  variant="outlined"
                  fullWidth
                  id="designation"
                  helperText={formik.errors.promotionTitleError}
                  error={formik.errors.promotionTitleError && true}
                  onChange={(e) =>
                    formik.setFieldValue("designation", e.target.value)
                  }
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
                  label="Promotion Title"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.promotionTitleError}
                  error={formik.errors.promotionTitleError && true}
                  onChange={formik.handleChange}
                  id="promotionTitle"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Promotion Date"
                  fullWidth
                  onChange={(value) => setPromotionDate(value)}
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

export default CreatePromotionModal;
