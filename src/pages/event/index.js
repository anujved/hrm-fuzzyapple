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
  Paper,
} from "@material-ui/core";
import Header from "src/common/header";
import axios from "axios";
import SearchToolBar from "src/common/search-toolbar";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CreateEventModal from "./CreateEvent";
import ConstantService from "src/webservices/constantsService";
import EmployeeService from "src/webservices/employeeService";
import EventService from "src/webservices/eventService";
import ConfirmDialog from "../../common/confirm-dialog";
import SimpleBackdrop from "../../common/backdrop";
import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Event = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [event, setEvent] = React.useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const getBranches = async () => {
    try {
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    } catch (error) {}
  };
  const getEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch (error) {}
  };
  const getDepartments = async () => {
    try {
      const response = await ConstantService.fetchAllDepartment();
      setDepartments(response);
    } catch (error) {}
  };

  const getEvents = async () => {
    try {
      const response = await EventService.fetchAllEvents();
      setEvents(response);
    } catch (error) {}
  };

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
      const response = await EventService.createEvent(data);
      //TODO: send email to respetive employee, branch and department here
      getEvents();
    } catch (error) {}
  };

  /**
   * Listener to delete a ticket
   * @param {*} ticket - to delete
   */
  const onDeleteClickListener = (event) => {
    setEvent(event);
    setOpenConfirmDialog(true);
  };

  const onConfirmClickListener = async () => {
    setOpenConfirmDialog(false);
    setOpenBackdrop(true);
    try {
      const result = await EventService.deleteEvent(event._id);
      console.log("--Delete-Result--", result);
      setOpenBackdrop(false);
      getEvents();
    } catch (error) {
      console.log("--Delete-Error--", error);
      setOpenBackdrop(false);
    }
  };

  const onCancelClickListener = () => {
    setOpenConfirmDialog(false);
  };

  React.useEffect(() => {
    getBranches();
    getEmployees();
    getDepartments();
    getEvents();
  }, []);

  const transformEvents = () => {
    return events?.map((e) => {
      const { event_title, start_event_date, event_end_date } = e || {};
      const _event = {
        title: event_title,
        start: start_event_date,
        end: event_end_date,
      };
      return _event;
    });
  };

  return (
    <>
      <Box>
        <Button variant="contained" onClick={onClickListener}>
          New Event
        </Button>
      </Box>
      <Paper style={{ padding: 5, margin: 5 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={transformEvents()}
        />
      </Paper>
      <CreateEventModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        branches={branches}
        employees={employees}
        departments={departments}
        onSubmitClickListener={onSubmitClickListener}
      />
    </>
  );
};
//   return (
//     <React.Fragment>
//       <Helmet>Event List</Helmet>
//       <Box
//         sx={{
//           backgroundColor: "background.default",
//           minHeight: "100%",
//           py: 3,
//         }}
//       >
//         <Container maxWidth={false}>
//           <Header
//             title="Manage Event"
//             buttonText="Create"
//             onClickListener={onClickListener}
//             showActionButton
//           />
//           <SearchToolBar placeholderText="Search" />
//           <Card sx={{ mt: 3 }}>
//             <PerfectScrollbar>
//               <Box sx={{ pt: 3, minWidth: 1050 }}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Event Title</TableCell>
//                       <TableCell>Event Start Date</TableCell>
//                       <TableCell>Event End Date</TableCell>
//                       <TableCell>Action</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {events &&
//                       events.slice(0, limit).map((event) => (
//                         <TableRow
//                           hover
//                           key={event._id}
//                           //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
//                         >
//                           <TableCell>{event.event_title}</TableCell>
//                           <TableCell>
//                             {moment(event.start_event_date).format(
//                               "DD-MM-yyyy"
//                             )}
//                           </TableCell>
//                           <TableCell>
//                             {moment(event.event_end_date).format("DD-MM-yyyy")}
//                           </TableCell>
//                           <TableCell>
//                             <Grid container>
//                               <Grid>
//                                 <Tooltip title="Edit" placement="top" arrow>
//                                   <IconButton
//                                     style={{ float: "right" }}
//                                     onClick={() => {}}
//                                     color="primary"
//                                   >
//                                     <EditRoundedIcon />
//                                   </IconButton>
//                                 </Tooltip>
//                               </Grid>
//                               <Grid>
//                                 <Tooltip title="Delete" placement="top" arrow>
//                                   <IconButton
//                                     style={{ float: "right" }}
//                                     onClick={() => onDeleteClickListener(event)}
//                                     color="secondary"
//                                   >
//                                     <DeleteForeverRoundedIcon />
//                                   </IconButton>
//                                 </Tooltip>
//                               </Grid>
//                             </Grid>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </Box>
//             </PerfectScrollbar>
//             <TablePagination
//               component="div"
//               count={events.length}
//               onPageChange={handlePageChange}
//               onRowsPerPageChange={handleLimitChange}
//               page={page}
//               rowsPerPage={limit}
//               rowsPerPageOptions={[5, 10, 25]}
//             />
//           </Card>
//         </Container>
//       </Box>
//       <CreateEventModal
//         open={openDialog}
//         onCloseClickListener={onDialogCloseClickListener}
//         branches={branches}
//         employees={employees}
//         departments={departments}
//         onSubmitClickListener={onSubmitClickListener}
//       />
//       <ConfirmDialog
//         open={openConfirmDialog}
//         onConfirmClickListener={onConfirmClickListener}
//         onCancelClickListener={onCancelClickListener}
//       />
//       <SimpleBackdrop open={openBackdrop} />
//     </React.Fragment>
//   );
// };

export default Event;
