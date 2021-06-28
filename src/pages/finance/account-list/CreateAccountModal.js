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

const CreateAccountModal = ({ open, onCloseClickListener, onSubmitClickListener }) => {

  const formik = useFormik({
    initialValues: {
      accountName: "",
      initialBalance: "",
      accountNumber: "",
      branchCode: "",
      bankBranch: ""
    },
    validate: (values) => {
      const errors = {};
      if (values.accountName.length === 0) {
        errors.accountNameError = "required";
      }
      if (values.initialBalance.length === 0) {
        errors.initialBalanceError = "required";
      }
      if (values.accountNumber.length === 0) {
        errors.accountNumberError = "required";
      }
      if (values.branchCode.length === 0) {
        errors.branchCodeError = "required";
      }
      if (values.bankBranch.length === 0) {
        errors.bankBranchError = "required";
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        account_name: values.accountName,
        initial_balance: values.initialBalance,
        account_number: values.accountNumber,
        branch_code: values.branchCode,
        bank_branch: values.bankBranch,
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
            <Typography>Create New Account</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Account Name"
                variant="outlined"
                fullWidth
                helperText={formik.errors.accountNameError}
                error={formik.errors.accountNameError && true}
                onChange={formik.handleChange}
                name="accountName"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Initial Balance"
                variant="outlined"
                fullWidth
                helperText={formik.errors.initialBalanceError}
                error={formik.errors.initialBalanceError && true}
                onChange={formik.handleChange}
                name="initialBalance"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Account Number"
                variant="outlined"
                fullWidth
                helperText={formik.errors.accountNumberError}
                error={formik.errors.accountNumberError && true}
                onChange={formik.handleChange}
                name="accountNumber"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Branch Code"
                variant="outlined"
                fullWidth
                helperText={formik.errors.branchCodeError}
                error={formik.errors.branchCodeError && true}
                onChange={formik.handleChange}
                name="branchCode"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Bank Branch"
                variant="outlined"
                fullWidth
                helperText={formik.errors.bankBranchError}
                error={formik.errors.bankBranchError && true}
                onChange={formik.handleChange}
                name="bankBranch"
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

export default CreateAccountModal;
