import React, { useEffect } from 'react'
import { useFormik } from "formik";
import {Button, Grid, MenuItem, TextField} from "@material-ui/core";
import { KeyboardDatePicker } from '@material-ui/pickers';
const Loanform = ({ onSubmit }) => {
    
    const [startDate, setStartDate] = React.useState(Date.now);
    const [endDate, setEndDate] = React.useState(Date.now);
    let option = [{
        id: 1,
        value: 'Healthinsurance',
        name:'Healthinsurance'
    }]

    const initialValues = {
        employeeName: '',
        title:'',
        loanAmount: '',
        allowanceOption:'',
        startDate: startDate?._d||'',
        endDate:endDate?._d||''
    }
    useEffect(() => {
        formik.setValues({...formik.values,startDate:startDate?._d})
    },[startDate])
    useEffect(() => {
        formik.setValues({...formik.values,endDate:endDate?._d})
    },[endDate])

    const formik = useFormik({
        initialValues: initialValues,
        validate: (values) =>{},
        onSubmit: ()=>onSubmit
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
                            label="Loan Amount"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            name="loanAmount"
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <KeyboardDatePicker
                                disableToolbar
                                    autoOk
                                name ='startDate'
                                variant="inline"
                                format="dd/MM/yyyy"
                                label="Start Date"
                                fullWidth
                                value={startDate}
                               onChange={(value) => {setStartDate(value)}}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <KeyboardDatePicker
                                disableToolbar
                                autoOk
                                name ='endDate'
                                variant="inline"
                                format="dd/MM/yyyy"
                                label="End Date"
                                fullWidth
                                value={endDate}
                                onChange={(value) => {setEndDate(value)}}
                            />
                    </Grid>
                    <Grid item xs={12}>

                        <Button
                        type="submit"
                        variant="contained"
                        disabled=
                        {!(formik.values.allowanceOption!=''  &&
                            formik.values.employeeName!='' &&
                            formik.values.endDate!=''&& formik.values.loanAmount!='' 
                            && formik.values.loanOption!='' &&
                            formik.values.startDate!='' )}
                        >
                        Submit
                        </Button>
                    </Grid>

            </Grid>
            </form>
                )
}

export default Loanform
