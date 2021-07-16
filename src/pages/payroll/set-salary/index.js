import React,{useEffect} from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Card,
  IconButton,
  Tooltip
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Header from "src/common/header";
import employeeSalries from "src/__mocks__/employee-salary";
import SearchToolBar from "src/common/search-toolbar";
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import { useNavigate } from 'react-router-dom';
import {fetchEmployee} from "./store/actions"
import {useDispatch, useSelector} from "react-redux"
import {get, has} from "lodash";

const SetSalary = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const {data,loading,firstTime,error,message, firstLoading}  = useSelector((state)=>state.Employee)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    !firstLoading && dispatch(fetchEmployee());

  },[])

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
 
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onClickListener = () => {
    setShowModal(!showModal);
  };

  const onClickViewSalaryListener = salary => {
    navigate(`/payroll/set-salary/${salary._id}`);
  }

  if(error){
      return null
  }



  return (
    <React.Fragment>
      <Helmet>Set Salary</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Employee Salary"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton={false}
          />
          <SearchToolBar />
          <Box sx={{ pt: 3 }}>
            <Card>
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
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.slice(0, limit).map((employeeSalary) => (
                        <TableRow
                          hover
                          key={employeeSalary.id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>{get(employeeSalary,'employeeId')}</TableCell>
                          <TableCell>{get(employeeSalary,'personalDetail.employeeName')}</TableCell>
                          <TableCell>{get(employeeSalary,'salary.payslipType')}</TableCell>
                          <TableCell>{get(employeeSalary,'salary.salary')}</TableCell>
                          <TableCell>{get(employeeSalary,'salary.salary')}</TableCell>
                          {/* employeeSalary.netSalary */}
                          <TableCell>
                          <Tooltip title="View" placement="top" arrow>
                              <IconButton onClick={()=> onClickViewSalaryListener(employeeSalary)}>
                                  <VisibilityRoundedIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={data.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default SetSalary;
