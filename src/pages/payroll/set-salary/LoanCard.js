import React, { useContext, useEffect, useState } from "react";
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
  TextField,
  MenuItem,
  Button
} from "@material-ui/core";
import CommonDialog from "src/common/modal/CommonDialog";
import { Formik, useFormik } from "formik";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import { SetSallaryContext } from "./components/setSalarayContext"
import { KeyboardDatePicker } from "@material-ui/pickers";
import { addLoan } from "./store/ajax"
import { fetchEmployee } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";



const LoanCard = ({ userId, CurrentData = []}) => {

  // const [loanData, setLoanData] = useState(CurrentData)
  const loanData = CurrentData
  console.log(loanData)
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const dispatch = useDispatch()

  const [isOpen, setIsopen] = useState(false);
  const CloseDialogWithForm = () => {
    setIsopen(false);
    formik.setValues({ ...formik.values, edit: false })
  };


  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const EmployeeLoad = () => {
    dispatch(fetchEmployee())
  }

  let option = [{
    id: 1,
    value: 'Healthinsurance',
    name: 'Healthinsurance'
  }]

  const initialValues = {
    employeeName: '',
    title: '',
    loanAmount: '',
    loanOptions: '',
    startDate: '01/01/2021',
    endDate: '01/01/2021'
  }


  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => { },
    onSubmit: (values) => {
      let newLoanData = loanData
      console.log(values)
      newLoanData.push({
        name: values.employeeName,
        title: values.title,
        loanAmount: values.loanAmount,
        loanOptions: values.loanOptions,
        startDate: values.startDate,
        endDate: values.endDate,
        id: Math.random()
      })
      addLoan({
        title: values.title,
        loan_options: values.loanOptions,
        start_date: values.startDate,
        end_date: values.endDate,
        reason: "",
      }, userId)
      EmployeeLoad()
      // setLoanData(newLoanData)
      formik.setValues(formik.initialValues)
      setIsopen(false)
    }
  });






  return (
    <>

      <CommonDialog
        open={isOpen}
        onCloseClickListener={CloseDialogWithForm}
        title='Add allowance to employee'
      >

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Employee Name"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="employeeName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Loan Option"
                variant="outlined"
                fullWidth
                select
                onChange={formik.handleChange}
                name="loanOptions"
              >
                {option && option.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Loan Amount"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="loanAmount"
              />
            </Grid>
            <Grid item xs={12}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                name='startDate'
                variant="inline"
                format="DD/MM/YYYY"
                label="Start Date"
                fullWidth
                value={formik.values.startDate}
                onChange={(data) => formik.setValues({ ...formik.values, startDate: data.format("DD/MM/YYYY") })}
              />
            </Grid>
            <Grid item xs={12}>
              <KeyboardDatePicker
                disableToolbar
                autoOk
                name='endDate'
                variant="inline"
                format="DD/MM/YYYY"
                label="End Date"
                fullWidth
                value={formik.values.endDate}
                onChange={(data) => formik.setValues({ ...formik.values, endDate: data.format("DD/MM/YYYY") })}
              />
            </Grid>
            <Grid item xs={12}>

              <Button
                type="submit"
                variant="contained"
                disabled=
                {!(formik.values.allowanceOption != '' &&
                  formik.values.employeeName != '' &&
                  formik.values.endDate != '' && formik.values.loanAmount != ''
                  && formik.values.loanOption != '' &&
                  formik.values.startDate != '')}
              >
                Submit
              </Button>
            </Grid>

          </Grid>
        </form>
      </CommonDialog>



      <Card>
        <CardHeader
          title="Loan"
          buttonLabel="create"
          onClickListener={() => setIsopen(true)}
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
              {
                loanData.map((data, index) => (
                  <TableRow
                    hover
                    key={data.id}
                  //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                  >
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.loanOptions}</TableCell>
                    <TableCell>{data.title}</TableCell>
                    <TableCell>{data.loanAmount}</TableCell>
                    <TableCell>{data.start_date}</TableCell>
                    <TableCell>{data.end_date}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </PerfectScrollbar>
      </Card>

    </>
  );
}

export default LoanCard;
