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
import { addSaturationDeduction, deleteSaturationDeduction } from "./store/ajax";
import { fetchEmployee } from "./store/actions";
import { useDispatch, useSelector } from "react-redux";


const SaturationDeductionCard = ({
  id,
  name,
  deductionOption,
  title,
  amount,
  userId,
  CurrentData = []
}) => {
  // const [SaturationData, setSaturationData] = useState(CurrentData)
  const SaturationData = CurrentData
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [isOpen, setIsopen] = useState(false);
  const dispatch = useDispatch()
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
      value: 'type1',
      name: 'type1'
    },
    {
      id: 2,
      value: 'type2',
      name: 'type2'
    },
    {
      id: 3,
      value: 'type3',
      name: 'type3'
    },
  ]

  const initialValues = {
    employeeName: '',
    deductionOption: '',
    title: '',
    amount: '',
    id: Math.random(),
    edit: false
  }

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => { },
    onSubmit: (values) => {
      if (!values.edit) {
        let newCommision = SaturationData
        newCommision.push({
          id: Math.random(),
          name: values.employeeName,
          deductionOption: values.deductionOption,
          title: values.title,
          amount: values.amount,
          edit: false

        })
        // setSaturationData(newCommision)
        addSaturationDeduction({
          title: values.title,
          deduction_option: values.deductionOption,
          amount: values.amount
        }, userId)
        EmployeeLoad()
        formik.setValues(formik.initialValues)
        setIsopen(false)
      }
      else {

        let reqIndex = SaturationData.findIndex((data) => data.id == values.id)
        let updateData = SaturationData;
        updateData[reqIndex] = {
          id: values.id,
          name: values.employeeName,
          deductionOption: values.deductionOption,
          title: values.title,
          amount: values.amount,
          edit: false
        };
        addSaturationDeduction({
          title: values.title,
          deduction_option: values.deductionOption,
          amount: values.amount
        }, userId)
        EmployeeLoad()
        // setSaturationData(updateData);
        formik.setValues(formik.initialValues)
        setIsopen(false)
      }
    }
  });

  const editHandler = (id) => {
    let reqIndex = SaturationData.findIndex((data) => data.id == id)
    let reqData = SaturationData[reqIndex];

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
    let filteredArray = SaturationData.filter(data => data.id != id)
    // setSaturationData(filteredArray)
    deleteSaturationDeduction(userId, id)
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
                label="Deduction Option"
                variant="outlined"
                fullWidth
                select
                value={formik.values.deductionOption}

                onChange={formik.handleChange}
                name="deductionOption"
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
                value={formik.values.title}

                name="title"
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
                  formik.values.deductionOption != '' &&
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
          title="Saturation Deduction"
          buttonLabel="create"
          onClickListener={() => setIsopen(true)}
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
              {SaturationData.map((data, index) => (
                <TableRow hover key={data.id}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.deduction_option}</TableCell>
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

export default SaturationDeductionCard;
