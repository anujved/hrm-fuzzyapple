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
import CreateGoalModal from "./CreateGoalModal";
import ConstantService from "src/webservices/constantsService";
import PerformanceService from "src/webservices/performanceService";
import ConfirmDialog from "src/common/confirm-dialog";


const GoalTracking = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [branches, setBranches] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [goalTracks, setGoalTracks] = React.useState([]);
  const [goalTrack, setGoalTrack] = React.useState(null);
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

  const onSubmitClickListener = async(data) => {
    try {
      const response = await PerformanceService.createGoalTracking(data);
      setOpenDialog(false);
      getGoalTracks();
    } catch (error) {
      console.log(error);
    }
  }

  const getGoalTracks = async() => {
    try{
      const response = await PerformanceService.getGoalTracks();
      setGoalTracks(response);
    } catch(error){}
  }
 
  const getBranches = async() => {
    try{
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    }
    catch(error){}
  } 

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
  */
   const onDeleteClickListener = (goalTrack) => {
    console.log("delete listener");
    setGoalTrack(goalTrack);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await PerformanceService.deleteGoalTrack(goalTrack._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getGoalTracks();
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
    getBranches();
    getGoalTracks();
  },[])

  return (
    <React.Fragment>
      <Helmet>Performance Goal Tracking</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Goal Tracking"
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
                      <TableCell>Branch</TableCell>
                      <TableCell>Goal Type</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Target Achievement</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {goalTracks && goalTracks.slice(0, limit).map((goalTrack) => (
                      <TableRow
                        hover
                        key={goalTrack.id}
                        //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                      >
                        <TableCell>{goalTrack.branch.branchName}</TableCell>
                        <TableCell>{goalTrack.goals_type}</TableCell>
                        <TableCell>{goalTrack.start_date}</TableCell>
                        <TableCell>{goalTrack.end_date}</TableCell>
                        <TableCell>{goalTrack.subject}</TableCell>
                        <TableCell>{goalTrack.target_achievement}</TableCell>
                        <TableCell>{goalTrack.description}</TableCell>
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
                                  onClick={() => { onDeleteClickListener(goalTrack) }}
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
              count={goalTracks.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateGoalModal 
        open={openDialog} 
        branches={branches}
        onSubmitClickListener={onSubmitClickListener}
        onCloseClickListener={onDialogCloseClickListener} />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
    </React.Fragment>
  );
};

export default GoalTracking;
