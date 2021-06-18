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
  Paper,
} from "@material-ui/core";
import Header from "src/common/header";
import axios from "axios";
import SearchToolBar from "src/common/search-toolbar";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
// import CreateAnnouncementModal from "./CreateAnnouncementModal";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import GroupIcon from "@material-ui/icons/Group";
import WorkIcon from '@material-ui/icons/Work';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import LinkIcon from '@material-ui/icons/Link';
const payslips = [
  {
    id: 1,
    branch: "Science",
    title: "The Great versatility of Business Jobs",
    startDate: "MAR 4, 2020",
    endDate: "MAR 4, 2020",
    status: "Active",
    createdAt: "MAR 4, 2020",
  },
  {
    id: 2,
    branch: "Science",
    title: "The Great versatility of Business Jobs",
    startDate: "MAR 4, 2020",
    endDate: "MAR 4, 2020",
    status: "Active",
    createdAt: "MAR 4, 2020",
  },
];

const Jobs = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const onClickListener = () => {
    navigate('/recruitment/jobs/create');
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

  return (
    <React.Fragment>
      <Helmet>Training List</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Job"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton
          />
          <Box py={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper elevation={8} style={{ padding: 15 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid
                      item
                      md={6}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      justifyItems="center"
                    >
                      <GroupIcon
                        style={{
                          marginRight: 10,
                          backgroundColor: "#135FF7",
                          borderRadius: "50%",
                          color: "#FFFFFF",
                          padding: 5,
                          fontSize: 50
                        }}
                      />
                      <Typography variant="h5">Total Jobs</Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="h5">5</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={8} style={{ padding: 15 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid
                      item
                      md={6}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      justifyItems="center"

                    >
                      <WorkIcon
                        style={{
                          marginRight: 10,
                          backgroundColor: "#04BB89",
                          borderRadius: "50%",
                          color: "#FFFFFF",
                          padding: 5,
                          fontSize: 50
                        }}
                      />
                      <Typography variant="h5">Active Jobs</Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="h5">4</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={8} style={{ padding: 15 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid
                      item
                      md={6}
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      justifyItems="center"

                    >
                      <WorkOffIcon
                        style={{
                          marginRight: 10,
                          backgroundColor: "#ED3A3A",
                          borderRadius: "50%",
                          color: "#FFFFFF",
                          padding: 5,
                          fontSize: 50
                        }}
                      />
                      <Typography variant="h5">Inactive Jobs</Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography variant="h5">1</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          <SearchToolBar placeholderText="Search" />
          <Card sx={{ mt: 3 }}>
            <PerfectScrollbar>
              <Box sx={{ pt: 3, minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Branch</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created At</TableCell>
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
                        <TableCell>{payslip.branch}</TableCell>
                        <TableCell>{payslip.title}</TableCell>
                        <TableCell>{payslip.startDate}</TableCell>
                        <TableCell>{payslip.endDate}</TableCell>
                        <TableCell>
                            <Box paddingX={2} borderRadius={5} style={{backgroundColor: '#04BB89', color: '#FFFFFF'}}>
                            {payslip.status}
                            </Box>
                        </TableCell>
                        <TableCell>{payslip.createdAt}</TableCell>
                        <TableCell>
                          <Grid container alignItems="center">
                          <Grid item display="flex" flexDirection="row" alignItems="center">
                              <Tooltip title="Copy Link" placement="top" arrow>
                                <IconButton style={{ color: "#00B8D9" }} onClick={() => {}}>
                                  <LinkIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View Detail" placement="top" arrow>
                                <IconButton style={{ color: "#04BB89" }} onClick={() => {}}>
                                  <VisibilityRoundedIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit" placement="top" arrow>
                                <IconButton style={{ color: "#105EF7" }} onClick={() => {}}>
                                  <EditRoundedIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete" placement="top" arrow>
                                <IconButton style={{ color: "#ED3A3A" }} onClick={() => {}}>
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
      {/* <CreateAnnouncementModal open={openDialog} onCloseClickListener={onDialogCloseClickListener} /> */}
    </React.Fragment>
  );
};

export default Jobs;
