import React from 'react'
import {Box, Grid, Paper, Typography} from '@material-ui/core';
import FilterView from './FilterView';
const MonthlyAttendance = () => {
    return (
        <React.Fragment>
            <Box px={5} py={3}>
                <FilterView />
                <Box py={5}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper style={{padding: 20}} elevation={1}>
                                <Typography variant="h5" color="#A2B0BB">Report:</Typography>
                                <Typography>Attendance Summary</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper style={{padding: 20}} elevation={1}>
                                <Typography variant="h5" color="#A2B0BB">Duration:</Typography>
                                <Typography>May 2021</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper style={{padding: 20}} elevation={1}>
                                <Typography variant="h5" color="#A2B0BB">Attendance:</Typography>
                                <Typography>Total Present : 0</Typography>
                                <Typography>Total Leave : 0</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper style={{padding: 20}} elevation={1}>
                                <Typography variant="h5" color="#A2B0BB">Overtime:</Typography>
                                <Typography>Total overtime in hours : 0.00</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper style={{padding: 20}} elevation={1}>
                                <Typography variant="h5" color="#A2B0BB">Early Leave:</Typography>
                                <Typography>Total early leave in hours : 0.00</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper style={{padding: 20}} elevation={1}>
                                <Typography variant="h5" color="#A2B0BB">Employee Late:</Typography>
                                <Typography>Total late in hours : 0.00</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default MonthlyAttendance
