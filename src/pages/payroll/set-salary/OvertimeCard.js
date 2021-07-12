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
  Tooltip,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { SetSallaryContext } from "./components/setSalarayContext"
import OvertimeForm from "./components/OvertimeForm";

const OvertimeCard = ({
  id,
  name,
  overtimeTitle,
  numberOfDays,
  hours,
  rate,
}) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const {OpenDialogWithForm, OvertimeHandler} = useContext(SetSallaryContext);

  
  return (
    <Card>
      <CardHeader
        title="Overtime"
        buttonLabel="create"
        onClickListener={OpenDialogWithForm.bind(this,[<OvertimeForm onsubmit={OvertimeHandler}  /> ,'Add overtime Employee'])}
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
            <TableRow hover key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{overtimeTitle}</TableCell>
              <TableCell>{numberOfDays}</TableCell>
              <TableCell>{hours}</TableCell>
              <TableCell>{rate}</TableCell>
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

export default OvertimeCard;
