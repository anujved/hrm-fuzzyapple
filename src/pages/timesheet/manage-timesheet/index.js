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
} from "@material-ui/core";
import Header from "src/common/header";
import axios from "axios";
import SearchToolBar from "src/common/search-toolbar";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CreateTimeSheetModal from "./CreateTimeSheetModal";
import EmployeeService from "src/webservices/employeeService";
import Progress from "src/common/loader";
import TimesheetService from "src/webservices/timesheetService";
import moment from 'moment';
import { SignalCellularNullSharp } from "@material-ui/icons";

const ManageTimesheet = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [timesheets, setTimesheets] = React.useState([]);
  const [updateTimeSheet, setUpdateTimeSheet] = React.useState(null);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setOpenDialog(false);
  };

  const fetchEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setLoading(false);
      setEmployees(response);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchTimesheets = async () => {
    try {
      const response = await TimesheetService.fetchAllTimesheet();
      setTimesheets(response);
    } catch (error) { }
  };

  const onSubmitClickListener = async (values) => {
    setOpenDialog(false);
    try {
      const response = await TimesheetService.createTimesheet(values);
      fetchTimesheets();
    } catch (error) {
      console.log("-Create-Error-", error);
    }
  };

  const handleEdit = (id, e) => {
    const { date, employee, hours, remark } = timesheets.find(obj => obj._id === id)
    const updateTimesheetObject = {
      initialValues: { date: date.valueOf(), employee, hours, remark },
      onUpdate: async () => {
        try {
          // const response = await TimesheetService.updateTimeSheet(values);
          const response = null
          // setTimesheets(response)
          console.log("submitting the form")

        } catch (error) {
          console.log("-Create-Error-", error);
        } finally {
          setUpdateTimeSheet(null)
        }

      },
      onClose: () => {
        setUpdateTimeSheet(null)
      }
    }
    setUpdateTimeSheet(updateTimesheetObject)
    setOpenDialog(true);
  }

  const handleDelete = async (id, e) => {
    try {
      const response = await TimesheetService.deleteTimesheet({ id: id });
      if (response.ok) {
        setTimesheets((pre) => {
          const filteredArray = pre.filter(obj => obj._id !== id)
          return filteredArray
        })
      } else {
        throw new Error("Error occured!")
      }
    } catch (error) {
      console.log("-delete-Error-", error);
    }
  }

  React.useEffect(() => {
    fetchEmployees();
    fetchTimesheets();
  }, []);

  return (
    <React.Fragment>
      <Helmet>Manage Timesheet</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Progress loading={loading} />
        {!loading && (
          <Container maxWidth={false}>
            <Header
              title="Manage Timesheet"
              buttonText="Create"
              onClickListener={onClickListener}
              showActionButton
            />
            <SearchToolBar placeholderText="Search Employee" />
            <Card sx={{ mt: 3 }}>
              <PerfectScrollbar>
                <Box sx={{ pt: 3, minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Employee</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Hours</TableCell>
                        <TableCell>Remarks</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {timesheets &&
                        timesheets.slice(0, limit).map((timesheet, index) => (
                          <TableRow hover key={index}>
                            <TableCell>{timesheet.employee}</TableCell>
                            <TableCell>
                              {moment(timesheet.created_at).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell>{timesheet.hours}</TableCell>
                            <TableCell>{timesheet.remark}</TableCell>
                            <TableCell>
                              <Grid container>
                                <Grid>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={handleEdit.bind(this, timesheet._id)}
                                    color="primary"
                                  >
                                    <EditRoundedIcon />
                                  </IconButton>
                                </Grid>
                                <Grid>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={handleDelete.bind(this, timesheet.
                                      _id)}
                                    color="secondary"
                                  >
                                    <DeleteForeverRoundedIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={timesheets.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Container>
        )}
      </Box>
      <CreateTimeSheetModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        employees={employees}
        onSubmitClickListener={onSubmitClickListener}
        updateTimeSheet={updateTimeSheet}
      />
    </React.Fragment>
  );
};

export default ManageTimesheet;