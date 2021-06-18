import React from "react";
import modules from "./modules";
import { Grid, Typography, Divider } from "@material-ui/core";
import ModuleFormControl from "./ModuleFormControl";

const ModuleForm = (props) => {
  const {} = props;
  return (
    <div>
      {modules.map((module) => {
        return (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={4}>
              <Typography>{module.module}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <ModuleFormControl controls={module.permissions} />
            </Grid>
            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default ModuleForm;
