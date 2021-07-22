import React from "react";
import { Helmet } from "react-helmet";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Card,
  IconButton,
  Tooltip,
  Box,
  Divider,
  Typography,
  Button
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import PayslipHeader from "./PayslipHeader";
import './styles.css';
import PayRoleService from "../../../webservices/payRoleService"

// const payslips = [
//   {
//     id: 1,
//     employeeId: '#EMP0886787',
//     name: 'Karie Smith',
//     payrollType: 'Monthly Slip',
//     salary: '$300000',
//     netSalary: '$310000',
//     status: 'unpaid',
//   },
//   {
//     id: 1,
//     employeeId: '#EMP08834387',
//     name: 'Will Clare',
//     payrollType: 'Hourly Slip',
//     salary: '$300000',
//     netSalary: '$310000',
//     status: 'paid',
//   }
// ]

// const actions = [
//     'View', 'Payslip', 'Click To Paid', 'Edit', 'Delete'];
// const actions = [
//   {
//     action: 'View',
//     color: '#a3afbb',
//   },
//   {
//     action: 'Payslip',
//     color: '#feb701',
//   },
//   {
//     action: 'Click To Paid',
//     color: '#02bb8a',
//   },
//   {
//     action: 'Edit',
//     color: '#0f5ef7',
//   },
//   {
//     action: 'Delete',
//     color: '#ed3a3a',
//   }
// ]
const Payslip = (props) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [paySlips, setPaySlips] = React.useState(null)

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const getPaySlips = async () => {
    try {
      const response = await PayRoleService.FetchPaySlip();
      setPaySlips(response);
      console.log(response);
    } catch (error) { }
  };
  const clickToPaidHandler = async () => {
    // UpdatePaySlip
    try {
      const data = {
        "status": "paid"
      }
      const response = await PayRoleService.UpdatePaySlip(data);
      // setPaySlips(response);
      console.log(response);
    } catch (error) { }
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  React.useEffect(() => {
    getPaySlips()
  }, [])
  console.log(paySlips)

  return (
    <React.Fragment>
      <Helmet>Payslip</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Card>
            <PayslipHeader />
            <Divider />
            <PerfectScrollbar>
              <Box sx={{ minWidth: 1050 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Payroll Type</TableCell>
                      <TableCell>Salary</TableCell>
                      <TableCell>Net Salary</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paySlips && paySlips.slice(0, limit).map((payslip) => (
                      <TableRow
                        hover
                        key={payslip.id}
                      //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                      >
                        <TableCell>{payslip.employee.employeeId}</TableCell>
                        <TableCell>{payslip.employee.personalDetail.employeeName}</TableCell>
                        <TableCell>{payslip.employee.salary.payslipType}</TableCell>
                        <TableCell>{payslip.employee.salary.salary}</TableCell>
                        <TableCell>{payslip.netsalary}</TableCell>
                        <TableCell>{payslip.status}</TableCell>
                        <TableCell>
                          <Grid container spacing={1}>
                            {/* {actions.map(action => {
                              return ( */}
                            <Grid item>
                              <Button variant="contained" style={{ backgroundColor: '#a3afbb' }}>
                                <Typography>View</Typography>
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button variant="contained" style={{ backgroundColor: '#feb701' }} onClick={clickToPaidHandler}>
                                <Typography>Payslip</Typography>
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button variant="contained" style={{ backgroundColor: '#02bb8a' }}>
                                <Typography>Click To Paid</Typography>
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button variant="contained" style={{ backgroundColor: '#0f5ef7' }}>
                                <Typography>Edit</Typography>
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button variant="contained" style={{ backgroundColor: '#ed3a3a' }}>
                                <Typography>Delete</Typography>
                              </Button>
                            </Grid>
                            {/* );
                            })} */}
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
              count={paySlips?.length}
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
  );
};

export default Payslip;
