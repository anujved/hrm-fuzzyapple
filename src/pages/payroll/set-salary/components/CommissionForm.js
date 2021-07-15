import React from 'react'
import { useFormik } from "formik";
import {Button, Grid, TextField} from "@material-ui/core";
const CommissionForm = ({onsubmit}) => {


    const initialValues = {
        employeeName: '',
        title:'',
        amount: '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: (values) =>{},
        onSubmit: onsubmit
        
      });

    return (
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
             <Grid item xs={12}>
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

                 <Button
                 type="submit"
                        variant="contained"
                        disabled={!(
                            formik.values.amount!='' &&
                            formik.values.employeeName!='' &&
                            formik.values.title!=''
                        )}     
                 >
                 Submit
                 </Button>
             </Grid>

     </Grid>
     </form>
    )
}

export default CommissionForm
