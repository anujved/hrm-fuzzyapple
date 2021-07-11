import React from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  IconButton
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const allwances = [
  {
    id: 1,
    employeeName: 'Karie Nicole',
    allowanceOption: "Taxables",
    title: 'test',
    amount: 1000000,
  },
];

const AllowanceCard = (props) => {
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
        title="Allowance"
        buttonLabel="create"
        onClickListener={() => {console.log("working")}}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Allowance Option</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allwances.slice(0, limit).map((allowance) => (
              <TableRow
                hover
                key={allowance.id}
                //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
              >
                <TableCell>{allowance.employeeName}</TableCell>
                <TableCell>{allowance.allowanceOption}</TableCell>
                <TableCell>{allowance.title}</TableCell>
                <TableCell>{allowance.amount}</TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item>
                      <IconButton>
                        <EditRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <DeleteForeverRoundedIcon style={{color: 'red'}} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </Card>
  );
};

export default AllowanceCard;
