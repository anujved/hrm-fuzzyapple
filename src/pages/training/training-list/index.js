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
import CreateTrainingModal from "./CreateTrainingModal";
import ConstantService from "src/webservices/constantsService";
import EmployeeService from "src/webservices/employeeService";
import TrainerService from "src/webservices/trainerService";
import TrainingListService from "src/webservices/trainingService";
import ConfirmDialog from "src/common/confirm-dialog";

const TrainingList = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [trainingLists, setTrainingLists] = React.useState([]);
  const [trainingList, setTrainingList] = React.useState(null);
  const [employees, setEmployees] = React.useState([]);
  const [branches, setBranches] = React.useState([]);
  const [trainers, setTrainers] = React.useState([]);
  const [trainingType, setTrainingType] = React.useState([]);
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
    setOpenDialog(false);
    try {
      const response = await TrainingListService.createTraining(data);
      getTrainingLists();
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch (error) {}
  };
  
  const getBranches = async () => {
    try {
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    } catch (error) {}
  };

  const getTrainingLists = async () => {
    try {
      const response = await TrainingListService.getTraining();
      setTrainingLists(response);
    } catch (error) {}
  };

  const getTrainers = async () => {
    try{
      const response = await TrainerService.getTrainer();
      setTrainers(response);
    } catch(error){}
  }

  const getTrainingType = async() => {
    try{
      const response = await TrainingListService.getTrainingType();
      setTrainingType(response);
    }catch(error){}
  }

    /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
     const onDeleteClickListener = (trainingList) => {
      console.log("delete listener");
      setTrainingList(trainingList);
      setOpenConfirmDialog(true);
    };
  
    const onConfirmClickListener = async () => {
      console.log("confirm listener");
      setOpenConfirmDialog(false);
      setOpenBackdrop(true);
      try {
        const result = await TrainingListService.deleteTraining(trainingList._id);
        console.log("--Delete-Result--", result);
        setOpenBackdrop(false);
        getTrainingLists();
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
    getTrainingLists();
    getBranches();
    getEmployees();
    getTrainers();
    getTrainingType();
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
            title="Manage Training"
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
                      <TableCell>Branch</TableCell>
                      <TableCell>Training Type</TableCell>
                      <TableCell>Employee</TableCell>
                      <TableCell>Trainer</TableCell>
                      <TableCell>Training Duration</TableCell>
                      <TableCell>Cost</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { trainingLists &&
                      trainingLists?.slice(0, limit).map((trainingList, index) => (
                        <TableRow key={index}>
                          <TableCell>{trainingList.branch.branchName}</TableCell>
                          <TableCell>{trainingList.training_type.name}</TableCell>
                          <TableCell>
                            {trainingList?.employee?.personalDetail?.employeeName}
                          </TableCell>
                          <TableCell>{trainingList.trainer.first_name} {trainingList.trainer.last_name}</TableCell>
                          <TableCell>{trainingList.start_date} to {trainingList.end_date}</TableCell>
                          <TableCell>{trainingList.training_cost}</TableCell>
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
                                    onClick={() => {onDeleteClickListener(trainingList)}}
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
              count={trainingLists.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateTrainingModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        onSubmitClickListener={onSubmitClickListener}
        branches={branches}
        employees={employees}
        trainers={trainers}
        training_type={trainingType}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
    </React.Fragment>
  );
};

export default TrainingList;
