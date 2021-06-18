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

const payslips = [
  {
    id: 1,
    employeeId: "#EMP0886787",
    name: "Karie Smith",
    leaveType: "Medical Leave",
    appliedOn: "MAR 4, 2020",
    startDate: "MAR 2, 2020",
    endDate: "MAR 5, 2020",
    totalDays: "3",
    leaveReason: "Lorem Ipsum",
    status: "Approal",
  },
  {
    id: 2,
    employeeId: "#EMP0886787",
    name: "Karie Smith",
    leaveType: "Medical Leave",
    appliedOn: "MAR 4, 2020",
    startDate: "MAR 2, 2020",
    endDate: "MAR 5, 2020",
    totalDays: "3",
    leaveReason: "Lorem Ipsum",
    status: "Pending",
  },
];

const ManageTimesheet = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openLeaveActionDialog, setOpenLeaveActionDialog] = React.useState(false);
  const [leaveData, setLeaveData] = React.useState(null);

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
  }

  const onLeaveActionClickListener = (data) => {
    setLeaveData(data);
    setOpenLeaveActionDialog(true);
  };

  const onLeaveActionDialogCloseClickListener = () => {
    setLeaveData(null);
    setOpenLeaveActionDialog(false);
  }

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
                      <TableCell>Applied On</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Total Days</TableCell>
                      <TableCell>Leave Reason</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payslips.slice(0, limit).map((payslip) => (
                      <TableRow
                        hover
                        key={payslip.id}
                        //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                      >
                        <TableCell>{payslip.name}</TableCell>
                        <TableCell>{payslip.leaveType}</TableCell>
                        <TableCell>{payslip.appliedOn}</TableCell>
                        <TableCell>{payslip.startDate}</TableCell>
                        <TableCell>{payslip.endDate}</TableCell>
                        <TableCell>{payslip.totalDays}</TableCell>
                        <TableCell>{payslip.leaveReason}</TableCell>
                        <TableCell>{payslip.status}</TableCell>
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
                                  onClick={() => onLeaveActionClickListener(payslip)}
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
                                  onClick={() => {}}
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
              count={payslips.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateLeaveModal open={openDialog} onCloseClickListener={onDialogCloseClickListener} />
      <LeaveActionModal open={openLeaveActionDialog} onCloseClickListener={onLeaveActionDialogCloseClickListener} data={leaveData} />
    </React.Fragment>
  );
};

export default ManageTimesheet;
