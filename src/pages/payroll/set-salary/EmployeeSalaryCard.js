import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";

const employeeSalaries = [
  {
    id: 1,
    payslipType: "Payslip Type",
    salary: 10000,
  },
];

const EmployeeSalaryCard = (props) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

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
        onClickListener={() => {}}
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
            {employeeSalaries.slice(0, limit).map((employeeSalary) => (
              <TableRow
                hover
                key={employeeSalary.id}
                //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
              >
                <TableCell>{employeeSalary.payslipType}</TableCell>
                <TableCell>{employeeSalary.salary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </Card>
  );
};

export default EmployeeSalaryCard;
