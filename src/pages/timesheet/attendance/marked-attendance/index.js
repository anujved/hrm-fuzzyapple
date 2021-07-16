import React, { useState } from "react";
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
import PlayCircleFilledOutlinedIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import MarkedAttendanceFilterView from './MarkedAttendanceFilterView';
import CommonDialog from "src/common/modal/CommonDialog";
import { useFormik } from "formik";
import { KeyboardDatePicker } from "@material-ui/pickers";
import {
  TextField,
  MenuItem,
} from "@material-ui/core";
const ManageMarkedAttendance = (props) => {
  const navigate = useNavigate();
  const [payslips,setPayslips]=useState([
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
  ])
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [isOpen, setIsopen] = useState(false);
  const CloseDialogWithForm = () => {
    setIsopen(false);
    formik.setValues({...formik.values,edit:false})
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const onClickListener = () => {
    navigate("/dashboard/employee/create");
  };


  let option = [
    {
      id: 1,
      value: "taxables",
      name: "Taxables",
    },
    {
      id: 2,
      value: "taxabless",
      name: "Tax not ables",
    },
    
  ];

  let initialValues = {
    id: '',
    employeeId: '',
    name: "",
    leaveType: "",
    appliedOn: "",
    startDate: "",
    endDate: "",
    totalDays: "",
    leaveReason: "",
    status: "",
    edit:false
    
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => { },
    onSubmit: (values) => {
      let reqIndex = payslips.findIndex((data) => data.id == values.id)
      let updateData = payslips;
      updateData[reqIndex] = values
      setPayslips(updateData);
      formik.setValues(formik.initialValues)
      setIsopen(false)
  
      }
      
    
  })
  
  const editHandler = (id) => {
   
    let reqIndex = payslips.findIndex((data) => data.id == id)
    let reqData = payslips[reqIndex];

    formik.setValues({
      ...reqData,
      id:id
     
    })

    setIsopen(true)
  }

  const deleteHandler = (id) => {
    let filteredArray = payslips.filter(data => data.id != id)
    setPayslips(filteredArray)
  }

  return (
    <>
              <CommonDialog
          open={isOpen}
          onCloseClickListener={CloseDialogWithForm}
          title='Add allowance to employee'
        >
         <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Name"
                variant="outlined"
                value={formik.values.name}
            fullWidth
            onChange={formik.handleChange}
            name="name"
          />
            </Grid>
            

        <Grid item xs={12}>
          <TextField
            label="leave Type"
            variant="outlined"
                fullWidth
                value={formik.values.allowanceOption}
            select
            onChange={formik.handleChange}
            name="leaveType"
          >
            {option &&
              option.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
            </Grid>
            
            <Grid item xs={12}>
                        <KeyboardDatePicker
                                disableToolbar
                                    autoOk
                                name ='appliedOn'
                                variant="inline"
                                format="DD/MM/YYYY"
                                label="Applied on"
                                fullWidth
                                value={formik.values.appliedOn}
                                onChange={(data) => formik.setValues({...formik.values,startDate:data.format("DD/MM/YYYY")})}
                            />
                    </Grid>
            <Grid item xs={12}>
                        <KeyboardDatePicker
                                disableToolbar
                                    autoOk
                                name ='startDate'
                                variant="inline"
                                format="DD/MM/YYYY"
                                label="Start Date"
                                fullWidth
                                value={formik.values.startDate}
                                onChange={(data) => formik.setValues({...formik.values,startDate:data.format("DD/MM/YYYY")})}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <KeyboardDatePicker
                                disableToolbar
                                autoOk
                                name ='endDate'
                                variant="inline"
                                format="DD/MM/YYYY"
                                label="End Date"
                                fullWidth
                                value={formik.values.endDate}
                                onChange={(data) => formik.setValues({...formik.values,endDate:data.format("DD/MM/YYYY")})}
                            />
                    </Grid>
            
        <Grid item xs={12}>
          <TextField
            label="Total Days"
                variant="outlined"
                value={formik.values.totalDays}
            fullWidth
            onChange={formik.handleChange}
            name="totalDays"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="leave Reason"
                variant="outlined"
                value={formik.values.leaveReason}
            fullWidth
            onChange={formik.handleChange}
            name="leaveReason"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="status"
                variant="outlined"
                value={formik.values.status}
            fullWidth
            onChange={formik.handleChange}
            name="status"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit"
            variant="contained"
            disabled={
              !(formik.values.appliedOn != '' &&
                formik.values.edit != '' &&
                formik.values.employeeId != '' &&
                formik.values.endDate != '')
            
            }
          >
        Submit
      </Button>
        </Grid>
              
      </Grid>

   
    </form>
        </CommonDialog>
    
    <React.Fragment>
      <Helmet>Manage Attendance List</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Attendance List"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton={false}
          />
          <SearchToolBar placeholderText="Search Employee" />
          <Card sx={{ mt: 3 }}>
            <MarkedAttendanceFilterView />
            <PerfectScrollbar>
              <Box sx={{ pt: 3, minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell>Leave Type</TableCell>
                      <TableCell>Applied On</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Total Days</TableCell>
                      <TableCell>Leave Reason</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payslips.slice(0, limit).map((payslip) => (
                      <TableRow
                        hover
                        key={payslip.id}
                        //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                      >
                        <TableCell>{payslip.name}</TableCell>
                        <TableCell>{payslip.leaveType}</TableCell>
                        <TableCell>{payslip.appliedOn}</TableCell>
                        <TableCell>{payslip.startDate}</TableCell>
                        <TableCell>{payslip.endDate}</TableCell>
                        <TableCell>{payslip.totalDays}</TableCell>
                        <TableCell>{payslip.leaveReason}</TableCell>
                        <TableCell>{payslip.status}</TableCell>
                        <TableCell>
                          <Grid container>
                            <Grid>
                              <Tooltip
                                title="Leave Action"
                                placement="top"
                                arrow
                              >
                                <IconButton
                                  style={{ float: "right", color: "green" }}
                                  onClick={() => {}}
                                  color="primary"
                                >
                                  <PlayCircleFilledOutlinedIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid>
                              <Tooltip title="Edit" placement="top" arrow>
                                <IconButton
                                  style={{ float: "right" }}
                                  onClick={() => {editHandler(payslip.id)}}
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
                                  onClick={() => {deleteHandler(payslip.id)}}
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
      </React.Fragment>
      </>
  );
};

export default ManageMarkedAttendance;
