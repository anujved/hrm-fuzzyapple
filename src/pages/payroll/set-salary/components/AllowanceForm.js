import React from "react";
import { useFormik } from "formik";
import { Button, MenuItem, TextField, Grid } from "@material-ui/core";

const AllowanceForm = ({onSubmit}) => {
  let option = [
    {
      id: 1,
      value: "taxables",
      name: "Taxables",
    },
    {
      id: 2,
      value: "taxables",
      name: "Tax not ables",
    },
    
  ];

  const initialValues = {
    employeeName: "",
    title: "",
    allowanceOption: "",
    amount: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {},
    onSubmit:onSubmit
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item>
          <TextField
            label="Employee Name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            name="employeeName"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Allowance Option"
            variant="outlined"
            fullWidth
            select
            onChange={formik.handleChange}
            name="allowanceOption"
          >
            {option &&
              option.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            name="title"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            name="amount"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit"
            variant="contained"
            disabled={
              !(formik.values.allowanceOption != '' &&
                formik.values.amount != '' &&
                formik.values.employeeName != '' &&
                formik.values.title != '')
            
            }
          >
        Submit
      </Button>
        </Grid>
              
      </Grid>

   
    </form>
  );
};

export default AllowanceForm;
