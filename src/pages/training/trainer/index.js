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
import TrainerService from "src/webservices/trainerService";
import CreateTrainerModal from "./CreateTrainerModal";
import ConstantService from "src/webservices/constantsService";
import ConfirmDialog from "src/common/confirm-dialog";


const Trainer = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [trainers, setTrainers] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [trainer, setTrainer] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setOpenDialog(false);
  }

  const getBranches = async() => {
    try{
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    }catch(error){}
  }

  const onSubmitClickListener = async (data) => {
    try {
      const response = await TrainerService.createTrainer(data);
      onDialogCloseClickListener();
      getTrainers();
    } catch (error) {
      console.log(error);
    }
  };

  const getTrainers = async () => {
    try {
      const response = await TrainerService.getTrainer();
      setTrainers(response);
    } catch (error) {
    }
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
   const onDeleteClickListener = (trainer) => {
    console.log("delete listener");
    setTrainer(trainer);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      console.log(trainer._id);
      const result = await TrainerService.deleteTrainer(trainer._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getTrainers();
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
    getTrainers();
  },[])

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
            title="Manage Trainer"
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
                      <TableCell>Fullname</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainers && trainers.slice(0, limit).map((trainer) => (
                      <TableRow
                        hover
                        key={trainer.id}
                        //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                      >
                        <TableCell>{trainer?.branch.branchName}</TableCell>
                        <TableCell>{trainer.first_name} {trainer.last_name}</TableCell>
                        <TableCell>{trainer.contact}</TableCell>
                        <TableCell>{trainer.email}</TableCell>
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
                                  onClick={() => {onDeleteClickListener(trainer)}}
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
              count={trainers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateTrainerModal 
          open={openDialog} 
          onCloseClickListener={onDialogCloseClickListener} 
          onSubmitClickListener={onSubmitClickListener}
          branches={branches} />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
    </React.Fragment>
  );
};

export default Trainer;
