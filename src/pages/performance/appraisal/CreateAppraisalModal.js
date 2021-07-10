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
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";

const technicalCompentencies = [
  { id: 1, option: "None" },
  { id: 2, option: "Beginner" },
  { id: 3, option: "Intermediate" },
  { id: 4, option: "Advanced" },
  { id: 5, option: "Expert / Leader" },
];

const organizationalCompentencies = [
  { id: 1, option: "None" },
  { id: 2, option: "Beginner" },
  { id: 3, option: "Intermediate" },
  { id: 4, option: "Advanced" },
];

const CreateAppraisalModal = ({ 
      open, 
      onCloseClickListener, 
      onSubmitClickListener,
      branches, 
      employees,
       }) => {

  const [month, setMonth] = React.useState(Date.now());

  const formik = useFormik({
    initialValues: {
      branch: "",
      employee: "",
      customer_experience: "",
      marketing: "",
      administration: "",
      professional: "",
      integrity: "",
      attendance: "",
      remark: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.branch.length === 0) {
        errors.branchError = "required";
      }
      if (values.employee.length === 0) {
        errors.employee = "required";
      }
      return errors;
    },
    validateOnChange: false,
    onSubmit: (values) => {
      const data = {
        select_month: month._d,
        branch: values.branch,
        employee: values.employee,
        Administration: values.administration,
        customer_experience: values.customer_experience,
        marketing: values.marketing,
        professionalism: values.professional,
        integrity: values.integrity,
        attendance: values.attendance,
        remark: values.remark,
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
      >
        <Box py={2} px={4}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">

          <Grid container justifyContent="space-between" alignItems="center">
            <Typography>Create New Appraisal</Typography>
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
                label="Employee"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="employee"
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
                  views={["year", "month"]}
                  label="Select Month"
                  value={month}
                  fullWidth
                  onChange={(value) => setMonth(value)}
                />
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              borderBottom={1}
              style={{ borderBottomColor: "#EFF2F6" }}
            >
              <Typography variant="h3">Technical Competencies</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Customer Experience"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="customer_experience"
                select
              >
                {technicalCompentencies &&
                  technicalCompentencies.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Marketing"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="marketing"
                select
              >
                {technicalCompentencies &&
                  technicalCompentencies.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Administration"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="administration"
                select
              >
                {technicalCompentencies &&
                  technicalCompentencies.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              borderBottom={1}
              style={{ borderBottomColor: "#EFF2F6" }}
            >
              <Typography variant="h3">Organizationl Competencies</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Professionalism"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="professional"
                select
              >
                {organizationalCompentencies &&
                  organizationalCompentencies.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Integrity"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="integrity"
                select
              >
                {organizationalCompentencies &&
                  organizationalCompentencies.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Attendance"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="attendance"
                select
              >
                {organizationalCompentencies &&
                  organizationalCompentencies.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Remark"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="remark"
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

export default CreateAppraisalModal;
