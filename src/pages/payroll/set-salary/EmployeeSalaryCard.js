import React, { useContext } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import {SetSallaryContext} from "./components/setSalarayContext"
import EmployeeSalaryForm from "./components/EmployeeSalaryForm" 

const EmployeeSalaryCard = ({ payrollType, salary, id }) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const {OpenDialogWithForm, EmployeeSetSalaryHanlder} = useContext(SetSallaryContext);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <CardHeader
        title="Employee Salary"
        buttonLabel="create"
        onClickListener={OpenDialogWithForm.bind(this,[<EmployeeSalaryForm onSubmit={EmployeeSetSalaryHanlder}  /> ,'Add Employee set Salary'])}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payslip Type</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={id}>
              <TableCell>{payrollType}</TableCell>
              <TableCell>{salary}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </Card>
  );
};

export default EmployeeSalaryCard;
