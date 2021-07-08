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
import CreateResignationModal from "./CreateResignationModal";
import HrServices from "src/webservices/hrServices";
import EmployeeService from "src/webservices/employeeService";
import ConfirmDialog from "../../../common/confirm-dialog";

const Resignation = (props) => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState([]);
  const [counter, setCounter] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [employees, setEmployees] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [resignations, setResignations] = React.useState([]);
  const [resignation, setResignation] = React.useState(null);
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

  const onSubmitClickListener = async (data) => {
    try {
      const response = await HrServices.createResignation(data);
      setCounter((pre) => pre + 1);
      getResignation();
    } catch (error) {
      console.log(error);
    }
  };

  const getResignation = async () => {
    try {
      const response = await HrServices.fetchResignations();
      setResignations(response);
      console.log(resignations);
    } catch (error) {}
  };

  const getEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch (error) {}
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await HrServices.deleteResignation(id);
  //     if (response.ok) {
  //       setValues((pre) => {
  //         return pre.filter((obj) => obj._id !== id);
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (resignation) => {
    console.log("delete listener");
    setResignation(resignation);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await HrServices.deleteResignation(resignation._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getResignation();
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
    getResignation();
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
            title="Manage Resignation"
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
                      <TableCell>Notice Date</TableCell>
                      <TableCell>Resignation Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {resignations &&
                      resignations.slice(0, limit).map((resignation) => (
                        <TableRow
                          hover
                          key={resignation._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {resignation.employee?.personalDetail?.employeeName}
                          </TableCell>
                          <TableCell>{resignation.notice_date}</TableCell>
                          <TableCell>{resignation.resignation_date}</TableCell>
                          <TableCell>{resignation.description}</TableCell>
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
                                      onDeleteClickListener(resignation)
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
              count={resignations.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateResignationModal
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

export default Resignation;
