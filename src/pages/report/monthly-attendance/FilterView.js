import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  IconButton,
} from "@material-ui/core";
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import SearchIcon from "@material-ui/icons/Search";
import GetAppIcon from "@material-ui/icons/GetApp";
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
function FilterView() {
  return (
    <React.Fragment>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Manage Monthly Attendance</Typography>
        </Grid>
        <Grid
        item
          xs={12}
          md={6}
          display="flex"
          justifyContent="flex-start"
          flexDirection="row"
        >
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
            required
            style={{marginRight: 3}}
          />
          <TextField
                label="Batch"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="fullName"
                select
                style={{marginRight: 3}}
              />
              <TextField
                label="Department"
                variant="outlined"
                fullWidth
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                // onChange={formik.handleChange}
                id="fullName"
                select
                style={{marginRight: 3}}
              />
              <IconButton style={{color: '#FFFFFF', backgroundColor: '#105EF7', width: 30, height: 30, alignSelf: 'center', marginRight: 3}}>
                  <SearchIcon style={{fontSize: 15}} />
              </IconButton>
              <IconButton style={{color: '#FFFFFF', backgroundColor: '#FF5630', width: 30, height: 30, alignSelf: 'center', marginRight: 3}}>
                  <RestoreFromTrashIcon style={{fontSize: 15}} />
              </IconButton>
              <IconButton style={{color: '#FFFFFF', backgroundColor: '#051C4B', width: 30, height: 30, alignSelf: 'center'}}>
                  <GetAppIcon style={{fontSize: 15}} />
              </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default FilterView;
