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




const EmployeeSalaryCard = ({ payrollType, salary, id }) => {
  const [employeesSalary, setEmployeesSalary] = useState([
    {
      payrollType: 'cash',
      salary:'5000',
      id:1
    },
    {
      payrollType: 'credit',
      salary:'7000',
      id:2
    },
  ])
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [isOpen, setIsopen] = useState(false);
  const CloseDialogWithForm = () => {
    setIsopen(false);
    formik.setValues({...formik.values,edit:false})
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
    value: 'monthly',
    name:'monthly'
},
    {
    id: 2,
    value: 'weekly',
    name:'weekly'
  },
    
    {
    id: 3,
    value: 'yearly',
    name:'yearly'
},
]

const initialValues = {
    payslipType: '',
    salary: '',
    id:''
   
}

const formik = useFormik({
    initialValues: initialValues,
    validate: (values) =>{},
  onSubmit: (values) => {
       if (!values.edit) {
      let newemployee = employeesSalary
      newemployee.push({
        payrollType: values.payslipType,
        salary:values.salary,
        id: Math.random()
      })
    console.log(newemployee)
      setEmployeesSalary(newemployee)
      formik.setValues(formik.initialValues)
      setIsopen(false)
    }
    // else {
    //   let reqIndex = employeesSalary.findIndex((data) => data.id == values.id)
    //   let updateData = employeesSalary;
    //   updateData[reqIndex] = {
    //     payrollType: values.payslipType,
    //     salary:values.salary,
    //     id: values.id
    //   };
    //   setEmployeesSalary(updateData);
    //   formik.setValues(formik.initialValues)
    //   setIsopen(false)
    // }
    },
    
});
  
  
// const editHandler = (id) => {
//   let reqIndex = employeesSalary.findIndex((data) => data.id == id)
//   let reqData = employeesSalary[reqIndex];
//   console.log(reqData)

//   formik.setValues({
//     ...formik.values,
//     payslipType: reqData.payrollType,
//     salary: reqData.salary,
//     id: reqData.id
//   })

//   setIsopen(true)

// }

// const deleteHandler = (id) => {
//   let filteredArray = employeesSalary.filter(data => data.id != id)
//   setEmployeesSalary(filteredArray)
// }


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
              label="Pay Slip Type"
              variant="outlined"
              fullWidth
              select
              onChange={formik.handleChange}
              name="payslipType"
            >
              {option &&
                option.map((option) => (
                  <MenuItem key={option.id} value={option.value||''}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Salary"
              variant="outlined"
              fullWidth
              onChange={formik.handleChange}
              name="salary"
            />
          </Grid>
          
          <Grid item >
            <Button type="submit" variant="contained"
              disabled={!(
                formik.values.payslipType!='' &&
                formik.values.salary!=''
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
        title="Employee Salary"
        buttonLabel="create"
        onClickListener={()=>setIsopen(true)}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payslip Type</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
            <TableBody>
              {
                employeesSalary.map((data, index) => (
                  <TableRow hover key={data.id}>
                  <TableCell>{data.payrollType}</TableCell>
                  <TableCell>{data.salary}</TableCell>
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

export default EmployeeSalaryCard;
