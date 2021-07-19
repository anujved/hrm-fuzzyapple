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
import { useFormik } from "formik";
import PerfectScrollbar from "react-perfect-scrollbar";
import CardHeader from "./CardHeader";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import { useDispatch, useSelector } from "react-redux";
import { addAllowance, deleteAllowance } from './store/ajax'
import { fetchEmployee } from "./store/actions";


const AllowanceCard = ({ CurrentData = [], name, userId }) => {

  // console.log(CurrentData, 'current Data')
  // console.log(id)
  // console.log(userId)
  const dispatch = useDispatch()

  const allowanceData = CurrentData
  // const userId = window.location.href.split("/")[5]
  // const state = useSelector((state) => state)

  // console.log(userId)

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

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

  let initialValues = {
    employeeName: "",
    title: "",
    allowance_option: "",
    amount: "",
    id: Math.random().toString().slice(2, 11),
    edit: false

  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => { },
    onSubmit: (values) => {
      if (!values.edit) {
        addAllowance({
          title: values.title,
          amount: values.amount,
          allowance_option: values.allowance_option
        }, userId).then((data) => {
          EmployeeLoad()
        })
      }
      else {
        addAllowance({
          title: values.title,
          amount: values.amount,
          allowance_option: values.allowance_option
        }, userId).then((data) => {
          EmployeeLoad()
        })
      }
      // console.log(values, id)


    }
  });

  const editHandler = (id) => {
    let reqIndex = allowanceData.findIndex((data) => data._id == id)
    let reqData = allowanceData[reqIndex];
    console.log(reqData)

    formik.setValues({
      ...formik.values,
      employeeName: name,
      title: reqData.title,
      allowance_option: reqData.allowance_option,
      amount: reqData.amount,
      id: reqData._id,
      edit: true
    })

    setIsopen(true)

  }

  const deleteHandler = (id) => {
    // console.log(id)
    // console.log(userId)
    deleteAllowance(userId, id).then((data) => {
      console.log(data);
      EmployeeLoad()
    })
  }

  console.log(allowanceData)

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
                value={name}
                fullWidth
                onChange={formik.handleChange}
                name="employeeName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Allowance Option"
                variant="outlined"
                fullWidth
                value={formik.values.allowance_option}
                select
                onChange={formik.handleChange}
                name="allowance_option"
              >
                {option &&
                  option.map((option) => (
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
                value={formik.values.title}
                onChange={formik.handleChange}
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Amount"
                variant="outlined"
                value={formik.values.amount}
                fullWidth
                onChange={formik.handleChange}
                name="amount"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit"
                variant="contained"
                disabled={
                  !(formik.values.allowance_option != '' &&
                    formik.values.amount != '' &&
                    formik.values.title != '')

                }
              >
                Submit
              </Button>
            </Grid>

          </Grid>


        </form>
      </CommonDialog>



      <Card>
        <CardHeader
          title="Allowance"
          buttonLabel="create"
          onClickListener={() => setIsopen(true)}
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
              {allowanceData?.map((data, index) => (
                <TableRow
                  hover
                  key={data._id}
                >
                  <TableCell>{name}</TableCell>
                  <TableCell>{data.allowance_option}</TableCell>
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
                        <IconButton onClick={() => { deleteHandler(data._id) }}>
                          <DeleteForeverRoundedIcon style={{ color: 'red' }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))
              }

            </TableBody>
          </Table>
        </PerfectScrollbar>
      </Card>
    </>
  );
};

export default AllowanceCard;
