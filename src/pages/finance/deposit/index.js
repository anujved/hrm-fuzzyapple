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
import CreateDepositModal from "./CreateDepositModal";
import FinanceService from "src/webservices/financeService";
import ConfirmDialog from "src/common/confirm-dialog";
import SimpleBackdrop from "src/common/backdrop";

const Deposit = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [payers, setPayers] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);
  const [deposits, setDeposits] = React.useState([]);
  const [deposit, setDeposit] = React.useState(null);
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

  const getAccounts = async () => {
    try {
      const response = await FinanceService.fetchAllAccountList();
      setAccounts(response);
    } catch (e) {}
  };

  const getPayers = async () => {
    try {
      const response = await FinanceService.fetchAllPayers();
      setPayers(response);
    } catch (e) {}
  };

  const getDeposits = async () => {
    try {
      const response = await FinanceService.fetchAllDeposits();
      setDeposits(response);
    } catch (e) {}
  };

  const onSubmitClickListener = async (data) => {
    setOpenDialog(false);
    try {
      const response = await FinanceService.createDeposit(data);
      //TODO: send email to respetive employee, branch and department here
      getDeposits();
    } catch (error) {}
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (data) => {
    setDeposit(data);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await FinanceService.deleteDeposit(deposit._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getDeposits();
    } catch (error) {
      console.log("--Delete-Error--", error);
      setOpenBackdrop(false);
    }
  };

  const onCancelClickListener = () => {
    setOpenConfirmDialog(false);
  };

  React.useEffect(() => {
    getAccounts();
    getPayers();
    getDeposits();
  }, []);

  return (
    <React.Fragment>
      <Helmet>Finance Account</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Deposit"
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
                      <TableCell>Account</TableCell>
                      <TableCell>Payer</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Ref#</TableCell>
                      <TableCell>Payment</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deposits &&
                      deposits.slice(0, limit).map((deposit) => (
                        <TableRow hover>
                          <TableCell>{deposit.account.account_name}</TableCell>
                          <TableCell>{deposit.Payer}</TableCell>
                          <TableCell>{deposit.amount}</TableCell>
                          <TableCell>{deposit.category}</TableCell>
                          <TableCell>{deposit.ref}</TableCell>
                          <TableCell>{deposit.payment_method}</TableCell>
                          <TableCell>{deposit.date}</TableCell>
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
                                      onDeleteClickListener(deposit)
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
              count={deposits.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Card>
        </Container>
      </Box>
      <CreateDepositModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        payers={payers}
        accounts={accounts}
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

export default Deposit;
