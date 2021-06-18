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

const ManageTimesheet = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [timesheets, setTimesheets] = React.useState([]);

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
    } catch (error) {}
  };

  const onSubmitClickListener = async (values) => {
    setOpenDialog(false);
    try {
      const response = await TimesheetService.createTimesheet(values);
      console.log("-Create-Success-", response);
      fetchTimesheets();
    } catch (error) {
      console.log("-Create-Error-", error);
    }
  };

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
                                    onClick={() => {}}
                                    color="primary"
                                  >
                                    <EditRoundedIcon />
                                  </IconButton>
                                </Grid>
                                <Grid>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={() => {}}
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
      />
    </React.Fragment>
  );
};

export default ManageTimesheet;
