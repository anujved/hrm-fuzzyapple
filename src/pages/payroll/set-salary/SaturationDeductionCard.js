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
import { SetSallaryContext } from "./components/setSalarayContext"
import SaturationDeductionForm from "./components/SaturationDeductionForm";

const saturationDeductions = [
  {
    id: 1,
    employeeName: 'Karie Nicole',
    deductionOption: "Social Security System",
    title: 'test',
    amount: 1000000,
  },
];

const SaturationDeductionCard = (props) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const {OpenDialogWithForm, SaturationHandler} = useContext(SetSallaryContext);

  
  return (
    <Card>
      <CardHeader
        title="Saturation Deduction"
        buttonLabel="create"
        onClickListener={OpenDialogWithForm.bind(this,[<SaturationDeductionForm onsubmit={SaturationHandler}  /> ,'Add Saturation Deductions'])}
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
            {saturationDeductions.slice(0, limit).map((sd) => (
              <TableRow
                hover
                key={sd.id}
                //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
              >
                <TableCell>{sd.employeeName}</TableCell>
                <TableCell>{sd.deductionOption}</TableCell>
                <TableCell>{sd.title}</TableCell>
                <TableCell>{sd.amount}</TableCell>
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

export default SaturationDeductionCard;
