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
import CreateTerminationModal from "./CreateTerminationModal";
import HrServices from "src/webservices/hrServices";
import EmployeeService from "src/webservices/employeeService";
import ConstantService from "src/webservices/constantsService";
import ConfirmDialog from "../../../common/confirm-dialog";

const Termination = (props) => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState([]);
  const [counter, setCounter] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [employees, setEmployees] = React.useState([]);
  const [terminations, setTerminations] = React.useState([]);
  const [terminationTypes, setTerminationTypes] = React.useState([]);
  const [termination, setTermination] = React.useState(null);
  const [page, setPage] = React.useState(0);
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
      const response = await HrServices.createTermination(data);
      // setCounter((pre) => pre + 1);
      getTerminations();
    } catch (error) {
      console.log(error);
    }
  };

  const getTerminations = async () => {
    try {
      const response = await HrServices.fetchTerminations();
      setTerminations(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getTerminationTypes = async () => {
    try {
      const response = await ConstantService.fetchAllTerminationTypes();
      setTerminationTypes(response);
    } catch (error) {}
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (termination) => {
    console.log("delete listener");
    setTermination(termination);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await HrServices.deleteTermination(termination._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getTerminations();
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
    getTerminations();
    getTerminationTypes();
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
            title="Manage Termination"
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
                      <TableCell>Termination Type</TableCell>
                      <TableCell>Notice Date</TableCell>
                      <TableCell>Termination Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {terminations &&
                      terminations.slice(0, limit).map((termination) => (
                        <TableRow
                          hover
                          key={termination._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {termination.employee.personalDetail.employeeName}
                          </TableCell>
                          <TableCell>
                            {termination?.termination_type.name}
                          </TableCell>
                          <TableCell>{termination.notice_date}</TableCell>
                          <TableCell>{termination.termination_date}</TableCell>
                          <TableCell>{termination.description}</TableCell>
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
                                      onDeleteClickListener(termination)
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
              count={terminations.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateTerminationModal
        open={openDialog}
        employees={employees}
        terminationTypes={terminationTypes}
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

export default Termination;
