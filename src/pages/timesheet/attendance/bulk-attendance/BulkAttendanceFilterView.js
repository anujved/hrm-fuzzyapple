import React from "react";
import {
  Grid,
  Container,
  RadioGroup,
  Radio,
  TextField,
  MenuItem,
  FormControlLabel,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import axios from "axios";
import RestoreFromTrashIcon from "@material-ui/icons/RestoreFromTrash";
import SearchIcon from "@material-ui/icons/Search";

const MarkedAttendanceFilterView = (props) => {
  const [date, setDate] = React.useState(new Date());
  const [type, setType] = React.useState("Month");
  const [month, setMonth] = React.useState(null);
  const [day, setDay] = React.useState(null);
  const [department, setDepartment] = React.useState(null);
  const [branch, setBranch] = React.useState(null);
  const [branches, setBranches] = React.useState(null);

  /**
   * Effect to fetch all branches
   */
  React.useEffect(() => {
    const endpoint = "/branches";
    axios
      .get(endpoint)
      .then((res) => {
        console.log("--CreateEmployee Branches--", res?.data);

        setBranches(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onTypeClickListener = event => {
      setType(event.target.value);
  }

  return (
    <Grid
      container
      alignItems="center"
      //   justifyContent="center"
      p={2}
      spacing={3}
    >
      <Grid item xs={12} md={4}>
        
      </Grid>
      <Grid item xs={12} md={2}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/ddd/yyyy"
          margin="normal"
          id="date-picker"
          label="Month"
          value={date}
          fullWidth
          onChange={(date) => setDate(date)}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          label="Branch"
          variant="outlined"
          fullWidth
          select
          //   onChange={formik.handleChange}
          id="branchName"
        >
          {branches &&
            branches.map((option) => (
              <MenuItem key={option._id} value={option.branchName}>
                {option.branchName}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          label="Department"
          variant="outlined"
          fullWidth
          select
          //   onChange={formik.handleChange}
          id="branchName"
        >
          {branches &&
            branches.map((option) => (
              <MenuItem key={option._id} value={option.branchName}>
                {option.branchName}
              </MenuItem>
            ))}
        </TextField>
      </Grid>
      <Grid item xs={12} md={2}>
        <Tooltip title="Search" placement="top" arrow>
          <IconButton style={{}} onClick={() => {}}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Restore" placement="top" arrow>
          <IconButton style={{ color: "red" }} onClick={() => {}}>
            <RestoreFromTrashIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default MarkedAttendanceFilterView;
