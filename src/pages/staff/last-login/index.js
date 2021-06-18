import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Card,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Header from "src/common/header";
import lastLogin from "src/__mocks__/last-login";
import SearchToolBar from "src/common/search-toolbar";

const LastLogin = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onClickListener = () => {
    setShowModal(!showModal);
  };

  return (
    <React.Fragment>
      <Helmet>Last Login</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Last Login"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton={false}
          />
          <SearchToolBar />
          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>EmpID#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Last Login</TableCell>
                        <TableCell>Role</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lastLogin.slice(0, limit).map((el) => (
                        <TableRow
                          hover
                          key={el.id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>{el.employeeId}</TableCell>
                          <TableCell>{el.name}</TableCell>
                          <TableCell>{el.lastLogin}</TableCell>
                          <TableCell>{el.role}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={lastLogin.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </Card>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default LastLogin;
