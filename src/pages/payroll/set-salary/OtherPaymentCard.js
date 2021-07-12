import React, { useContext } from "react";
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
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import CommisionForm from "./components/CommissionForm"
import { SetSallaryContext } from "./components/setSalarayContext"

const OtherPaymentCard = ({ id, name, title, amount }) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const {OpenDialogWithForm,OtherPaymentsHanlder } = useContext(SetSallaryContext);

  return (
    <Card>
      <CardHeader
        title="Other Payment"
        buttonLabel="create"
        onClickListener={OpenDialogWithForm.bind(this,[<CommisionForm onsubmit={OtherPaymentsHanlder}  /> ,'Add other Payments'])}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={id}>
              <TableCell>{name}</TableCell>
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

export default OtherPaymentCard;
