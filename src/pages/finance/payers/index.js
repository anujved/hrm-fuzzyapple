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
import CreatePayerModal from "./CreatePayerModal";
import FinanceService from "src/webservices/financeService";
import ConfirmDialog from "src/common/confirm-dialog";
import SimpleBackdrop from "src/common/backdrop";

const payslips = [
  {
    id: 1,
    employeeId: "#EMP0886787",
    name: "Karie Smith",
    leaveType: "Medical Leave",
    appliedOn: "MAR 4, 2020",
    startDate: "MAR 2, 2020",
    endDate: "MAR 5, 2020",
    totalDays: "3",
    leaveReason: "Lorem Ipsum",
    status: "Approal",
  },
  {
    id: 2,
    employeeId: "#EMP0886787",
    name: "Karie Smith",
    leaveType: "Medical Leave",
    appliedOn: "MAR 4, 2020",
    startDate: "MAR 2, 2020",
    endDate: "MAR 5, 2020",
    totalDays: "3",
    leaveReason: "Lorem Ipsum",
    status: "Pending",
  },
];

const Payers = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [payers, setPayers] = React.useState([]);
  const [payer, setPayer] = React.useState(null);
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

  const getPayers = async () => {
    try {
      const response = await FinanceService.fetchAllPayers();
      setPayers(response);
    } catch (e) {}
  };

  const onSubmitClickListener = async (data) => {
    setOpenDialog(false);
    try {
      const response = await FinanceService.createPayer(data);
      //TODO: send email to respetive employee, branch and department here
      getPayers();
    } catch (error) {}
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (data) => {
    setPayer(data);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await FinanceService.deletePayer(payer._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getPayers();
    } catch (error) {
      console.log("--Delete-Error--", error);
      setOpenBackdrop(false);
    }
  };

  const onCancelClickListener = () => {
    setOpenConfirmDialog(false);
  };

  React.useEffect(() => {
    getPayers();
  }, []);

  return (
    <React.Fragment>
      <Helmet>Finance Payers</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Payers"
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
                      <TableCell>Payer Name</TableCell>
                      <TableCell>Contact Number</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payers &&
                      payers.slice(0, limit).map((payer) => (
                        <TableRow hover>
                          <TableCell>{payer.payer_name}</TableCell>
                          <TableCell>{payer.contact_number}</TableCell>
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
                                    onClick={() => onDeleteClickListener(payer)}
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
              count={payers.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreatePayerModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        onSubmitClickListener={onSubmitClickListener}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onConfirmClickListener={onConfirmClickListener}
        onCancelClickListener={onCancelClickListener}
      />
      <SimpleBackdrop open={openBackdrop} />
    </React.Fragment>
  );
};

export default Payers;
