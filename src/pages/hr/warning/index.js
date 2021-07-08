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
import CreateWarningModal from "./CreateWarningModal";
import HrServices from "src/webservices/hrServices";
import EmployeeService from "src/webservices/employeeService";
import ConfirmDialog from "../../../common/confirm-dialog";

const Warning = (props) => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState([]);
  const [counter, setCounter] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [warnings, setWarnings] = React.useState([]);
  const [warning, setWarning] = React.useState(null);
  const [employees, setEmployees] = React.useState([]);
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
      const response = await HrServices.createWarning(data);
      setCounter((pre) => pre + 1);
      getWarnings();
    } catch (error) {
      console.log(error);
    }
  };

  const getWarnings = async () => {
    try {
      const response = await HrServices.fetchWarnings();
      setWarnings(response);
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (warning) => {
    console.log("delete listener");
    setWarning(warning);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await HrServices.deleteWarning(warning._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getWarnings();
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
    getWarnings();
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
            title="Manage Warning"
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
                      <TableCell>Warning By</TableCell>
                      <TableCell>Warning To</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Warning Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {warnings &&
                      warnings.slice(0, limit).map((warning) => (
                        <TableRow
                          hover
                          key={warning._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {warning?.by?.personalDetail?.employeeName}
                          </TableCell>
                          <TableCell>
                            {warning?.to?.personalDetail?.employeeName}
                          </TableCell>
                          <TableCell>{warning.subject}</TableCell>
                          <TableCell>{warning.warning_date}</TableCell>
                          <TableCell>{warning.description}</TableCell>
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
                                      onDeleteClickListener(warning)
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
              count={warnings.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateWarningModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        onSubmitClickListener={onSubmitClickListener}
        warningBy={employees}
        warningTo={employees}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
    </React.Fragment>
  );
};

export default Warning;
