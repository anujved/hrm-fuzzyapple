import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import Header from "src/common/header";
import TransitionsModal from "./components/CreateNewDocumentTypeModal";
import axios from 'axios';
import SearchToolBar from "src/common/search-toolbar";
import DocumentTypeListResults from "./components/DocumentTypeListResults";
import customers from 'src/__mocks__/customers';
import ConstantService from "src/webservices/constantsService";

const DocumentType = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [documentTypes, setDocumentTypes] = React.useState(null);

  const onClickListener = () => {
    setShowModal(!showModal);
  };

  React.useEffect(()=> {
    fetchDocumentTypes();
  }, []);

  const fetchDocumentTypes = async () => {
    try {
      const response = await ConstantService.fetchAllDocumentType();
      setDocumentTypes(response);
    } catch (error) {}
  }

  const onChangeBranchNameText = async (values) => {
    try {
      const response = await ConstantService.createDocumentType(values);
      console.log('CREATE-response-', response);
      setShowModal(!showModal);
      fetchDocumentTypes();
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Helmet>Document Type</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Document Type"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton
          />
          <SearchToolBar placeholderText="Search Document Type" />
          <Box sx={{ pt: 3 }}>
          <DocumentTypeListResults items={documentTypes} />
        </Box>
        </Container>
      </Box>
      <TransitionsModal
        open={showModal}
        onCloseClickListener={onClickListener}
        title="Create New Document Type"
        closeButtonText="Close"
        onChangeText={onChangeBranchNameText}
      />
    </React.Fragment>
  );
};

export default DocumentType;
