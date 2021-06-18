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

const leaveTypes = [
  { id: 1, option: "Casual Leave" },
  { id: 2, option: "Medical Leave" },
];

const branches = [
  { id: 1, option: "Shantanu" },
  { id: 2, option: "Wage Curve" },
];

const departments = [
  { id: 1, option: "PHP" },
  { id: 2, option: "JAva" },
];

const designations = [
  { id: 1, option: "Manager" },
  { id: 2, option: "Director" },
];

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

const CreateAppraisalModal = ({ open, onCloseClickListener }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
      >
        <Box py={2} px={4}>
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
                // onChange={formik.handleChange}
                id="employee"
                select
              >
                {branches &&
                  branches.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
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
                // onChange={formik.handleChange}
                id="employee"
                select
              >
                {departments &&
                  departments.map((option) => (
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
                format="MM/dd/yyyy"
                id="date-picker"
                label="Select Month"
                value={new Date()}
                fullWidth
                onChange={(date) => console.log(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
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
                // onChange={formik.handleChange}
                id="employee"
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
                // onChange={formik.handleChange}
                id="employee"
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
                // onChange={formik.handleChange}
                id="employee"
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
                // onChange={formik.handleChange}
                id="employee"
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
                // onChange={formik.handleChange}
                id="employee"
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
                // onChange={formik.handleChange}
                id="employee"
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
                // onChange={formik.handleChange}
                id="employee"
                multiline
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button variant="contained" style={{ marginRight: 10 }}>
                Create
              </Button>
              <Button>Cancel</Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateAppraisalModal;
