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

const loans = [
  {
    id: 1,
    employeeName: "Karie Smith",
    loanOptions: 'Health Insurance',
    title: 'test',
    laonAmount: '$10,000',
    startDate: 'Mar 1, 2020',
    endDate: 'Mar 9, 2020',
  },
];

const LoanCard = (props) => {
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
        title="Loan"
        buttonLabel="create"
        onClickListener={() => {}}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Loan Options</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.slice(0, limit).map((loan) => (
              <TableRow
                hover
                key={loan.id}
                //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
              >
                <TableCell>{loan.employeeName}</TableCell>
                <TableCell>{loan.loanOptions}</TableCell>
                <TableCell>{loan.title}</TableCell>
                <TableCell>{loan.laonAmount}</TableCell>
                <TableCell>{loan.startDate}</TableCell>
                <TableCell>{loan.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </Card>
  );
};

export default LoanCard;
