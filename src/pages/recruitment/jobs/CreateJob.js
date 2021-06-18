import React from 'react'
import {
    Box, 
    Grid, 
    Typography, 
    IconButton, 
    Button, 
    TextField, 
    Checkbox, 
    Paper, 
    MenuItem,
    FormControlLabel,
} from '@material-ui/core';
import { KeyboardDatePicker } from "@material-ui/pickers";
const branches = [
    { id: 1, option: "Shantanu" },
    { id: 2, option: "Wage Curve" },
  ];

const CreateJob = () => {
    return (
        <React.Fragment>
            <Box px={3} py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Typography paddingBottom={2}>Create Job</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={10} style={{padding: 10}}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            label="Job Title"
                                            variant="outlined"
                                            fullWidth
                                            // helperText={formik.errors.nameError && "Invalid Name"}
                                            // error={formik.errors.nameError && true}
                                            // onChange={formik.handleChange}
                                            id="employee"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Branch"
                                            variant="outlined"
                                            fullWidth
                                            // helperText={formik.errors.nameError && "Invalid Name"}
                                            // error={formik.errors.nameError && true}
                                            // onChange={formik.handleChange}
                                            id="employee"
                                            select
                                        >
                                            {branches &&
                                            branches.map((option) => (
                                                <MenuItem key={option.id} value={option.option}>
                                                {option.option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Job Category"
                                            variant="outlined"
                                            fullWidth
                                            // helperText={formik.errors.nameError && "Invalid Name"}
                                            // error={formik.errors.nameError && true}
                                            // onChange={formik.handleChange}
                                            id="employee"
                                            select
                                        >
                                            {branches &&
                                            branches.map((option) => (
                                                <MenuItem key={option.id} value={option.option}>
                                                {option.option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Positions"
                                            variant="outlined"
                                            fullWidth
                                            // helperText={formik.errors.nameError && "Invalid Name"}
                                            // error={formik.errors.nameError && true}
                                            // onChange={formik.handleChange}
                                            id="employee"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Status"
                                            variant="outlined"
                                            fullWidth
                                            // helperText={formik.errors.nameError && "Invalid Name"}
                                            // error={formik.errors.nameError && true}
                                            // onChange={formik.handleChange}
                                            id="employee"
                                            select
                                        >
                                            {branches &&
                                            branches.map((option) => (
                                                <MenuItem key={option.id} value={option.option}>
                                                {option.option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            id="date-picker"
                                            label="Start Date"
                                            value={new Date()}
                                            fullWidth
                                            onChange={(date) => console.log(date)}
                                            KeyboardButtonProps={{
                                            "aria-label": "change date",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            id="date-picker"
                                            label="End Date"
                                            value={new Date()}
                                            fullWidth
                                            onChange={(date) => console.log(date)}
                                            KeyboardButtonProps={{
                                            "aria-label": "change date",
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <TextField
                                            label="Skill"
                                            variant="outlined"
                                            fullWidth
                                            // helperText={formik.errors.nameError && "Invalid Name"}
                                            // error={formik.errors.nameError && true}
                                            // onChange={formik.handleChange}
                                            id="employee"
                                        />
                                    </Grid>
                                </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={10} style={{padding: 10}}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} display="flex" flexDirection="column">
                                    <Typography>Need to ask?</Typography>
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Gender" />
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Date of Birth" />
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Country" />
                                </Grid>
                                <Grid item xs={12} md={6} display="flex" flexDirection="column">
                                    <Typography>Need to show option?</Typography>
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Profile Image" />
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Resume" />
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Cover Letter" />
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Terms & Conditioins" />
                                </Grid>
                                <Grid item xs={12} md={12} display="flex" flexDirection="column">
                                    <Typography>Custom Question</Typography>
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="What Do You Consider to Be Your Weaknesses?" />
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Why Do You Want This Job?" />
                                    <FormControlLabel control={<Checkbox name="checkedC" />} label="Why Do You Want to Work at This Company?" />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={10} style={{padding: 10}}>
                        <TextField
                            label="Job Description"
                            variant="outlined"
                            fullWidth
                            // helperText={formik.errors.nameError && "Invalid Name"}
                            // error={formik.errors.nameError && true}
                            // onChange={formik.handleChange}
                            id="employee"
                            multiline
                            rows={10}
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={10} style={{padding: 10}}>
                        <TextField
                            label="Job Requirement"
                            variant="outlined"
                            fullWidth
                            // helperText={formik.errors.nameError && "Invalid Name"}
                            // error={formik.errors.nameError && true}
                            // onChange={formik.handleChange}
                            id="employee"
                            multiline
                            rows={10}
                        />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={12} display="flex" flexDirection="row" justifyContent="flex-end">
                        <Button variant="contained">Create</Button>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default CreateJob
