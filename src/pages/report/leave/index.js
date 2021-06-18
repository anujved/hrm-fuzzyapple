import React from "react";
import { Box, Grid, Typography, Paper } from "@material-ui/core";
import FilterView from "./FilterView";
function Leave() {
  return (
    <React.Fragment>
      <Box px={5} py={3}>
        <FilterView />
        <Box py={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: 20 }} elevation={1}>
                <Typography variant="h5" color="#A2B0BB">
                  Report:
                </Typography>
                <Typography>Monthly Leave Summary</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: 20 }} elevation={1}>
                <Typography variant="h5" color="#A2B0BB">
                  Duration:
                </Typography>
                <Typography>May 2021</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: 20 }} elevation={1}>
                <Typography variant="h5" color="#A2B0BB">
                  Approved Leaves:
                </Typography>
                <Typography>0</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: 20 }} elevation={1}>
                <Typography variant="h5" color="#A2B0BB">
                  Rejected Leave:
                </Typography>
                <Typography>0</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper style={{ padding: 20 }} elevation={1}>
                <Typography variant="h5" color="#A2B0BB">
                  Pending Leaves:
                </Typography>
                <Typography>1</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Leave;
