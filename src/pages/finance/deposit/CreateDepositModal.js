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

const categories = [
  { id: 1, option: "Project" },
  { id: 2, option: "Extra Income" },
];

const paymentMethods = [
  { id: 1, option: "Cash" },
  { id: 2, option: "Bank" },
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
      name: "",
      amount: "",
      category: "",
      payer: "",
      paymentMethod: "",
      RefNumber: "",
      description: "",
    },
    validate: (values) => {
      const errors = {};
     
      if (values.amount.length === 0) {
        errors.amountError = "required";
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
        account: values.name,
        amount: values.amount,
        category: values.category,
        payment_method: values.paymentMethod,
        Payer: values.payer,
        ref: values.RefNumber,
        description: values.description,
        date: depositDate._d,
      };
      console.log('--DATA---DATA---', data);
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
                onChange={formik.handleChange}
                name="name"
                select
              >
                {accounts &&
                  accounts.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      {option.account_name}
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
                value={depositDate}
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
                {categories &&
                  categories.map((option) => (
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
                    <MenuItem key={option._id} value={option}>
                      {option.payer_name}
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
                {paymentMethods &&
                  paymentMethods.map((option) => (
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
