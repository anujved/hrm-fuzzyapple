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
} from "@material-ui/core";
import Header from "src/common/header";
import axios from "axios";
import SearchToolBar from "src/common/search-toolbar";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CreateMeetingModal from "./CreateMeetingModal";
import ConstantService from "src/webservices/constantsService";
import EmployeeService from "src/webservices/employeeService";
import MeetingService from "src/webservices/meetingService";
import ConfirmDialog from "../../common/confirm-dialog";
import SimpleBackdrop from "../../common/backdrop";

const Meeting = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [meetings, setMeetings] = React.useState([]);
  const [meeting, setMeeting] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const getBranches = async () => {
    try {
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    } catch (error) {}
  };
  const getEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch (error) {}
  };
  const getDepartments = async () => {
    try {
      const response = await ConstantService.fetchAllDepartment();
      setDepartments(response);
    } catch (error) {}
  };

  const getMeetings = async () => {
    try {
      const response = await MeetingService.fetchAllMeeting();
      setMeetings(response);
    } catch (error) {}
  };

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setOpenDialog(false);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const onSubmitClickListener = async (data) => {
    setOpenDialog(false);
    try {
      const response = await MeetingService.createMeeting(data);
      //TODO: send email to respetive employee, branch and department here
      getMeetings();
    } catch (error) {}
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (meeting) => {
    setMeeting(meeting);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await MeetingService.deleteMeeting(meeting._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getMeetings();
    } catch (error) {
      console.log("--Delete-Error--", error);
      setOpenBackdrop(false);
    }
  };

  const onCancelClickListener = () => {
    setOpenConfirmDialog(false);
  };

  React.useEffect(() => {
    getBranches();
    getEmployees();
    getDepartments();
    getMeetings();
  }, []);

  return (
    <React.Fragment>
      <Helmet>Meeting List</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Meeting"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton
          />
          <SearchToolBar placeholderText="Search" />
          <Card sx={{ mt: 3 }}>
            <PerfectScrollbar>
              <Box sx={{ pt: 3, minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Meeting Title</TableCell>
                      <TableCell>Meeting Date</TableCell>
                      <TableCell>Meeting Time</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {meetings &&
                      meetings.slice(0, limit).map((meeting) => (
                        <TableRow
                          hover
                          key={meeting._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>{meeting.meeting_title}</TableCell>
                          <TableCell>{meeting.meeting_date}</TableCell>
                          <TableCell>{meeting.meeting_time}</TableCell>
                          <TableCell>
                            <Grid container>
                              <Grid>
                                <Tooltip title="Edit" placement="top" arrow>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={() => {}}
                                    color="primary"
                                  >
                                    <EditRoundedIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                              <Grid>
                                <Tooltip title="Delete" placement="top" arrow>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={() =>
                                      onDeleteClickListener(meeting)
                                    }
                                    color="secondary"
                                  >
                                    <DeleteForeverRoundedIcon />
                                  </IconButton>
                                </Tooltip>
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
              count={meetings.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateMeetingModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        branches={branches}
        employees={employees}
        departments={departments}
        onSubmitClickListener={onSubmitClickListener}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
      <SimpleBackdrop open={openBackdrop} />
    </React.Fragment>
  );
};

export default Meeting;
