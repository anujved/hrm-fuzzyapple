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

const CreateDepositModal = ({
  open,
  onCloseClickListener,
  onSubmitClickListener,
  accounts,
  payers,
}) => {
  const [depositDate, setDepositDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      account: "",
      amount: "",
      category: "",
      payer: "",
      paymentMethod: "",
      RefNumber: "",
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
      if (values.category.length === 0) {
        errors.categoryError = "required";
      }
      if (values.payer.length === 0) {
        errors.payerError = "required";
      }
      if (values.paymentMethod.length === 0) {
        errors.paymentMethodError = "required";
      }
      if (values.RefNumber.length === 0) {
        errors.RefNumberError = "required";
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
        category: values.category,
        payment_method: values.paymentMethod,
        payer: values.payer,
        ref_number: values.RefNumber,
        description: values.description,
        deposit_date: depositDate._d,
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
            <Typography>Create New Deposit</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Account"
                variant="outlined"
                fullWidth
                helperText={formik.errors.nameError}
                error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="account"
                select
              >
                {accounts &&
                  accounts.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
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
                label="Deposit Date"
                fullWidth
                onChange={(value) => setDepositDate(value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                name="category"
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
                label="Payer"
                variant="outlined"
                fullWidth
                name="payer"
                select
              >
                {payers &&
                  payers.map((option) => (
                    <MenuItem key={option.id} value={option.option}>
                      {option.option}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Payment Method"
                variant="outlined"
                fullWidth
                name="paymentMethod"
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
                label="Ref#"
                variant="outlined"
                fullWidth
                helperText={formik.errors.RefNumberError}
                error={formik.errors.RefNumberError && true}
                onChange={formik.handleChange}
                name="RefNumber"
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

export default CreateDepositModal;
