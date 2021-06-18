import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  IconButton
} from "@material-ui/core";
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';
const branches = [
  {
    value: "Science",
    label: "Science",
  },
  {
    value: "Physics",
    label: "Physics",
  },
];

const EmployeeProfileToolbar = (props) => {
  return (
    <Grid container alignItems="center" mt={2} spacing={2}>
      <Grid item xs={12} md={5}>
        <Typography>Employee Profile</Typography>
      </Grid>
      <Grid item xs={12} md={7}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="Branch"
              variant="outlined"
              fullWidth
              select
              //   onChange={formik.handleChange}
              id="branchName"
            >
              {branches &&
                branches.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Department"
              variant="outlined"
              fullWidth
              select
              //   onChange={formik.handleChange}
              id="departmentName"
            >
              {branches &&
                branches.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Designation"
              variant="outlined"
              fullWidth
              select
              //   onChange={formik.handleChange}
              id="designationName"
            >
              {branches &&
                branches.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container justifyContent="space-around" >
                <IconButton>
                    <SearchRoundedIcon color="primary" />
                </IconButton>
                <IconButton>
                    <RestoreFromTrashRoundedIcon color="secondary" />
                </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EmployeeProfileToolbar;
