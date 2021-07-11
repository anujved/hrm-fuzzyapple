import React from 'react'
import { useFormik } from "formik";
import {Button, MenuItem, TextField} from "@material-ui/core";

const AllowanceForm = () => {

    let option = [{
        id: 1,
        value: 'taxables',
        name:'Taxables'
    }]

    const initialValues = {
        employeeName: '',
        title: '',
        allowanceOption:'',
        amount:''
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
                label="Allowance Option"
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
                label="Amount"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="amount"
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

export default AllowanceForm
