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

const payslips = [
  {
    id: 1,
    employee: "Ida F. Mullen",
    designation: "Designer",
    promotionTitle: "Senior Tester",
    promotionDate: "MAR 4, 2020",
    description: "Loreum Ipsum",
  },
  {
    id: 2,
    employee: "Ida F. Mullen",
    designation: "Designer",
    promotionTitle: "Senior Tester",
    promotionDate: "MAR 4, 2020",
    description: "Loreum Ipsum",
  },
];

const Promotion = (props) => {
  const navigate = useNavigate();

  const [values, setValues] = React.useState([]);
  const [counter, setCounter] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

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

  const fetchEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setLoading(false);
      setEmployees(response);
    } catch (error) {
      setLoading(false);
    }
  };

  const onSubmitClickListener = async (data) => {
    try {
      const response = await HrServices.createPromotion(data);
      setCounter((pre) => pre + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await HrServices.deletePromotion(id);
      console.log("this is delete res : ", response);
      if (response.ok) {
        setValues((pre) => {
          return pre.filter((obj) => obj._id !== id);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await HrServices.fetchPromotions();
      setValues(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [counter]);

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
                    {Array.isArray(values) &&
                      values.slice(0, limit).map((payslip) => (
                        <TableRow
                          hover
                          key={payslip._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>{payslip.employee}</TableCell>
                          <TableCell>{payslip.designation}</TableCell>
                          <TableCell>{payslip.promotion_title}</TableCell>
                          <TableCell>{payslip.promotion_date}</TableCell>
                          <TableCell>{payslip.description}</TableCell>
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
                                    onClick={handleDelete.bind(
                                      this,
                                      payslip._id
                                    )}
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
              count={payslips.length}
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
      />
    </React.Fragment>
  );
};

export default Promotion;
