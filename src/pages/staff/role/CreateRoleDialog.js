import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useFormik } from "formik";
import axios from "axios";
import modules from "./modules";
import ModuleFormControl from "./ModuleFormControl";

const arr = [];

for (let i = 0; i < 70; i++) {
  arr.push(i);
}

const CreateRoleDialog = ({
  open,
  onCloseClickListener,
  role = null,
  onCreateRoleSuccessListener,
}) => {
  console.log(open);
  /**
   * Module Action States
   */
  const [roleModules, setRoleModules] = React.useState([]);
  const [allModules, setAllModules] = React.useState([]);

  React.useEffect(()=>{
    // Get All Modules
     const endpoint = "/modules";
      axios
        .get(endpoint)
        .then((res) => {
          console.log("----getModules Response", res);
          setAllModules(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  },[]);

  const formik = useFormik({
    initialValues: {
      roleType: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.roleType) {
        errors.roleError = "required";
      }

      console.log(errors);
      return errors;
    },
    onSubmit: (values) => {
      console.log("--values, moduleUser--", values);
      const endpoint = "/create-role";
      axios
        .put(endpoint, values)
        .then((res) => {
          console.log("res", res);
          onCreateRoleSuccessListener(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validateOnChange: true,
  });

  // React.useEffect();
  const updateRoleModules = (module) => {

  }

  const _onCloseClickListener = () => {
    if (formik.errors.roleError) {
      formik.errors.roleError = null;
    }
    onCloseClickListener();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        style={{ minWidth: 800 }}
        fullWidth
        maxWidth="md"
      >
        <form onSubmit={formik.handleSubmit}>
          <Box py={2} px={4} alignItems="center">
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>Create New Role</Typography>
              <IconButton onClick={_onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={12}>
                <TextField
                  label="Enter Role Name"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.roleError}
                  error={formik.errors.roleError}
                  onChange={formik.handleChange}
                  name="roleType"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography style={{ marginBottom: 20 }}>
                  Assign Permissions to Role
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12} md={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Typography variant="h5">Module</Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h5">Permissions</Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {allModules && allModules.map((m) => (
                      <Grid container spacing={3} alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={4}>
                          <Typography>{m.moduleName}</Typography>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <ModuleFormControl controls={m.operations} controlState={""} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Divider />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained">
                  CREATE
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateRoleDialog;
