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
import SearchToolBar from "src/common/search-toolbar";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ConfirmDialog from "../../../common/confirm-dialog";
import CreateAwardModal from "./CreateAwardModal";
import HrServices from "src/webservices/hrServices";
import EmployeeService from "src/webservices/employeeService";

const payslips = [
  {
    id: 1,
    employee: "Ida F. Mullen",
    awardType: "Trophy",
    date: "MAR 4, 2020",
    gift: "certificate",
    description: "Loreum Ipsum",
  },
  {
    id: 2,
    employee: "Protiong",
    awardType: "Trophy",
    date: "MAR 4, 2020",
    gift: "certificate",
    description: "Loreum Ipsum",
  },
];

const Award = (props) => {
  const navigate = useNavigate();

  const [counter, setCounter] = React.useState([]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [awards, setAwards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [award, setAward] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const onClickListener = () => {
    setOpenDialog(true);
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

  const getAwards = async () => {
    try {
      const response = await HrServices.fetchAwards();
      setAwards(response);
      console.log(awards);
    } catch (error) {}
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
    try {
      const response = await HrServices.createAward(data);
      setCounter((pre) => pre + 1);
      getAwards();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (award) => {
    console.log("delete listener");
    setAward(award);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    console.log("confirm listener");
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      console.log(award);
      const result = await HrServices.deleteAward(award._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getAwards();
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
    fetchEmployees();
    getAwards();
  }, []);

  // React.useEffect(() => {
  //   fetchData();
  // }, [counter]);

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
            title="Manage Award"
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
                      <TableCell>Award Type</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Gift</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {awards &&
                      awards.map((award) => (
                        <TableRow
                          hover
                          key={award._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>
                            {award.employee.personalDetail.employeeName}
                          </TableCell>
                          <TableCell>{award.award_type}</TableCell>
                          <TableCell>{award.date}</TableCell>
                          <TableCell>{award.gift}</TableCell>
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
                                    onClick={() => onDeleteClickListener(award)}
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
              count={awards.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>

      <CreateAwardModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        onSubmitClickListener={onSubmitClickListener}
        employees={employees}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
    </React.Fragment>
  );
};

export default Award;
