import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Box, Container, Grid } from "@material-ui/core";
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
import { SetSallaryProvider } from "./set-salary/components/setSalarayContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployee } from "./set-salary/store/actions";
import { filter, findIndex, get } from "lodash";

const SalaryDetailView = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const { data, loading, firstTime, error, message, firstLoading } =
    useSelector((state) => state.Employee);
  const dispatch = useDispatch();
  useEffect(() => {
    !firstLoading && dispatch(fetchEmployee());
  }, []);

  const { id } = useParams();
  const onClickListener = () => {
    setShowModal(!showModal);
  };
  const currentEmployee = useMemo(() => {
    let index = findIndex(data, (allId) => allId.id === id);
    if (index !== -1) {
      return data[index];
    }
  }, [data, id]);

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
        <SetSallaryProvider>
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
                  <EmployeeSalaryCard
                    payrollType={get(currentEmployee, "payrollType")}
                    salary={get(currentEmployee, "salary")}
                    id={get(currentEmployee, "id")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <AllowanceCard
                    name={get(currentEmployee, "name")}
                    allowanceOption={get(currentEmployee, "allowanceOption")}
                    amount={get(currentEmployee, "amount")}
                    title={get(currentEmployee, "title")}
                    id={get(currentEmployee, "id")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CommissionCard
                    name={get(currentEmployee, "name")}
                    allowanceOption={get(currentEmployee, "allowanceOption")}
                    amount={get(currentEmployee, "amount")}
                    title={get(currentEmployee, "title")}
                    id={get(currentEmployee, "id")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LoanCard
                    name={get(currentEmployee, "name")}
                    loanOptions={get(currentEmployee, "loanOptions")}
                    laonAmount={get(currentEmployee, "laonAmount")}
                    startDate={get(currentEmployee, "startDate")}
                    endDate={get(currentEmployee, "endDate")}
                    title={get(currentEmployee, "title")}
                    id={get(currentEmployee, "id")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SaturationDeductionCard
                    id={get(currentEmployee, "id")}
                    name={get(currentEmployee, "name")}
                    title={get(currentEmployee, "title")}
                    amount={get(currentEmployee, "amount")}
                    deductionOption={get(currentEmployee, "deductionOption")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <OtherPaymentCard
                    id={get(currentEmployee, "id")}
                    name={get(currentEmployee, "name")}
                    title={get(currentEmployee, "title")}
                    amount={get(currentEmployee, "amount")}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <OvertimeCard
                    id={get(currentEmployee, "id")}
                    name={get(currentEmployee, "name")}
                    overtimeTitle={get(currentEmployee, "overtimeTitle")}
                    numberOfDays={get(currentEmployee, "numberOfDays")}
                    hours={get(currentEmployee, "hours")}
                    rate={get(currentEmployee, "rate")}
                  />
                </Grid>
              </Grid>
            </PerfectScrollbar>
          </Container>
        </SetSallaryProvider>
      </Box>
    </React.Fragment>
  );
};

export default SalaryDetailView;
