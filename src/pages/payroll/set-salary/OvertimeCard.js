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
  IconButton,
  Tooltip
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const overtimes = [
  {
    id: 1,
    employeeName: 'Karie Nicole',
    overtimeTitle: 'test',
    numberOfDays: 10,
    hours: 10,
    rate: '$100',
  },
];

const OvertimeCard = (props) => {
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
        title="Overtime"
        buttonLabel="create"
        onClickListener={() => {}}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Overtime Title</TableCell>
              <TableCell>Number of days</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overtimes.slice(0, limit).map((ot) => (
              <TableRow
                hover
                key={ot.id}
                //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
              >
                <TableCell>{ot.employeeName}</TableCell>
                <TableCell>{ot.overtimeTitle}</TableCell>
                <TableCell>{ot.numberOfDays}</TableCell>
                <TableCell>{ot.hours}</TableCell>
                <TableCell>{ot.rate}</TableCell>
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

export default OvertimeCard;