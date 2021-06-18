import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import Header from "src/common/header";
import CreateDepartmentModal from "src/pages/constant/department/components/CreateDepartmentModal";
import axios from 'axios';
import SearchToolBar from "src/common/search-toolbar";
import DepartmentListResults from "./components/DepartmentListResults";
import customers from 'src/__mocks__/customers';
import Progress from "src/common/loader";
import ConstantService from "src/webservices/constantsService";

const Department = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [branches, setBranches] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [departments, setDepartments] = React.useState(null);

  React.useEffect(()=> {
    fetchBranches();
    fetchDepartments();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await ConstantService.fetchAllBranch();
      setBranches(response);
    } catch (error) {}
  }

  const fetchDepartments = async () => {
    try {
      const response = await ConstantService.fetchAllDepartment();
      setDepartments(response);
    } catch (error) {}
  }

  const onClickListener = () => {
    setShowModal(!showModal);
  };

  const onChangeBranchNameText = async (values) => {
    try {
      const response = await ConstantService.createDepartment(values);
      console.log('CREATE-DEPARTMENT-response-', response);
      setShowModal(!showModal);
      fetchDepartments();
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Helmet>Department</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Department"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton
          />
          <SearchToolBar placeholderText="Search Department" />
          <Box sx={{ pt: 3 }}>
          <DepartmentListResults departments={departments} />
        </Box>
        </Container>
      </Box>
      <CreateDepartmentModal
        open={showModal}
        onCloseClickListener={onClickListener}
        title="Create New Department"
        closeButtonText="Close"
        onChangeText={onChangeBranchNameText}
        branches={branches}
      />
      <Progress loading={loading} />
    </React.Fragment>
  );
};

export default Department;
