import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Header from "src/common/header";
import { useParams } from "react-router-dom";
import EmployeeSalaryCard from "./set-salary/EmployeeSalaryCard";
import AllowanceCard from "./set-salary/AllowanceCard";
import CommissionCard from "./set-salary/CommissonCard";
import LoanCard from "./set-salary/LoanCard";
import SaturationDeductionCard from "./set-salary/SaturationDeductionCard";
import OtherPaymentCard from "./set-salary/OtherPaymentCard";
import OvertimeCard from "./set-salary/OvertimeCard";

const SalaryDetailView = (props) => {
  const [showModal, setShowModal] = React.useState(false);

  const { id } = useParams();
  console.log("----ID----", id);

  const onClickListener = () => {
    setShowModal(!showModal);
  };

  return (
    <React.Fragment>
      <Helmet>Employee Set Salary</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Employee Set Salary"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton={false}
          />
          <PerfectScrollbar>
            <Grid container mt={3} spacing={2}>
              <Grid item xs={12} md={6}>
                <EmployeeSalaryCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <AllowanceCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <CommissionCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <LoanCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <SaturationDeductionCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <OtherPaymentCard />
              </Grid>
              <Grid item xs={12} md={6}>
                <OvertimeCard />
              </Grid>
            </Grid>
          </PerfectScrollbar>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default SalaryDetailView;
