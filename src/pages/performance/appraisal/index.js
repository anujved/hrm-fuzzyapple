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
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import CreateAppraisalModal from './CreateAppraisalModal';
import ConstantService from "src/webservices/constantsService";
import PerformanceService from "src/webservices/performanceService";
import EmployeeService from "src/webservices/employeeService";
import ConfirmDialog from "src/common/confirm-dialog";


const Appraisal = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [designations, setDesignations] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [appraisals, setAppraisals] = React.useState([]);
  const [appraisal, setAppraisal] = React.useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setOpenDialog(false);
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onSubmitClickListener = async (data) => {
    try {
      const response = await PerformanceService.createAppraisal(data);
      setOpenDialog(false);
      getAppraisals();
    } catch (error) {
      console.log(error);
    }
  };

  const getAppraisals  = async() => {
    try{
      const response = await PerformanceService.getAppraisal();
      setAppraisals(response);
    } catch(error){}
  }

  const getBranches = async () => {
    try{
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    }catch(error){}
  }

  const getEmployees = async () => {
    try{
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch(error){}
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };


  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
  */
     const onDeleteClickListener = (appraisal) => {
      console.log("delete listener");
      setAppraisal(appraisal);
      setOpenConfirmDialog(true);
    };
  
    const onConfirmClickListener = async () => {
      console.log("confirm listener");
      setOpenConfirmDialog(false);
      setOpenBackdrop(true);
      try {
        const result = await PerformanceService.deleteAppraisal(appraisal._id);
        console.log("--Delete-Result--", result);
        setOpenBackdrop(false);
        getAppraisals();
      } catch (error) {
        console.log("--Delete-Error--", error);
        setOpenBackdrop(false);
      }
    };
  
    const onCancelClickListener = () => {
      console.log("cancel listener");
      setOpenConfirmDialog(false);
    };

  React.useEffect(()=> {
    getBranches();
    getAppraisals();
    getEmployees();
  },[]);

  return (
    <React.Fragment>
      <Helmet>Performance Appraisal</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Appraisal"
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
                      <TableCell>branch</TableCell>
                      <TableCell>employee</TableCell>
                      <TableCell>select month</TableCell>
                      {/* <TableCell></TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Total Days</TableCell>
                      <TableCell>Leave Reason</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { appraisals && appraisals.slice(0, limit).map((appraisal) => (
                      <TableRow
                        key={appraisal.id}
                      >
                        <TableCell>{appraisal.branch.branchName}</TableCell>
                        <TableCell>{appraisal.employee.personalDetail.employeeName}</TableCell>
                        <TableCell>{appraisal.select_month}</TableCell>
                        {/* <TableCell>{appraisal.startDate}</TableCell>
                        <TableCell>{appraisal.endDate}</TableCell>
                        <TableCell>{appraisal.totalDays}</TableCell>
                        <TableCell>{appraisal.leaveReason}</TableCell>
                        <TableCell>{appraisal.status}</TableCell> */}
                        <TableCell>
                          <Grid container>
                            <Grid>
                              <Tooltip
                                title="View Detail"
                                placement="top"
                                arrow
                              >
                                <IconButton
                                  style={{ float: "right", color: "green" }}
                                  onClick={() => {}}
                                  color="primary"
                                >
                                  <VisibilityRoundedIcon />
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
                                  onClick={() => {onDeleteClickListener(appraisal)}}
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
              count={appraisals.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateAppraisalModal 
        open={openDialog} 
        onCloseClickListener={onDialogCloseClickListener} 
        onSubmitClickListener={onSubmitClickListener}
        branches={branches}
        employees={employees}
        designations={designations}
        departments={departments}
        />
        <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
    </React.Fragment>
  );
};

export default Appraisal;
