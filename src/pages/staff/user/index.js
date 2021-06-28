import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Box, Container, Grid } from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Header from "src/common/header";
import UserCardView from "./UserCardView";
import TransitionsModal from "./CreateUserModal";

const User = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [userToEdit, setUserToEdit] = React.useState(null);

  const onClickListener = () => {
    setShowModal(!showModal);
  };

  const onCreateUserSuccessListener = (user) => {
    setShowModal(false);
    getUsers();
  };

  const onClickActionListener = (option, user) => {
    console.log("--option.option---", option, user);
    if (option === "Edit") {
      setUserToEdit(user);
      setShowModal(true);
    } else if (option === "Delete") {
      const endpoint = "https://api.driftacademy.in/delete-user/"+ user._id;
    axios
      .delete(endpoint)
      .then((res) => {
        // console.log("----getRoles Response", res);
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  React.useEffect(() => {
    getRoles();
    getUsers();
  }, []);

  const getRoles = () => {
    const endpoint = "https://api.driftacademy.in/roles";
    axios
      .get(endpoint)
      .then((res) => {
        // console.log("----getRoles Response", res);
        setRoles(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUsers = () => {
    const endpoint = "https://api.driftacademy.in/users";
    axios
      .get(endpoint)
      .then((res) => {
        setUsers(res?.data);
        console.log("--res.data---", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Helmet>Users</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Header
            title="Manage Users"
            buttonText="Create"
            onClickListener={onClickListener}
            showActionButton
          />
          <PerfectScrollbar>
            <Grid container spacing={2} mt={3}>
              {users &&
                users.map((user) => {
                  return (
                    <Grid item xs={12} md={3}>
                      <UserCardView
                        user={user}
                        onClickActionListener={onClickActionListener}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          </PerfectScrollbar>
        </Container>
      </Box>
      <TransitionsModal
        open={showModal}
        onCloseClickListener={onClickListener}
        title="Create New User"
        closeButtonText="Close"
        roles={roles}
        onCreateUserSuccessListener={onCreateUserSuccessListener}
        user={userToEdit}
      />
    </React.Fragment>
  );
};

export default User;
