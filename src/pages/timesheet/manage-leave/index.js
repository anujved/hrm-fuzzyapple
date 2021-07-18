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
import PlayCircleFilledOutlinedIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import CreateLeaveModal from "./CreateLeaveModal";
import LeaveActionModal from "./LeaveActionModal";
import EmployeeService from "src/webservices/employeeService";
import { CatchingPokemonSharp } from "@material-ui/icons";
import TimesheetService from "src/webservices/timesheetService";
import ConfirmDialog from "src/common/confirm-dialog";
import { get } from "lodash";

const ManageTimesheet = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openLeaveActionDialog, setOpenLeaveActionDialog] =
    React.useState(false);
  const [leaveData, setLeaveData] = React.useState(null);
  const [employees, setEmployees] = React.useState([]);
  const [leaves, setLeaves] = React.useState([]);
  const [leave, setLeave] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [currenSelecteRow, setCurrenSelecteRow] = React.useState(null);

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
    setCurrenSelecteRow(null);
  };

  const onSubmitClickListener = async (data) => {
    try {
      if (currenSelecteRow) {
         TimesheetService.updateLeave({
          data: {
            ...data,
            employeeId: get(currenSelecteRow, "employee.employeeId"),
          },
          params: get(currenSelecteRow, "_id"),
        }).then((r)=>submitSucces(r))
      } else {
        TimesheetService.createLeave(data).then(r=>submitSucces(r))
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitSucces = (response) =>{
    setOpenDialog(false);
    getLeaves();
  }

  const onLeaveActionClickListener = (data) => {
    setLeaveData(data);
    setOpenLeaveActionDialog(true);
  };

  const onLeaveActionDialogCloseClickListener = () => {
    setLeaveData(null);
    setOpenLeaveActionDialog(false);
  };

  const getEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch (error) {}
  };

  const getLeaves = async () => {
    try {
      const response = await TimesheetService.fetchAllLeave();
      setLeaves(response);
    } catch (error) {}
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (leave) => {
    console.log("delete listener");
    setLeave(leave);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await TimesheetService.deleteLeave(leave._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getLeaves();
    } catch (error) {
      console.log("--Delete-Error--", error);
      setOpenBackdrop(false);
    }
  };

  const onCancelClickListener = () => {
    console.log("cancel listener");
    setOpenConfirmDialog(false);
  };

  React.useEffect(() => {
    getEmployees();
    getLeaves();
  }, []);

  /**
   *
   * @param {Object} currentRow select Current row
   */
  const editHandler = (currentRow) => {
    setCurrenSelecteRow(currentRow);
    setOpenDialog(true);
  };

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
                      <TableCell>Leave Type</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Leave Reason</TableCell>
                      <TableCell>remarks</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaves &&
                      leaves.slice(0, limit).map((leave) => (
                        <TableRow
                          hover
                          key={leave.id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {leave?.employee?.personalDetail?.employeeName}
                          </TableCell>
                          <TableCell>{leave.leaveType}</TableCell>
                          <TableCell>{leave.startDate}</TableCell>
                          <TableCell>{leave.endDate}</TableCell>
                          <TableCell>{leave.leaveReason}</TableCell>
                          <TableCell>{leave.remark}</TableCell>
                          <TableCell>
                            <Grid container>
                              <Grid>
                                <Tooltip
                                  title="Leave Action"
                                  placement="top"
                                  arrow
                                >
                                  <IconButton
                                    style={{ float: "right", color: "green" }}
                                    onClick={() =>
                                      onLeaveActionClickListener(leave)
                                    }
                                    color="primary"
                                  >
                                    <PlayCircleFilledOutlinedIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                              <Grid>
                                <Tooltip title="Edit" placement="top" arrow>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={editHandler.bind(this, leave)}
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
                                    onClick={() => {
                                      onDeleteClickListener(leave);
                                    }}
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
              count={leaves.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      {
        openDialog && <CreateLeaveModal
        open={openDialog}
        employees={employees}
        onSubmitClickListener={onSubmitClickListener}
        onCloseClickListener={onDialogCloseClickListener}
        editRow={currenSelecteRow}
      /> 
      }
      
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
      <LeaveActionModal
        open={openLeaveActionDialog}
        onCloseClickListener={onLeaveActionDialogCloseClickListener}
        data={leaveData}
      />
    </React.Fragment>
  );
};

export default ManageTimesheet;
