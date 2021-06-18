import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Box, Container, Grid } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import EmployeeProfileToolbar from "./EmployeeProfileToolbar";
import ProfileCardView from "./ProfileCardView";

const profiles = [
  {
    name: "Test",
    designation: "Developer",
    empId: "#EM00005680",
  },
  {
    name: "Test1",
    designation: "AVP",
    empId: "#EM00005680",
  },
  {
    name: "Test2",
    designation: "Manager",
    empId: "#EM00005680",
  },
  {
    name: "Test3",
    designation: "Tester",
    empId: "#EM00005680",
  },
];

const EmployeeProfile = (props) => {
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
          <EmployeeProfileToolbar />
          <PerfectScrollbar>
            <Grid container spacing={2} mt={3}>
              {profiles.map((profile) => {
                return (
                  <Grid item xs={12} md={3}>
                    <ProfileCardView profile={profile} />
                  </Grid>
                );
              })}
            </Grid>
          </PerfectScrollbar>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default EmployeeProfile;
