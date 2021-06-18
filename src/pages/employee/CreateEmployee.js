import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  MenuItem,
  Button,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useFormik } from "formik";
import { KeyboardDatePicker } from "@material-ui/pickers";
import CloudUploadRoundedIcon from "@material-ui/icons/CloudUploadRounded";
import ConstantService from "src/webservices/constantsService";
import EmployeeService from "src/webservices/employeeService";

const CreateEmployee = (props) => {
  const date = Date.now();
  const [branches, setBranches] = React.useState(null);
  const [departments, setDepartments] = React.useState(null);
  const [designations, setDesignations] = React.useState(null);
  const [dob, setDoB] = React.useState(Date.now);
  const [doj, setDoJ] = React.useState(Date.now);
  const [lastEmployeeId, setLastEmployeeId] = React.useState(0);

  React.useEffect(() => {
    fetchBranches();
    fetchDepartments();
    fetchDesignations();
    getLastEmployeeId();
  }, []);

  const getLastEmployeeId = async () => {
    try {
      const response = await EmployeeService.fetchAllEmployee();
      let lastEmployeeId = 0;
      if(response.length > 0) {
        const lastEmployee = response[response.length - 1];
        lastEmployeeId = lastEmployee.employeeId;
        setLastEmployeeId(lastEmployeeId);
      }
    } catch (error) {}
  }

  const fetchBranches = async () => {
    try {
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    } catch (error) {}
  };

  const fetchDepartments = async () => {
    try {
      const response = await ConstantService.fetchAllDepartment();
      setDepartments(response);
    } catch (error) {}
  };

  const fetchDesignations = async () => {
    try {
      const response = await ConstantService.fetchAllDesignation();
      setDesignations(response);
    } catch (error) {}
  };

  const handleDateChange = (date) => {
    return;
  };

  const formik = useFormik({
    initialValues: {
      // personal detail
      employeeName: "",
      phoneNumber: "",
      gender: "",
      email: "",
      password: "",
      address: "",
      //company detail
      branch: "",
      department: "",
      designation: "",
      // bank detail
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      bankIdentifierCode: "",
      branchLocation: "",
      taxPayerId: "",
    },
    validate: (values) => {
      const error = {};
      if (values.employeeName.length === 0) {
        error.employeeNameError = "Required";
      }

      if (values.phoneNumber.length === 0) {
        error.phoneNumberError = "Required"
      }

      if (values.email.length === 0) {
        error.emailError = "Required"
      }

      if (values.password.length === 0) {
        error.passwordError = "Required"
      }

      if (values.address.length === 0) {
        error.addressError = "Required"
      }

      if (values.accountHolderName.length === 0) {
        error.accountHolderNameError = "Required";
      }

      if (values.accountNumber.length === 0) {
        error.accountNumberError = "Required"
      }

      if (values.branchLocation.length === 0) {
        error.branchLocationError = "Required"
      }

      if (values.bankName.length === 0) {
        error.bankNameError = "Required"
      }

      if (values.bankIdentifierCode.length === 0) {
        error.bankIdentifierCodeError = "Required"
      }
      
      if (values.taxPayerId.length === 0) {
        error.taxPayerIdError = "Required"
      }
      return error;
    },
    onSubmit: (values) => {
      const {
        employeeName,
        phoneNumber,
        gender,
        email,
        password,
        address,
        branch,
        department,
        designation,
        accountHolderName,
        accountNumber,
        bankName,
        bankIdentifierCode,
        branchLocation,
        taxPayerId,
      } = values;

      const personalDetail = {
        employeeName,
        phoneNumber,
        gender,
        email,
        password,
        address,
        dateOfBirth: dob?._d,
      };
      const companyDetail = { branch, department, designation, dateOfJoining: doj?._d };
      const bankDetail = {
        accountHolderName,
        accountNumber,
        bankName,
        bankIdentifierCode,
        branchLocation,
        taxPayerId,
      };
      const data = {employeeId: lastEmployeeId + 1,  personalDetail, companyDetail, bankDetail}
      console.log('--Employee--',data);
      createEmployee(data);
    },
    validateOnChange: false,
  });

  const createEmployee = async (data) => {
    try {
      const response = await EmployeeService.createEmployee(data);
      console.log('CREATE-response-', response);
    } catch (error) {}
  }

  return (
    <React.Fragment>
      <Helmet>Create Employee</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ pt: 3 }}>
            <Grid container justifyContent="space-between">
              <Box mb={3}>
                <Grid item xs={12} md={12}>
                  <Typography>Create Employee</Typography>
                </Grid>
              </Box>
            </Grid>
          </Box>
          <PerfectScrollbar>
            <form
                onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <Grid container spacing={2}>
                {/** ****** Personal Detail ****** */}
                <Grid item xs={12} md={6}>
                  <Card>
                    <Grid>
                      <Box m={3}>
                        <Typography>Personal Detail</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      container
                      flexDirection="row"
                      spacing={3}
                      px={3}
                      pb={3}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Name"
                          variant="outlined"
                          fullWidth
                          helperText={formik.errors.employeeNameError}
                          error={formik.errors.employeeNameError && true}
                          onChange={formik.handleChange}
                          name="employeeName"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Phone"
                          variant="outlined"
                          fullWidth
                          helperText={formik.errors.phoneNumberError}
                          error={formik.errors.phoneNumberError && true}
                          onChange={formik.handleChange}
                          name="phoneNumber"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <KeyboardDatePicker
                          disableToolbar
                          autoOk
                          variant="inline"
                          format="dd/MM/yyyy"
                          label="Date of Birth"
                          fullWidth
                          value={dob}
                          onChange={(value) => setDoB(value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Gender</FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="gender"
                            onChange={formik.handleChange}
                            variant="outlined"
                            row
                          >
                            <FormControlLabel
                              value="female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              value="male"
                              control={<Radio />}
                              label="Male"
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Email"
                          variant="outlined"
                          fullWidth
                          helperText={formik.errors.emailError}
                          error={formik.errors.emailError && true}
                          onChange={formik.handleChange}
                          name="email"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Password"
                          variant="outlined"
                          fullWidth
                          helperText={formik.errors.passwordError}
                          error={formik.errors.passwordError && true}
                          onChange={formik.handleChange}
                          name="password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Address"
                          variant="outlined"
                          fullWidth
                          multiline
                          helperText={formik.errors.addressError}
                          error={formik.errors.addressError && true}
                          onChange={formik.handleChange}
                          name="address"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                {/** ****** Comapany Detail ****** */}
                <Grid item xs={12} md={6}>
                  <Card>
                    <Grid>
                      <Box m={3}>
                        <Typography>Company Detail</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      container
                      flexDirection="row"
                      spacing={3}
                      px={3}
                      pb={3}
                    >
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          disabled
                          value={`#EMP00${lastEmployeeId + 1}`}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Branch"
                          variant="outlined"
                          fullWidth
                          select
                          onChange={formik.handleChange}
                          name="branch"
                        >
                          {branches &&
                            branches.map((option) => (
                              <MenuItem key={option._id} value={option}>
                                {option.branchName}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Department"
                          variant="outlined"
                          fullWidth
                          select
                          onChange={formik.handleChange}
                          name="department"
                        >
                          {departments &&
                            departments.map((option) => (
                              <MenuItem key={option._id} value={option}>
                                {option.name}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Designation"
                          variant="outlined"
                          fullWidth
                          select
                          onChange={formik.handleChange}
                          name="designation"
                        >
                          {designations &&
                            designations.map((option) => (
                              <MenuItem key={option._id} value={option}>
                                {option.name}
                              </MenuItem>
                            ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <KeyboardDatePicker
                          disableToolbar
                          autoOk
                          variant="inline"
                          format="dd/MM/yyyy"
                          label="Date of Joining"
                          fullWidth
                          value={doj}
                          onChange={(value) => {setDoJ(value)}}
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                {/** Document Type */}
                <Grid item xs={12} md={6}>
                  <Card>
                    <Grid>
                      <Box m={3}>
                        <Typography>Document</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      container
                      flexDirection="row"
                      spacing={3}
                      px={3}
                      pb={3}
                      alignItems="center"
                    >
                      <Grid item xs={12} md={3}>
                        <Typography>Certificate</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <input
                          type="file"
                          id="file-upload-certificate"
                          style={{ display: "none" }}
                        />
                        <label htmlFor="file-upload-certificate">
                          <Button
                            onClick={(e) =>
                              document
                                .getElementById("file-upload-certificate")
                                .click()
                            }
                            variant="contained"
                            startIcon={<CloudUploadRoundedIcon />}
                          >
                            Choose file
                          </Button>
                        </label>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography>Resume</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <input
                          type="file"
                          id="file-upload-resume"
                          style={{ display: "none" }}
                        />
                        <label htmlFor="file-upload-resume">
                          <Button
                            onClick={(e) =>
                              document
                                .getElementById("file-upload-resume")
                                .click()
                            }
                            variant="contained"
                            startIcon={<CloudUploadRoundedIcon />}
                          >
                            Choose file
                          </Button>
                        </label>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography>Photo</Typography>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <input
                          type="file"
                          id="file-upload-photo"
                          style={{ display: "none" }}
                        />
                        <label htmlFor="file-upload-photo">
                          <Button
                            onClick={(e) =>
                              document
                                .getElementById("file-upload-photo")
                                .click()
                            }
                            variant="contained"
                            startIcon={<CloudUploadRoundedIcon />}
                          >
                            Choose file
                          </Button>
                        </label>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                {/** Bank Details */}
                <Grid item xs={12} md={6}>
                  <Card>
                    <Grid>
                      <Box m={3}>
                        <Typography>Bank Detail</Typography>
                      </Box>
                    </Grid>
                    <Grid
                      container
                      flexDirection="row"
                      spacing={3}
                      px={3}
                      pb={3}
                    >
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Account Holder Name"
                          variant="outlined"
                          fullWidth
                          helperText={formik.errors.accountHolderNameError}
                          error={formik.errors.accountHolderNameError && true}
                          onChange={formik.handleChange}
                          name="accountHolderName"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Account Number"
                          variant="outlined"
                          fullWidth
                          helperText={formik.errors.accountNumberError}
                          error={formik.errors.accountNumberError && true}
                          onChange={formik.handleChange}
                          name="accountNumber"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Bank Name"
                          variant="outlined"
                          fullWidth
                          helperText={formik.errors.bankNameError}
                          error={formik.errors.bankNameError && true}
                          onChange={formik.handleChange}
                          name="bankName"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Bank Identifier Code"
                          variant="outlined"
                          fullWidth
                          helperText={formik.errors.bankIdentifierCodeError}
                          error={formik.errors.bankIdentifierCodeError && true}
                          onChange={formik.handleChange}
                          name="bankIdentifierCode"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Branch Location"
                          variant="outlined"
                          fullWidth
                          multiline
                          helperText={formik.errors.branchLocationError}
                          error={formik.errors.branchLocationError && true}
                          onChange={formik.handleChange}
                          name="branchLocation"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Tax Payer Id"
                          variant="outlined"
                          fullWidth
                          multiline
                          helperText={formik.errors.taxPayerIdError}
                          error={formik.errors.taxPayerIdError && true}
                          onChange={formik.handleChange}
                          name="taxPayerId"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} justifyContent="flex-end">
                  <Box mt={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ float: "right" }}
                    >
                      Create
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </PerfectScrollbar>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default CreateEmployee;
