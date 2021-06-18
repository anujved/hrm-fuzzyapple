import React from "react";
import {
  Grid,
  Typography,
  Container,
  TextField,
  Button,
  MenuItem
} from "@material-ui/core";

const months = [
  {
    value: "JAN",
    label: "JAN",
  },
  {
    value: "FEB",
    label: "FEB",
  },
  {
    value: "MAR",
    label: "MAR",
  },
  {
    value: "APR",
    label: "APR",
  },
  {
    value: "MAY",
    label: "MAY",
  },
  {
    value: "JUN",
    label: "JUN",
  },
  {
    value: "JUL",
    label: "JUL",
  },
  {
    value: "AUG",
    label: "AUG",
  },
  {
    value: "SEP",
    label: "SEP",
  },
  {
    value: "OCT",
    label: "OCT",
  },
  {
    value: "NOV",
    label: "NOV",
  },
  {
    value: "DEC",
    label: "DEC",
  },
];

const years = [
  {
    value: "2020",
    label: "2020",
  },
  {
    value: "2021",
    label: "2021",
  },
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2024",
    label: "2024",
  },
  {
    value: "2025",
    label: "2025",
  },
  {
    value: "2026",
    label: "2026",
  },
  {
    value: "2027",
    label: "2027",
  },
  {
    value: "2028",
    label: "2028",
  },
  {
    value: "2029",
    label: "2029",
  },
  {
    value: "2030",
    label: "2030",
  },
];

const PayslipHeader = (props) => {
  return (
    <Grid container alignItems="center" spacing={2} p={2}>
      <Grid item xs={12} md={2}>
        <Typography>Employee Salary</Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label="Select Month"
          variant="outlined"
          fullWidth
          select
        //   helperText="Please select branch"
        //   error={formik.errors.branchNameError && true}
        //   onChange={formik.handleChange}
          id="month"
        >
          {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          label="Select Year"
          variant="outlined"
          fullWidth
          select
        //   helperText="Please select branch"
        //   error={formik.errors.branchNameError && true}
        //   onChange={formik.handleChange}
          id="year"
        >
          {years.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained">Bulk Payment</Button>
      </Grid>
    </Grid>
  );
};

export default PayslipHeader;
