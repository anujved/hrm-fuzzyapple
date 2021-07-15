import React, { useContext,useState } from "react";
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


const CommissionCard = ({ id, name, title, amount }) => {

  const [commissionCardData, setCommisionCardData] = useState([
    {
      id: 1,
      name: 'nagaraj',
      title: 'this is the title',
      amount: 5000
    },
    {
      id: 2,
      name: 'nag araj',
      title: 'this is the title2',
      amount: 200
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
    title:'',
    amount: '',
    id:id
}

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {},
    onSubmit: (values) => {
      console.log(values)
      if (!values.edit) {
        let newCommision= commissionCardData
        newCommision.push({
          name:values.employeeName,
          title:values.title,
          amount:values.amount,
          id: Math.random()
        })
        setCommisionCardData(newCommision)
        formik.setValues(formik.initialValues)
        setIsopen(false)
      }
      else {

        let reqIndex = commissionCardData.findIndex((data) => data.id == values.id)
        let updateData = commissionCardData;
        updateData[reqIndex] = {
        name: values.employeeName,
        title: values.title,
        amount: values.amount,
        id :values.id
        };
        setCommisionCardData(updateData);
        formik.setValues(formik.initialValues)
        setIsopen(false)
      }
    }
  });

const editHandler = (id) => {
  let reqIndex = commissionCardData.findIndex((data) => data.id == id)
  let reqData = commissionCardData[reqIndex];

  formik.setValues({
    ...formik.values,
    employeeName: reqData.name,
    title: reqData.title,
    amount: reqData.amount,
    id: id,
    edit:true
  })

  setIsopen(true)

}

const deleteHandler = (id) => {
  let filteredArray = commissionCardData.filter(data => data.id != id)
  setCommisionCardData(filteredArray)
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
                            formik.values.amount!='' &&
                            formik.values.employeeName!='' &&
                            formik.values.title!=''
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
        title="Commission"
        buttonLabel="create"
        onClickListener={()=>{setIsopen(true)}}
      />
      <PerfectScrollbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              commissionCardData.map((data, i) => (
                <TableRow
                hover
                key={id}
              >
                <TableCell>{data.name}</TableCell>
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
                      <IconButton onClick={()=>deleteHandler(data.id)}>
                        <DeleteForeverRoundedIcon style={{ color: "red" }} />
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

export default CommissionCard;
