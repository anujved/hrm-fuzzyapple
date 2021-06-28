import React, { useState } from "react";
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

const CreateAssetsModal = ({ open, onCloseClickListener, onSubmitClickListener }) => {
  const [purchaseDate, setPurchaseDate] = useState(Date.now);
  const [supportUntilDate, setSupportUntilDate] = useState(Date.now);

  const formik = useFormik({
    initialValues: {
      name: "",
      amount: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.name.length === 0) {
        errors.nameError = "required";
      }
      if (values.amount.length === 0) {
        errors.amountError = "required";
      }
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        name: values.name,
        amount: values.amount,
        description: values.description,
        purchase_date: purchaseDate._d,
        support_until_date: supportUntilDate._d,
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
    },
    validateOnChange: false,
  });

  return (
    <div>
      <Dialog open={open} onClose={onCloseClickListener}>
        <Box py={2} px={4}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create Asset</Typography>
              <IconButton onClick={onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.nameError}
                  error={formik.errors.nameError && true}
                  onChange={formik.handleChange}
                  name="name"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.amountError}
                  error={formik.errors.amountError && true}
                  onChange={formik.handleChange}
                  name="amount"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Purchase Date"
                  fullWidth
                  onChange={(value) => setPurchaseDate(value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Support Until"
                  fullWidth
                  onChange={(value) => setSupportUntilDate(value)}
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
                  name="description"
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

export default CreateAssetsModal;
