import React, {useEffect, useState} from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import Header from "src/common/header";
import TransitionsModal from "src/pages/constant/branch/components/CreateBranchModal";
import axios from 'axios';
import SearchToolBar from "src/common/search-toolbar";
import BranchListResults from "./components/BranchListResults";
import customers from 'src/__mocks__/customers';
import { CREATE_BRANCH, FETCH_BRANCHES } from "src/api-client/endpoints";
import Progress from "src/common/loader";
import ConstantService from "src/webservices/constantsService";

const Branch = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Effect to fetch batches
   */
  useEffect(async ()=>{
    setLoading(true);
    try {
      const response = await ConstantService.fetchAllBranch();
      console.log('FETCH-ALL-BRANCH-response-', response);
      setBranches(response);
    } catch (error) {
      console.log('FETCH-ALL-BRANCH-error-',error);
    }
  },[]);

  const onClickListener = () => {
    setShowModal(!showModal);
  };

  const onChangeBranchNameText = async (values) => {
      try {
        const response = await ConstantService.createBranch(values);
        console.log('CREATE-BRANCH-response-', response);
        setShowModal(!showModal);
      } catch (error) {
        console.log('CREATE-BRANCH-error-',error);
      }
  };

  return (
    <React.Fragment>
      <Helmet>Branch</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Branch"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton
          />
          <SearchToolBar placeholderText="Search Branch" />
          <Box sx={{ pt: 3 }}>
          <BranchListResults branches={branches} />
        </Box>
        </Container>
      </Box>
      <TransitionsModal
        open={showModal}
        onCloseClickListener={onClickListener}
        title="Create New Branch"
        closeButtonText="Close"
        onChangeText={onChangeBranchNameText}
      />
      <Progress loading={loading} />
    </React.Fragment>
  );
};

export default Branch;
