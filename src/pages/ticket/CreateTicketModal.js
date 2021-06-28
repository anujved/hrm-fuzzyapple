import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import { APP_STRINGS } from "src/utils/strings";
import TicketService from "src/webservices/ticketService";


const CreateTicketModal = ({
  open,
  onCloseClickListener,
  employees,
  onSubmitClickListener,
}) => {
  const [endDate, setEndDate] = useState(Date.now);
  const [lastTicketCode, setLastTicketCode] = useState(0);

  const formik = useFormik({
    initialValues: {
      subject: "",
      employee: "",
      priority: "",
      description: "Male",
    },
    validate: (values) => {
      const errors = {};
      if (values.subject.length === 0) {
        errors.subjectError = "required";
      }
      if (values.employee.length === 0) {
        errors.employeeError = "required";
      }
      if (values.priority.length === 0) {
        errors.priorityError = "required";
      }
      if (values.description.length === 0) {
        errors.descriptionError = "required";
      }

      return errors;
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        endDate: endDate._d,
        status: "Active",
        ticketCode: lastTicketCode + 1,
        newTicket: true,
      };
      // alert(JSON.stringify(data));
      onSubmitClickListener(data);
    },
    validateOnChange: false,
  });

  const getLastTicket = async () => {
    try {
      const response = await TicketService.fetchAllTicket();
      let lastTicketCode = 0;
      if (response.length > 0) {
        const lastTicket = response[response.length - 1];
        lastTicketCode = Number.parseInt(lastTicket.ticketCode);
        setLastTicketCode(lastTicketCode);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getLastTicket();
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={onCloseClickListener}>
        <Box py={2} px={4}>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New Ticket</Typography>
              <IconButton onClick={onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.subjectError}
                  error={formik.errors.subjectError && true}
                  onChange={formik.handleChange}
                  name="subject"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Ticket for Employee"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.employeeError}
                  error={formik.errors.employeeError && true}
                  onChange={formik.handleChange}
                  name="employee"
                  select
                >
                  {employees &&
                    employees.map((option, index) => (
                      <MenuItem key={index} value={option._id}>
                        {option.personalDetail.employeeName}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Priority"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.priorityError}
                  error={formik.errors.priorityError && true}
                  onChange={formik.handleChange}
                  name="priority"
                  select
                >
                  {APP_STRINGS.priorities.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk
                  variant="inline"
                  format="DD/MM/yyyy"
                  label="End Date"
                  fullWidth
                  value={endDate}
                  onChange={(value) => setEndDate(value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.descriptionError}
                  error={formik.errors.descriptionError && true}
                  onChange={formik.handleChange}
                  name="description"
                  multiline
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginRight: 10 }}
                >
                  Create
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

export default CreateTicketModal;
