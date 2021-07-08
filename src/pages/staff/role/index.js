import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Card,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Header from "src/common/header";
import roles from "src/__mocks__/roles";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CreateRoleDialog from "./CreateRoleDialog";
import RoleService from "src/webservices/roleService";

const Role = (props) => {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [role, setRole] = React.useState(null);
  const [roles, setRoles] = React.useState([]);

  React.useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const result = await RoleService.fetchAllRoles();
      console.log("--Roles--", result);
      setRoles(result);
    } catch (err) {
      //
    }
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setRole(null);
    setOpenDialog(false);
  };

  const onEditRoleClickListener = (role) => {
    setRole(role);
    setOpenDialog(true);
  };

  const onCreateRoleSuccessListener = (role) => {
    setOpenDialog(false);
  };

  const onSubmitClickListener = async (roleType, modules) => {
    setOpenDialog(false);
    try {
      const data = {
        roleType: roleType,
        permissions: modules,
      };
      const result = await RoleService.createRole(data);
    } catch (err) {
      //
    }
  };

  return (
    <React.Fragment>
      <Helmet>Roles</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Roles"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton={true}
          />
          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Role</TableCell>
                        <TableCell>Permissions</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {roles?.slice(0, limit).map((role) => (
                        <TableRow
                          hover
                          key={role?._id}
                          //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                        >
                          <TableCell>{role.roleType}</TableCell>
                          <TableCell>
                            <Grid container spacing={1}>
                              {role.permissions.map((permission) => {
                                console.log("--permission--", permission);
                                return permission?.permissions.map(
                                  (subpermission) => {
                                    return (
                                      <Grid item>
                                        <Box px={1}>
                                          <Typography
                                            color="white"
                                            style={{
                                              backgroundColor: "#ED3A3A",
                                              borderRadius: 15,
                                              paddingTop: 4,
                                              paddingBottom: 4,
                                              paddingLeft: 8,
                                              paddingRight: 8,
                                            }}
                                          >
                                            {`${subpermission?.operation} ${permission.module}`}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    );
                                  }
                                );
                              })}
                            </Grid>
                          </TableCell>
                          <TableCell>
                            <Grid container>
                              <Grid>
                                <IconButton
                                  style={{ float: "right" }}
                                  onClick={() =>
                                    onEditRoleClickListener(role.role)
                                  }
                                  color="primary"
                                >
                                  <EditRoundedIcon />
                                </IconButton>
                              </Grid>
                              <Grid>
                                <IconButton
                                  style={{ float: "right" }}
                                  onClick={() => {}}
                                  color="secondary"
                                >
                                  <DeleteForeverRoundedIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
              <TablePagination
                component="div"
                count={roles.length}
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
      <CreateRoleDialog
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
        onCreateRoleSuccessListener={onCreateRoleSuccessListener}
        onSubmitClickListener={onSubmitClickListener}
        role={role}
      />
    </React.Fragment>
  );
};

export default Role;
