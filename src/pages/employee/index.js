import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  IconButton,
  Tooltip,
  Card,
} from "@material-ui/core";
import Header from "src/common/header";
import SearchToolBar from "src/common/search-toolbar";
import { useNavigate } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import EmployeeService from "src/webservices/employeeService";

const payslips = [
  {
    id: 1,
    emp_id: "#00001",
    name: "John Ibrahim",
    email: "ibrahim@hrms.com",
    branch: "Technology",
    department: "PHP",
    designation: "Developer",
    dateOfJoining: "Mar 4, 2020",
  },
];

const Employee = (props) => {
  const navigate = useNavigate();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [employees, setEmployees] = React.useState(null);

  const onClickListener = () => {
    navigate("/dashboard/employee/create");
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      setEmployees(response);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Helmet>Employee</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Employee"
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
                      <TableCell>Employee ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Branch</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell>Date of Joining</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees &&
                      employees.slice(0, limit).map((employee) => (
                        <TableRow hover key={employee._id}>
                          <TableCell>{`#EMP00${employee.employeeId}`}</TableCell>
                          <TableCell>
                            {employee.personalDetail.employeeName}
                          </TableCell>
                          <TableCell>{employee.personalDetail.email}</TableCell>
                          <TableCell>
                            {employee.companyDetail.branch.branchName}
                          </TableCell>
                          <TableCell>
                            {employee.companyDetail.department.name}
                          </TableCell>
                          <TableCell>
                            {employee.companyDetail.designation.name}
                          </TableCell>
                          <TableCell>
                            {employee.companyDetail.dateOfJoining}
                          </TableCell>
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
              count={employees?.length}
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

export default Employee;
