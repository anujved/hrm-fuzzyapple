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
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

const SaturationDeductionCard = ({
  id,
  name,
  deductionOption,
  title,
  amount,
}) => {
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
        title="Saturation Deduction"
        buttonLabel="create"
        onClickListener={() => {}}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Deduction Option</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{deductionOption}</TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{amount}</TableCell>
              <TableCell>
                <Grid container>
                  <Grid item>
                    <IconButton>
                      <EditRoundedIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <DeleteForeverRoundedIcon style={{ color: "red" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PerfectScrollbar>
    </Card>
  );
};

export default SaturationDeductionCard;
