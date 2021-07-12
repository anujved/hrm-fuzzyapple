import React from 'react'
import { useFormik } from "formik";
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import { KeyboardDatePicker } from '@material-ui/pickers';
const OvertimeForm = ({onSubmit}) => {
    let option = [{
        id: 1,
        value: 'Healthinsurance',
        name:'Health Insurance'
    }]

    const initialValues = {
        employeeName: '',
        overtimeTitle:'',
        days: '',
        hours: '',
        rate:''
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: (values) =>{},
        onSubmit: onSubmit
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
                            label="Overtime Title"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            name="overtimeTitle"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Days"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            name="days"
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Hours"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            name="hours"
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Rate"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            name="rate"
                            />
                    </Grid>
                 
                    
                    <Grid item xs={12}>

                        <Button
                        type="submit"
                        variant="contained"
                        disabled={!(
                            formik.values.days !=''&&
                            formik.values.employeeName!='' &&
                            formik.values.hours !=''&&
                            formik.values.overtimeTitle!='' &&
                            formik.values.rate!=''
                        )}
                        >
                        Submit
                        </Button>
                    </Grid>

            </Grid>
            </form>
                )
}

export default OvertimeForm
