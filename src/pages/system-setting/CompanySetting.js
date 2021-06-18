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

const CompanySetting = (props) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Company Name"
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
            label="Address"
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
            label="City"
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
            label="State"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="state"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Zip/Post Code"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="zip"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="country"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Telephone"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="telephone"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="System Email"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="systemEmail"
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email (From Name)"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="emailFrom"
            required
          />
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Company Start Time"
              variant="outlined"
              fullWidth
              // helperText={formik.errors.nameError && "Invalid Name"}
              // error={formik.errors.nameError && true}
              // onChange={formik.handleChange}
              id="companyStartTime"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Company End Time"
              variant="outlined"
              fullWidth
              // helperText={formik.errors.nameError && "Invalid Name"}
              // error={formik.errors.nameError && true}
              // onChange={formik.handleChange}
              id="companyEndTime"
              required
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Time Zone"
            variant="outlined"
            fullWidth
            // helperText={formik.errors.nameError && "Invalid Name"}
            // error={formik.errors.nameError && true}
            // onChange={formik.handleChange}
            id="timeZone"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Switch
            checked={true}
            // onChange={handleChange}
            name="checkedA"
            label="Ip Restrict"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box mt={3}>
            <Button
              type="submit"
              variant="contained"
              style={{ float: 'right' }}
            >
              Save Change
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CompanySetting;
