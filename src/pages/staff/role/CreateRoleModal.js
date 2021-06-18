import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Typography,
  Grid,
  Button,
  TextField,
  Box,
  IconButton,
  MenuItem,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Card,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useFormik } from "formik";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import PerfectScrollbar from "react-perfect-scrollbar";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TransitionsModal = (props) => {
  const classes = useStyles();

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const formik = useFormik({
    initialValues: {
      branchName: "",
    },
    validate: (values) => {
      const error = {};
      if (values.branchName.length < 10) {
        error.nameError = "Please enter name";
      }

      return error;
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      props.onChangeText(values);
    },
    validateOnChange: true,
  });

  return (
    <Modal
      className={classes.modal}
      open={props.open}
      onClose={props.onCloseClickListener}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open} style={{ width: "50vw" }}>
        <div className={classes.paper}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography>{props.title}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <IconButton
                style={{ float: "right" }}
                onClick={props.onCloseClickListener}
                color="primary"
              >
                <CancelRoundedIcon />
              </IconButton>
            </Grid>
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
                    {props.roles.slice(0, limit).map((role) => (
                      <TableRow
                        hover
                        key={role.id}
                        //   selected={selectedBranchIds.indexOf(branch.id) !== -1}
                      >
                        <TableCell>{role.role}</TableCell>
                        <TableCell>
                          <Grid container>
                            
                              {role.permissions.map((permission) => {
                                return (
                                  <Grid item>
                                  <Typography
                                    color="white"
                                    style={{
                                      backgroundColor: "red",
                                      borderRadius: 15,
                                      paddingTop: 4,
                                      paddingBottom: 4,
                                      paddingLeft: 8,
                                      paddingRight: 8,
                                      margin: 4,
                                    }}
                                  >
                                    {permission}
                                  </Typography>
                                  </Grid>
                                );
                              })}
                          </Grid>
                        </TableCell>
                        <TableCell>
                          <Grid container>
                            <Grid>
                              <IconButton
                                style={{ float: "right" }}
                                onClick={() => {}}
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
              count={props.roles.length}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

TransitionsModal.propTypes = {
  title: PropTypes.string,
  closeButtonText: PropTypes.string,
  open: PropTypes.bool,
  onCloseClickListener: PropTypes.func,
  onChangeText: PropTypes.func,
  roles: PropTypes.array,
};

export default TransitionsModal;
