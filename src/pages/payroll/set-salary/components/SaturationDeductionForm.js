import React from 'react'
import { useFormik } from "formik";
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import { KeyboardDatePicker } from '@material-ui/pickers';
const SaturationDeduction = ({onSubmit}) => {
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
        name:'type3'
       },
    ]

    const initialValues = {
        employeeName: '',
        deductionOption: '',
        title:'',
        amount: '',
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
                    <Grid  item xs={12}>
                        <TextField
                            label="Deduction Option"
                            variant="outlined"
                            fullWidth
                            select
                            onChange={formik.handleChange}
                            name="deductionOption"
                        >
                            {option&&option.map((option) => (
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

                        <Button
                        type="submit"
                        variant="contained"
                        disabled={!(
                            formik.values.amount!='' &&
                            formik.values.deductionOption!='' &&
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

export default SaturationDeduction
