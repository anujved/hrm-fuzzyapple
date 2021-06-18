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

const CreateTrainerModal = ({ open, onCloseClickListener }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        aria-labelledby="form-dialog-title"
      >
        <Box py={2} px={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography>Create New Trainer</Typography>
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
                label="Firstname"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="employee"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Lastname"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="employee"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="employee"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
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
                label="Expertise"
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
              <TextField
                label="Address"
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

export default CreateTrainerModal;
