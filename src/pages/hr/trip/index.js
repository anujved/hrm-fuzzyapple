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
import CreateTripModal from "./CreateTripModal";
import HrServices from "src/webservices/hrServices";
import EmployeeService from "src/webservices/employeeService";
import ConfirmDialog from "../../../common/confirm-dialog";

const Trip = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [trips, setTrips] = React.useState([]);
  const [trip, setTrip] = React.useState(null);
  const [employees, setEmployees] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

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

  const getEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch (error) {}
  };

  const onSubmitClickListener = async (data) => {
    try {
      console.log("submit click");
      const response = await HrServices.createTrip(data);
      setOpenDialog(false);
      // setCounter((pre) => pre + 1);
      getTrips();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (trip) => {
    console.log("delete listener");
    setTrip(trip);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await HrServices.deleteTrip(trip._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getTrips();
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
  //     const response = await HrServices.fetchTrips();
  //     setValues(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getTrips = async () => {
    try {
      const response = await HrServices.fetchTrips();
      setTrips(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getEmployees();
    getTrips();
  }, []);

  // React.useEffect(() => {
  //   fetchData();
  // }, [counter]);

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
            title="Manage Trip"
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
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Purpose Of Visit</TableCell>
                      <TableCell>Place Of Visit</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trips &&
                      trips.slice(0, limit).map((trip) => (
                        <TableRow
                          hover
                          key={trip._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {trip.employee?.personalDetail?.employeeName}
                          </TableCell>
                          <TableCell>{trip.start_date}</TableCell>
                          <TableCell>{trip.end_date}</TableCell>
                          <TableCell>{trip.purpose}</TableCell>
                          <TableCell>{trip.place}</TableCell>
                          <TableCell>{trip.description}</TableCell>
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
                                    onClick={() => onDeleteClickListener(trip)}
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
              count={trips.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateTripModal
        open={openDialog}
        employees={employees}
        onCloseClickListener={onDialogCloseClickListener}
        onSubmitClickListener={onSubmitClickListener}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
    </React.Fragment>
  );
};

export default Trip;
