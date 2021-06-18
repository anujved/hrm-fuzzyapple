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
import CreateTicketModal from "./CreateTicketModal";
import ReplyIcon from "@material-ui/icons/Reply";
import EmployeeService from "src/webservices/employeeService";
import Progress from "src/common/loader";
import TicketService from "src/webservices/ticketService";
import moment from 'moment';

const Ticket = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [tickets, setTickets] = React.useState([]);

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

  const getTickets = async () => {
    try {
      const response = await TicketService.fetchAllTicket();
      console.log("-Create-Success-", response);
      setTickets(response);
    } catch (error) {
      console.log("-Create-Error-", error);
    }
  };

  const onSubmitClickListener = async (values) => {
    setOpenDialog(false);
    try {
      const response = await TicketService.createTicket(values);
      console.log("-Create-Success-", response);
      getTickets();
    } catch (error) {
      console.log("-Create-Error-", error);
    }
  };

  React.useEffect(() => {
    fetchEmployees();
    getTickets();
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
        <Progress loading={loading} />
        {!loading && (
          <Container maxWidth={false}>
            <Header
              title="Manage Ticket"
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
                        <TableCell>New</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Ticket Code</TableCell>
                        <TableCell>Employee</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Desciption</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tickets?.slice(0, limit).map((ticket, index) => (
                        <TableRow hover key={index}>
                          <TableCell>{ticket.newTicket ? 'Yes' : 'No'}</TableCell>
                          <TableCell>{ticket.subject}</TableCell>
                          <TableCell>{ticket.ticketCode}</TableCell>
                          <TableCell>{ticket.employee}</TableCell>
                          <TableCell>{ticket.priority}</TableCell>
                          <TableCell>
                          {moment(ticket.endDate).format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell>{ticket.description}</TableCell>
                          <TableCell>
                            <Grid container>
                              <Grid>
                                <Tooltip title="Reply" placement="top" arrow>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={() => {}}
                                    color="primary"
                                  >
                                    <ReplyIcon />
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                              <Grid>
                                <Tooltip title="Delete" placement="top" arrow>
                                  <IconButton
                                    style={{ float: "right" }}
                                    onClick={() => {}}
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
                count={tickets.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Container>
        )}
      </Box>
      <CreateTicketModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        onSubmitClickListener={onSubmitClickListener}
        employees={employees}
      />
    </React.Fragment>
  );
};

export default Ticket;
