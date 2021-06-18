import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import Header from "src/common/header";
import TransitionsModal from "src/pages/constant/designation/components/CreateDesignationModal";
import axios from 'axios';
import SearchToolBar from "src/common/search-toolbar";
import DesignationListResults from "./components/DesignationListResults";
import customers from 'src/__mocks__/customers';
import ConstantService from "src/webservices/constantsService";

const Designation = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [departments, setDepartments] = React.useState(null);
  const [desginations, setDesignations] = React.useState(null);

  React.useEffect(()=> {
    fetchDepartments();
    fetchDesignations();
  }, []);

  const onClickListener = () => {
    setShowModal(!showModal);
  };

  const fetchDepartments = async () => {
    try {
      const response = await ConstantService.fetchAllDepartment();
      setDepartments(response);
    } catch (error) {}
  }
  const fetchDesignations = async () => {
    try {
      const response = await ConstantService.fetchAllDesignation();
      setDesignations(response);
    } catch (error) {}
  }

  const onChangeBranchNameText = async (values) => {
    try {
      const response = await ConstantService.createDesignation(values);
      console.log('CREATE-DEPARTMENT-response-', response);
      setShowModal(!showModal);
      fetchDesignations();
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
            title="Manage Designation"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton
          />
          <SearchToolBar placeholderText="Search Designation" />
          <Box sx={{ pt: 3 }}>
          <DesignationListResults desginations={desginations} />
        </Box>
        </Container>
      </Box>
      <TransitionsModal
        open={showModal}
        onCloseClickListener={onClickListener}
        title="Create New Designation"
        closeButtonText="Close"
        onChangeText={onChangeBranchNameText}
        departments={departments}
      />
    </React.Fragment>
  );
};

export default Designation;
