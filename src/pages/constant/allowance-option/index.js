import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { Box, Grid, Button } from "@material-ui/core";
import ConstantDialog from "src/common/constant-dialog";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import ConstantService from "src/webservices/constantsService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    // width: '100%',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 1050,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const AllowanceOption = (props) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editValue, setEditValue] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [payslips, setPayslip] = useState(null);

  React.useEffect(()=>{
    fetchAllowanceOptions();
  },[]);

  const fetchAllowanceOptions = async () => {
    try {
      const response = await ConstantService.fetchAllAllowanceOption();
      setPayslip(response);
    } catch (error) {}
  }

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setOpenDialog(false);
    setIsEdit(false);
    setEditValue(null);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onSubmitClickListener = async values => {
    try {
      const response = await ConstantService.createAllowanceOption(values);
      console.log('CREATE-response-', response);
      setOpenDialog(false);
      fetchAllowanceOptions();
    } catch (error) {}
  }

  return (
    <div className={classes.root}>
      <Box py={3} px={5}>
        <Grid container justifyContent="space-between">
          <Typography variant="h5">Manage Allowance Type</Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: "#01AA55", color: "#FFFFFF" }}
            onClick={() => {
              onClickListener();
            }}
          >
            Create
          </Button>
        </Grid>
      </Box>
      <Paper style={{ marginLeft: 20, marginRight: 20, borderRadius: 5 }}>
        <TableContainer>
        <Table>
        <TableHead>
          <TableRow>
            <TableCell>Allowance Option</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payslips &&
            payslips.slice(0, limit).map((item, i) => (
              <TableRow hover key={i}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.isRequired}</TableCell>
                <TableCell align="right">
                  <IconButton
                    style={{ marginRight: 30, padding: 0 }}
                    onClick={() => {}}
                    color="primary"
                  >
                    <EditRoundedIcon />
                  </IconButton>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => {}}
                    color="secondary"
                  >
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={payslips?.length}
          rowsPerPage={limit}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
        />
      </Paper>
      <ConstantDialog
        header="PAYSLIP TYPE"
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        isEditMode={isEdit}
        value={editValue}
        onSubmitClickListener={onSubmitClickListener}
      />
    </div>
  );
};

export default AllowanceOption;
