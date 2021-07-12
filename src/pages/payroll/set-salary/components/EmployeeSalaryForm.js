import React from 'react'
import { Formik, useFormik } from "formik";
import {Button, Grid,  MenuItem,  TextField} from "@material-ui/core";

const EmployeeSalary = ({onSubmit}) => {

    let option = [
        {
        id: 1,
        value: 'type1',
        name:'type1'
    },
        {
        id: 2,
        value: 'type2',
        name:'type2'
    },
        {
        id: 3,
        value: 'type3',
        name:'type2'
    },
    ]
  
    const initialValues = {
        payslipType: '',
        salary: '',
       
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: (values) =>{},
        onSubmit: onSubmit,
        
      });
    return (
       
        <form onSubmit={formik.handleSubmit}>
            
            <Grid container spacing={3}>
                
            <Grid item xs={12}> 
            <TextField
              label="Pay Slip Type"
              variant="outlined"
              fullWidth
              select
              onChange={formik.handleChange}
              name="payslipType"
            >
              {option &&
                option.map((option) => (
                  <MenuItem key={option.id} value={option.value||''}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Salary"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              name="salary"
            />
          </Grid>
          
          <Grid item >
            <Button type="submit" variant="contained"
              disabled={!(
                formik.values.payslipType!='' &&
                formik.values.salary!=''
            )}
            >
          Submit
        </Button>
          </Grid>
                
        </Grid>
  
     
      </form>

    )
}

export default EmployeeSalary
