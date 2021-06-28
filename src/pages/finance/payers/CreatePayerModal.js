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
import { useFormik } from "formik";

const CreatePayerModal = ({ open, onCloseClickListener, onSubmitClickListener }) => {

  const formik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.name.length === 0) {
        errors.nameError = "required";
      }
      if (values.contactNumber.length === 0) {
        errors.contactNumberError = "required";
      }
    
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        payer_name: values.name,
        contact_number: values.contactNumber,
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
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
            <Typography>Create New Payer</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Payer Name"
                variant="outlined"
                fullWidth
                helperText={formik.errors.nameError}
                error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="name"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                helperText={formik.errors.contactNumberError}
                error={formik.errors.contactNumberError && true}
                onChange={formik.handleChange}
                name="contactNumber"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
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

export default CreatePayerModal;
