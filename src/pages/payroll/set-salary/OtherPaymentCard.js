import React, { useContext, useState } from "react";
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
import { useFormik } from "formik";

import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { addOtherPayment, deleteOtherPayment } from "./store/ajax";
import { fetchEmployee } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";


const OtherPaymentCard = ({ id, name, title, amount, userId, CurrentData = []}) => {
  // const [OtherPayment, setOtherPayment] = useState(CurrentData)
  const OtherPayment = CurrentData
  const dispatch = useDispatch()
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [isOpen, setIsopen] = useState(false);
  const CloseDialogWithForm = () => {
    setIsopen(false);
    formik.setValues({ ...formik.values, edit: false })
  };
  const EmployeeLoad = () => {
    dispatch(fetchEmployee())
  }

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  let option = [
    {
      id: 1,
      value: "taxables",
      name: "Taxables",
    },
    {
      id: 2,
      value: "taxabless",
      name: "Tax not ables",
    },

  ];

  const initialValues = {
    employeeName: '',
    title: '',
    amount: '',
    id: id,
    edit: false
  }

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => { },
    onSubmit: (values) => {
      if (!values.edit) {
        console.log(values)
        let OtherPayments = OtherPayment
        OtherPayments.push({
          name: values.employeeName,
          title: values.title,
          amount: values.amount,
          id: Math.random()
        })
        addOtherPayment({
          title: values.title,
          amount: values.amount,
        }, userId)
        EmployeeLoad()
        // setOtherPayment(OtherPayments)
        formik.setValues(formik.initialValues)
        setIsopen(false)
      }
      else {

        let reqIndex = OtherPayment.findIndex((data) => data.id == values.id)
        let updateData = OtherPayment;
        updateData[reqIndex] = {
          name: values.employeeName,
          title: values.title,
          amount: values.amount,
          id: values.id
        };
        addOtherPayment({
          title: values.title,
          amount: values.amount,
        }, userId)
        EmployeeLoad()
        // setOtherPayment(updateData);
        formik.setValues(formik.initialValues)
        setIsopen(false)
      }
    }
  });

  const editHandler = (id) => {
    let reqIndex = OtherPayment.findIndex((data) => data.id == id)
    let reqData = OtherPayment[reqIndex];

    formik.setValues({
      ...formik.values,
      employeeName: reqData.name,
      title: reqData.title,
      amount: reqData.amount,
      id: id,
      edit: true
    })

    setIsopen(true)

  }

  const deleteHandler = (id) => {
    let filteredArray = OtherPayment.filter(data => data.id != id)
    // setOtherPayment(filteredArray)
    deleteOtherPayment(userId, id)
    EmployeeLoad()
  }
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
                value={formik.values.employeeName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="title"
                value={formik.values.title}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                name="amount"
                value={formik.values.amount}

              />
            </Grid>


            <Grid item xs={12}>

              <Button
                type="submit"
                variant="contained"
                disabled={!(
                  formik.values.amount != '' &&
                  formik.values.employeeName != '' &&
                  formik.values.title != ''
                )}
              >
                Submit
              </Button>
            </Grid>

          </Grid>
        </form>
      </CommonDialog>


      <Card>
        <CardHeader
          title="Other Payment"
          buttonLabel="create"
          onClickListener={() => setIsopen(true)}
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
              {OtherPayment.map((data, i) => (
                <TableRow hover key={id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.amount}</TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid item>
                        <IconButton onClick={() => editHandler(data._id)}>
                          <EditRoundedIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton onClick={() => deleteHandler(data._id)}>
                          <DeleteForeverRoundedIcon style={{ color: "red" }} />
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
    </>
  );
};

export default OtherPaymentCard;
