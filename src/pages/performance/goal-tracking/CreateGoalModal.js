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

const leaveTypes = [
  { id: 1, option: "Casual Leave" },
  { id: 2, option: "Medical Leave" },
];

const CreateGoalModal = ({ open, onCloseClickListener }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        aria-labelledby="form-dialog-title"
      >
        <Box py={2} px={4}>
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
                // onChange={formik.handleChange}
                id="employee"
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
                label="Goal Type"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="employee"
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
                format="MM/dd/yyyy"
                id="date-picker"
                label="Start Date"
                value={new Date()}
                fullWidth
                onChange={(date) => console.log(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                id="date-picker"
                label="End Date"
                value={new Date()}
                fullWidth
                onChange={(date) => console.log(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="employee"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Target Achievement"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="employee"
              />
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

export default CreateGoalModal;
