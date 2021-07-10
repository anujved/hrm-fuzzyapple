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
import CreateIndicatorModal from './CreateIndicatorModal';
import ConstantService from "src/webservices/constantsService";
import PerformanceService from "src/webservices/performanceService";
import ConfirmDialog from "src/common/confirm-dialog";


const Indicator = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [designations, setDesignations] = React.useState([]);
  const [indicators, setIndicators] = React.useState([]);
  const [indicator, setIndicator] = React.useState([]);
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
      const response = await PerformanceService.createIndicator(data);
      setOpenDialog(false);
      getIndicators();
    } catch (error) {
      console.log(error);
    }
  };

  const getIndicators  = async() => {
    try{
      const response = await PerformanceService.getIndicator();
      setIndicators(response);
    } catch(error){}
  }

  const getBranches = async () => {
    try{
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    }catch(error){}
  }

  const getDepartments = async() => {
    try{
      const response = await ConstantService.fetchAllDepartment();
      setDepartments(response);
    } catch(error){}
  }

  const getDesignations = async() => {
    try{
      const response = await ConstantService.fetchAllDesignation();
      setDesignations(response);
    } catch(error){}
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };


    /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
     const onDeleteClickListener = (indicator) => {
      console.log("delete listener");
      setIndicator(indicator);
      setOpenConfirmDialog(true);
    };
  
    const onConfirmClickListener = async () => {
      console.log("confirm listener");
      setOpenConfirmDialog(false);
      setOpenBackdrop(true);
      try {
        const result = await PerformanceService.deleteIndicator(indicator._id);
        console.log("--Delete-Result--", result);
        setOpenBackdrop(false);
        getIndicators();
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
    getDepartments();
    getDesignations();
    getIndicators();
  },[]);

  return (
    <React.Fragment>
      <Helmet>Performance Indicator</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Indicator"
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
                      <TableCell>department</TableCell>
                      <TableCell>designation</TableCell>
                      {/* <TableCell></TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Total Days</TableCell>
                      <TableCell>Leave Reason</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { indicators && indicators.slice(0, limit).map((indicator) => (
                      <TableRow
                        key={indicator.id}
                      >
                        <TableCell>{indicator.branch.branchName}</TableCell>
                        <TableCell>{indicator.department.name}</TableCell>
                        <TableCell>{indicator.designation.name}</TableCell>
                        {/* <TableCell>{indicator.startDate}</TableCell>
                        <TableCell>{indicator.endDate}</TableCell>
                        <TableCell>{indicator.totalDays}</TableCell>
                        <TableCell>{indicator.leaveReason}</TableCell>
                        <TableCell>{indicator.status}</TableCell> */}
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
                                  onClick={() => {onDeleteClickListener(indicator)}}
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
              count={indicators.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateIndicatorModal 
        open={openDialog} 
        onCloseClickListener={onDialogCloseClickListener} 
        onSubmitClickListener={onSubmitClickListener}
        branches={branches}
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

export default Indicator;
