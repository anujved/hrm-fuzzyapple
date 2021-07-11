import React from 'react'
import { useFormik } from "formik";
import {Button, MenuItem, TextField} from "@material-ui/core";
import { KeyboardDatePicker } from '@material-ui/pickers';
const Loanform = () => {
    let option = [{
        id: 1,
        value: 'Healthinsurance',
        name:'Health Insurance'
    }]

    const initialValues = {
        employeeName: '',
        loanOption: '',
        title:'',
        loanAmount: '',
        startDate: '01/01/2020',
        endDate:'02/01/2020'
    }

    const formik = useFormik({
        initialValues: initialValues,
        validate: (values) =>{},
        onSubmit: (values) => {},
        
      });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <TextField
                label="Employee Name"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="employeeName"
            />
            <TextField
                label="Loan Option"
                variant="outlined"
                fullWidth
                select
                onChange={formik.handleChange}
                name="allowanceOption"
            >
                {option&&option.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                    {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Title"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="title"
            />
            <TextField
                label="Loan Amount"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="loanAmount"
                />

            <KeyboardDatePicker
                disableToolbar
                    autoOk
                name ='startDate'
                variant="inline"
                format="dd/MM/yyyy"
                label="Start Date"
                fullWidth
                onChange={formik.handleChange}
            />
            <KeyboardDatePicker
                disableToolbar
                autoOk
                name ='endDate'
                variant="inline"
                format="dd/MM/yyyy"
                label="End Date"
                fullWidth
                onChange={formik.handleChange}
            />
                <Button
                      type="submit"
                      variant="contained"
                >
                Submit
                </Button>
            </form>
        </div>
    )
}

export default Loanform
