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

const CreateTransferBalanceModal = ({ open, onCloseClickListener, onSubmitClickListener, fromAccounts, toAccounts }) => {
  const [transferDate, setTransferDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      fromAccount: "",
      toAccount: "",
      amount: "",
      paymentMethod: "",
      RefNumber: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
      if (values.fromAccount.length === 0) {
        errors.fromAccountError = "required";
      }
      if (values.toAccount.length === 0) {
        errors.toAccountError = "required";
      }
      if (values.amount.length === 0) {
        errors.amountError = "required";
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
        from_account: values.fromAccount,
        to_account: values.toAccount,
        amount: values.amount,
        payment_method: values.paymentMethod,
        ref_number: values.RefNumber,
        description: values.description,
        transfer_date: transferDate._d,
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
            <Typography>Create New Transfer Balance</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
              <TextField
                label="From Account"
                variant="outlined"
                fullWidth
                name="fromAccount"
                select
              >
                  {fromAccounts &&
                    fromAccounts.map((option) => (
                      <MenuItem key={option.id} value={option.option}>
                        {option.option}
                      </MenuItem>
                    ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="To Account"
                variant="outlined"
                fullWidth
                name="toAccount"
                select
              >
                  {toAccounts &&
                    toAccounts.map((option) => (
                      <MenuItem key={option.id} value={option.option}>
                        {option.option}
                      </MenuItem>
                    ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
            <KeyboardDatePicker
                disableToolbar
                autoOk
                variant="inline"
                format="DD/MM/yyyy"
                label="Transfer Date"
                fullWidth
                onChange={(value) => setTransferDate(value)}
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

export default CreateTransferBalanceModal;
