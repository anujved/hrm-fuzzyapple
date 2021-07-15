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


const OvertimeCard = ({
  id,
  name,
  overtimeTitle,
  numberOfDays,
  hours,
  rate,
}) => {

  const [overTimeData, setOverTimeData] = useState([
    {
      id:1,
      name:'nagraj',
      overtimeTitle:'this is the title',
      numberOfDays:25,
      hours:12,
      rate:150,
    },
    {
      id:2,
      name:'nagraj',
      overtimeTitle:'this is the title',
      numberOfDays:25,
      hours:12,
      rate:150,
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

  const initialValues = {
    employeeName: '',
    overtimeTitle:'',
    days: '',
    hours: '',
    rate: '',
    edit: false,
    id:Math.random()
}

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {},
    onSubmit: (values) => {
      console.log(values)
      if (!values.edit) {
        let newOverTimeData= overTimeData
        newOverTimeData.push({
          id:Math.random(),
          name:values.employeeName,
          overtimeTitle:values.overtimeTitle,
          numberOfDays:values.days,
          hours:values.hours,
          rate:values.rate,
        })
        setOverTimeData(newOverTimeData)
        formik.setValues(formik.initialValues)
        setIsopen(false)
      }
      else {

        let reqIndex = overTimeData.findIndex((data) => data.id == values.id)
        let updateData = overTimeData;
        updateData[reqIndex] = {
          employeeName: values.employeeName,
          overtimeTitle:values.overtimeTitle,
          days: values.days,
          hours: values.hours,
          rate: values.rate,
          edit:false
        };
        setOverTimeData(updateData);
        formik.setValues(formik.initialValues)
        setIsopen(false)
      }
    }
  });

const editHandler = (id) => {
  let reqIndex = overTimeData.findIndex((data) => data.id == id)
  let reqData = overTimeData[reqIndex];

  formik.setValues({
    ...formik.values,
    employeeName: reqData.employeeName,
    overtimeTitle:reqData.overtimeTitle,
    days: reqData.numberOfDays,
    hours: reqData.hours,
    rate: reqData.rate,
    edit:true
  })

  setIsopen(true)

}

const deleteHandler = (id) => {
  let filteredArray = overTimeData.filter(data => data.id != id)
  setOverTimeData(filteredArray)
}
console.log(formik.values)
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
                value={formik.values.employeeName}

                            name="employeeName"
                        />
                    </Grid>
                  
                    <Grid item xs={12}>
                         <TextField
                                value={formik.values.overtimeTitle}

                            label="Overtime Title"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                            name="overtimeTitle"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Days"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                name="days"
                value={formik.values.days}

                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Hours"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                name="hours"
                value={formik.values.hours}

                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Rate"
                            variant="outlined"
                            fullWidth
                            onChange={formik.handleChange}
                name="rate"
                value={formik.values.rate}
                            />
                    </Grid>
                 
                    
                    <Grid item xs={12}>

                        <Button
                        type="submit"
                        variant="contained"
                        disabled={!(
                            formik.values.days !=''&&
                            formik.values.employeeName!='' &&
                            formik.values.hours !=''&&
                            formik.values.overtimeTitle!='' &&
                            formik.values.rate!=''
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
        title="Overtime"
        buttonLabel="create"
        onClickListener={()=>setIsopen(true)}
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
              {overTimeData.map((data, i) => (
                <TableRow hover key={data.id}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.overtimeTitle}</TableCell>
                <TableCell>{data.numberOfDays}</TableCell>
                <TableCell>{data.hours}</TableCell>
                <TableCell>{data.rate}</TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item>
                      <IconButton onClick={()=>{editHandler(data.id)}}  >
                        <EditRoundedIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={()=>{deleteHandler(data.id)}} >
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

export default OvertimeCard;
