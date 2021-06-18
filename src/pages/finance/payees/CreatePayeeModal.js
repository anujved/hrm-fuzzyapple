import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const CreatePayeeModal = ({ open, onCloseClickListener }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        aria-labelledby="form-dialog-title"
      >
        <Box py={2} px={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography>Create New Payee</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Payee Name"
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
                label="Contact Number"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="employee"
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

export default CreatePayeeModal;
