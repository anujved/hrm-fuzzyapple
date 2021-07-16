import React, { useMemo } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import { get,map } from "lodash";

const leaveTypes = [
  { id: 1, option: "Casual Leave" },
  { id: 2, option: "Medical Leave" },
];

const CreateLeaveModal = ({ open, employees, onCloseClickListener, onSubmitClickListener,editRow }) => {

  const [startDate, setStartDate] = React.useState(Date.now);
  const [endDate, setEndDate] = React.useState(Date.now);

  const formik = useFormik({
    initialValues: {
      employee: get(editRow,'employee.employeeId',""),
      leaveType: get(editRow,'leaveType',""),
      leaveReason: get(editRow,'leaveReason',""),
      remark: get(editRow,'remark',""),
    },
    validate: (values) => {
      const errors = {};

     
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        employee: values.employee,
        leaveType: values.leaveType,
        startDate: startDate._d,
        endDate: endDate._d,
        leaveReason: values.leaveReason,
        remark: values.remark,
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
      setTimeout(() => {
        onCloseClickListener();
      }, 1000);
    },
    validateOnChange: false,
  });

  const employeesOption = useMemo(()=>{
    return map(employees, (option, index) => (
      <MenuItem key={`${index}_${get(option,'personalDetail.employeeName')}`} value={option.employeeId}>
      {option.personalDetail.employeeName}
    </MenuItem>))
  
  },[employees])


  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        aria-labelledby="form-dialog-title"
      >
        <Box py={2} px={4}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Grid container justifyContent="space-between" alignItems="center">
            {
              !!editRow? <Typography>Update TimeSheet</Typography>:<Typography>Create New TimeSheet</Typography> 
            }
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <TextField
                label="Employee"
                id="Employee"
                variant="outlined"
                fullWidth
                name="employee"
                value={formik.values.employee}
                onChange={formik.handleChange}
                select
              >
              {
               employeesOption
              }
              </TextField>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Leave Type"
                variant="outlined"
                fullWidth
                name="leaveType"
                value={formik.values.leaveType}
                onChange={formik.handleChange}
                select
              >
                  {leaveTypes &&
                    leaveTypes.map((option) => (
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
                format="MM/DD/yyyy"
                id="date-picker"
                label="Start Date"
                value={startDate}
                fullWidth
                
                onChange={(value) => setStartDate(value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/yyyy"
                id="date-picker"
                label="End Date"
                value={endDate}
                fullWidth
                onChange={(value) => setEndDate(value)}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Leave Reason"
                variant="outlined"
                fullWidth
                value={formik.values.leaveReason}
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="leaveReason"
                multiline
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                label="Remark"
                variant="outlined"
                fullWidth
                value={formik.values.remark}
                // helperText={formik.errors.nameError && "Invalid Name"}
                // error={formik.errors.nameError && true}
                onChange={formik.handleChange}
                name="remark"
                multiline
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" style={{ marginRight: 10 }}>
                {
                  !!editRow ?'update':'Create'
                }
              </Button>
              <Button>Cancel</Button>
            </Grid>
          </Grid>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateLeaveModal;
