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
  IconButton
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import AllowanceForm from "./components/AllowanceForm"
import {SetSallaryContext} from "./components/setSalarayContext"



const AllowanceCard = ({name,allowanceOption,title, amount,id}) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
    const {OpenDialogWithForm, AllowanceSubmitHandler} = useContext(SetSallaryContext);

  
  return (
    <Card>
      <CardHeader
        title="Allowance"
        buttonLabel="create"
        onClickListener={OpenDialogWithForm.bind(this,[<AllowanceForm onSubmit={AllowanceSubmitHandler}  /> ,'Add Allowance'])}
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
           
              <TableRow
                hover
                key={id}
              >
                <TableCell>{name}</TableCell>
                <TableCell>{allowanceOption}</TableCell>
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
                        <DeleteForeverRoundedIcon style={{color: 'red'}} />
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

export default AllowanceCard;
