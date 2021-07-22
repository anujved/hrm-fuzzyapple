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
  { id: 1, option: "project" },
  { id: 2, option: "extra income" },
];

const paymentMethods = [
  { id: 1, option: "cash" },
  { id: 2, option: "bank" },
];

const CreateExpenseModal = ({ open, onCloseClickListener, onSubmitClickListener, payees, accounts, editModalData }) => {
  const [expenseDate, setExpenseDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      account: "",
      amount: "",
      category: "",
      payee: "",
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
        account: values.account,
        amount: values.amount,
        category: values.category,
        payment_method: values.paymentMethod,
        Payee: values.payee,
        ref: values.RefNumber,
        description: values.description,
        date: expenseDate._d,
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
    },
    validateOnChange: false,
  });

  const editHandler = () => {
    console.log(editModalData)
    formik.setValues({
      ...formik.values,
      account: editModalData.account._id,
      amount: editModalData.amount,
      category: editModalData.category,
      paymentMethod: editModalData.payment_method,
      // payer: editModalData.Payer._id,
      RefNumber: editModalData.ref,
      description: editModalData.description,
      date: expenseDate._d,
    })
    // console.log("edit")
    // console.log(editModalData)
    // console.log(formik.values)
  }
  // if()
  React.useEffect(() => {
    if (editModalData) {
      editHandler()
    }
  }, [editModalData])

  console.log(payees)


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
              <Typography>Create New Expense</Typography>
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
                  name="account"
                  select
                  value={formik.values.account}
                  onChange={formik.handleChange}
                >
                  {accounts &&
                    accounts.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
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
                  value={formik.values.amount}
                  name="amount"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="Expense Date"
                  value={expenseDate}
                  fullWidth
                  onChange={(value) => setExpenseDate(value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Category"
                  variant="outlined"
                  fullWidth
                  name="category"
                  select
                  value={formik.values.category}
                  onChange={formik.handleChange}
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
                  label="Payee"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.payeeError}
                  error={formik.errors.payeeError && true}
                  onChange={formik.handleChange}
                  name="payee"
                  value={formik.values.payee}
                  select
                >
                  {payees &&
                    payees.map((option) => (
                      <MenuItem key={option.id} value={option._id}>
                        {option.payee_name}
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
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange}
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
                  value={formik.values.RefNumber}
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
                  value={formik.values.description}
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

export default CreateExpenseModal;
