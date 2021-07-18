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
import { useSelector } from "react-redux";
import {addAllowance} from './store/actions'


const AllowanceCard = (props) => {

  const {data,loading,firstTime,error,message, firstLoading}  = useSelector((state)=>state.Employee)

  console.log(props,'some props')
  const [allowanceData,setAllowanceData ]= useState(
    [
      {
        name: 'nagaraj',
        allowanceOption: 'type',
        title: 'some title',
        amount: 500,
        id :1
      },
      {
        name: 'nagaraj',
        allowanceOption: 'type',
        title: 'some title',
        amount: 500,
        id :2
      },
    ])
  
  

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  
  const [isOpen, setIsopen] = useState(false);
  const CloseDialogWithForm = () => {
    setIsopen(false);
    formik.setValues({...formik.values,edit:false})
  };


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
  
    let initialValues = {
      employeeName: "",
      title: "",
      allowanceOption: "",
      amount: "",
      id: Math.random(),
      edit:false
      
    };
  
    const formik = useFormik({
      initialValues: initialValues,
      validate: (values) => {},
      onSubmit: (values) => {
        console.log(values)
        if (!values.edit) {
          let newAllowance = allowanceData
          newAllowance.push({
            name:values.employeeName,
            allowanceOption:values.allowanceOption,
            title:values.title,
            amount:values.amount,
            id: Math.random()
          })
          setAllowanceData(newAllowance)
          formik.setValues(formik.initialValues)
          setIsopen(false)
        }
        else {

          let reqIndex = allowanceData.findIndex((data) => data.id == values.id)
          let updateData = allowanceData;
          updateData[reqIndex] = {
          name: values.employeeName,
          allowanceOption: values.allowanceOption,
          title: values.title,
          amount: values.amount,
          id :values.id
          };
          setAllowanceData(updateData);
          addAllowance()
          formik.setValues(formik.initialValues)
          setIsopen(false)
        }
      }
    });
  
  const editHandler = (id) => {
    let reqIndex = allowanceData.findIndex((data) => data.id == id)
    let reqData = allowanceData[reqIndex];
    console.log(reqData)

    formik.setValues({
      ...formik.values,
      employeeName: reqData.name,
      title: reqData.title,
      allowanceOption: reqData.allowanceOption,
      amount: reqData.amount,
      id: reqData.id,
      edit:true
    })

    setIsopen(true)

  }

  const deleteHandler = (id) => {
    let filteredArray = allowanceData.filter(data => data.id != id)
    setAllowanceData(filteredArray)
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
                value={formik.values.employeeName}
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
                value={formik.values.allowanceOption}
            select
            onChange={formik.handleChange}
            name="allowanceOption"
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
              !(formik.values.allowanceOption != '' &&
                formik.values.amount != '' &&
                formik.values.employeeName != '' &&
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
        onClickListener={()=>setIsopen(true)}
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
              {
                allowanceData&&allowanceData?.map((data, index) => (
                  <TableRow
                hover
                key={data.id}
              >
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.allowanceOption}</TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.amount}</TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item>
                      <IconButton onClick={()=>editHandler(data.id)}> 
                        <EditRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={()=>{deleteHandler(data.id)}}>
                        <DeleteForeverRoundedIcon style={{color: 'red'}} />
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
