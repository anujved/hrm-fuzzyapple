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

const EmailSetting = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            label="Mail Driver"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="companyName"
            required
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Mail Host"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="address"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Mail Port"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="city"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Mail Username"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="state"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Mail Password"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="companyName"
            required
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Mail Encryption"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="address"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Mail From Address"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="city"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            label="Mail From Name"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="state"
          />
        </Grid>
        <Grid item xs={12} md={6} justifyContent="space-between">
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              style={{ float: "left", backgroundColor: '#00B8D9' }}
            >
              Send Test Mail
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} justifyContent="space-between">
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              style={{ float: "right" }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EmailSetting;
