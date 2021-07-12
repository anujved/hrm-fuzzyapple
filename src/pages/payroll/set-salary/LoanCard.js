import React, { useContext } from "react";
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
import { SetSallaryContext } from "./components/setSalarayContext"
import LoanForm from "./components/LoanForm";





const LoanCard = ({id,name, loanOptions, title, laonAmount, startDate, endDate}) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const {OpenDialogWithForm, LoanSubmitHandler} = useContext(SetSallaryContext);


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
        onClickListener={OpenDialogWithForm.bind(this,[<LoanForm onSubmit={LoanSubmitHandler}  /> ,'Add Loan'])}
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

              <TableRow
                hover
                key={id}
                //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
              >
                <TableCell>{name}</TableCell>
                <TableCell>{loanOptions}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{laonAmount}</TableCell>
                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </Card>
  );
};

export default LoanCard;
