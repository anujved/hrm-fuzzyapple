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
import CreateTransferModal from "./CreateTransferModal";
import HrServices from "src/webservices/hrServices";
import EmployeeService from "src/webservices/employeeService";
import ConstantService from "src/webservices/constantsService";
import ConfirmDialog from "../../../common/confirm-dialog";

const Transfer = (props) => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState([]);
  const [counter, setCounter] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [transfers, setTransfers] = React.useState([]);
  const [transfer, setTransfer] = React.useState([]);
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

  const getBranches = async () => {
    try {
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    } catch (error) {}
  };

  const getDepartments = async () => {
    try {
      const response = await ConstantService.fetchAllDepartment();
      setDepartments(response);
    } catch (error) {}
  };

  const getEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch (error) {}
  };

  const onSubmitClickListener = async (data) => {
    try {
      const response = await HrServices.createTranferHr(data);
      setOpenDialog(false);
      getTransfers();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (transfer) => {
    console.log("delete listener");
    setTransfer(transfer);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await HrServices.deleteTransferHr(transfer._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getTransfers();
    } catch (error) {
      console.log("--Delete-Error--", error);
      setOpenBackdrop(false);
    }
  };

  const onCancelClickListener = () => {
    console.log("cancel listener");
    setOpenConfirmDialog(false);
  };

  const getTransfers = async () => {
    try {
      const response = await HrServices.fetchTransferHr();
      setTransfers(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTransfers();
    getDepartments();
    getBranches();
    getEmployees();
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
            title="Manage Transfer"
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
                      <TableCell>Employee</TableCell>
                      <TableCell>Branch</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Transfer Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transfers &&
                      transfers.slice(0, limit).map((transfer) => (
                        <TableRow
                          hover
                          key={transfer._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {transfer?.employee.personalDetail.employeeName}
                          </TableCell>
                          <TableCell>{transfer?.branch.branchName}</TableCell>
                          <TableCell>{transfer?.department.name}</TableCell>
                          <TableCell>{transfer.transfer_date}</TableCell>
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
                                    onClick={() => {
                                      onDeleteClickListener(transfer);
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
              count={transfers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateTransferModal
        open={openDialog}
        employees={employees}
        branches={branches}
        departments={departments}
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

export default Transfer;
