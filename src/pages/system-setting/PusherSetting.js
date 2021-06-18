import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Paper,
  TextField,
  Switch,
} from "@material-ui/core";

const PusherSetting = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Pusher App Id"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="companyName"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Pusher App Key"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="address"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Pusher App Secret"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="city"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Pusher App Cluster"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="state"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              style={{ float: 'right' }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PusherSetting;
