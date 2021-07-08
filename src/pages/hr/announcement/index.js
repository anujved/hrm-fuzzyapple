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
import CreateAnnouncementModal from "./CreateAnnouncementModal";
import ConstantService from "src/webservices/constantsService";
import EmployeeService from "src/webservices/employeeService";
import ConfirmDialog from "../../../common/confirm-dialog";
import HrServices from "src/webservices/hrServices";
import SimpleBackdrop from "../../../common/backdrop";

const Announcement = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [branches, setBranches] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [announcements, setAnnouncements] = React.useState([]);
  const [announcement, setAnnouncement] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setOpenDialog(false);
  };

  const getAnnouncements = async () => {
    try {
      const response = await HrServices.fetchAnnouncements();
      setAnnouncements(response);
      console.log("response");
    } catch (error) {}
  };

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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const onSubmitClickListener = async (data) => {
    setOpenDialog(false);
    try {
      const response = await HrServices.createAnnouncement(data);
      // setAnnouncements(response);
      getAnnouncements();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (announcement) => {
    console.log("delete listener");
    setAnnouncement(announcement);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      console.log(announcement);
      const result = await HrServices.deleteAnnouncement(announcement._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getAnnouncements();
    } catch (error) {
      console.log("--Delete-Error--", error);
      setOpenBackdrop(false);
    }
  };

  const onCancelClickListener = () => {
    console.log("cancel listener");
    setOpenConfirmDialog(false);
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await HrServices.fetchAnnouncements();
  //     console.log("-response-", response);
  //     setAnnouncements(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  React.useEffect(() => {
    // fetchData();
    getAnnouncements();
    getEmployees();
    getBranches();
    getDepartments();
  }, []);

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
            title="Manage Announcement"
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
                      <TableCell>Title</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(announcements) &&
                      announcements.slice(0, limit).map((announcement) => (
                        <TableRow
                          hover
                          key={announcement._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {announcement.announcement_title}
                          </TableCell>
                          <TableCell>
                            {announcement.announcement_start_date}
                          </TableCell>
                          <TableCell>
                            {announcement.announcement_end_date}
                          </TableCell>
                          <TableCell>{announcement.description}</TableCell>
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
                                      onDeleteClickListener(announcement)
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
              count={announcements ? announcements.length : 10}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateAnnouncementModal
        open={openDialog}
        branches={branches}
        departments={departments}
        employees={employees}
        onCloseClickListener={onDialogCloseClickListener}
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

export default Announcement;
