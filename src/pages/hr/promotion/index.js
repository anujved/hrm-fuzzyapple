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
import CreatePromotionModal from "./CreatePromotionModal";
import HrServices from "src/webservices/hrServices";
import EmployeeService from "src/webservices/employeeService";
import ConstantService from "src/webservices/constantsService";
import ConfirmDialog from "../../../common/confirm-dialog";

const Promotion = (props) => {
  const navigate = useNavigate();

  const [counter, setCounter] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [limit, setLimit] = React.useState(10);
  const [promotions, setPromotions] = React.useState([]);
  const [promotion, setPromotion] = React.useState(null);
  const [designations, setDesignations] = React.useState(null);
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

  const getDesignations = async () => {
    try {
      const response = await ConstantService.fetchAllDesignation();
      setDesignations(response);
    } catch (error) {}
  };

  const onSubmitClickListener = async (data) => {
    try {
      const response = await HrServices.createPromotion(data);
      getPromotions();
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await HrServices.deletePromotion(id);
  //     console.log("this is delete res : ", response);
  //     if (response.ok) {
  //       setValues((pre) => {
  //         return pre.filter((obj) => obj._id !== id);
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getPromotions = async () => {
    try {
      const response = await HrServices.fetchPromotions();
      setPromotions(response);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (promotion) => {
    console.log("delete listener");
    setPromotion(promotion);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await HrServices.deletePromotion(promotion._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getPromotions();
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
    getPromotions();
    getDesignations();
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
            title="Manage Promotion"
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
                      <TableCell>Designation</TableCell>
                      <TableCell>Promotion Title</TableCell>
                      <TableCell>Promotion Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {promotions &&
                      promotions.slice(0, limit).map((promotion) => (
                        <TableRow
                          hover
                          key={promotion._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {promotion.employee.personalDetail.employeeName}
                          </TableCell>
                          <TableCell>{promotion.designation.name}</TableCell>
                          <TableCell>{promotion.promotion_title}</TableCell>
                          <TableCell>{promotion.promotion_date}</TableCell>
                          <TableCell>{promotion.description}</TableCell>
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
                                      onDeleteClickListener(promotion);
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
              count={promotions.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreatePromotionModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        onSubmitClickListener={onSubmitClickListener}
        employees={employees}
        designations={designations}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
    </React.Fragment>
  );
};

export default Promotion;
