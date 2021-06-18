import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";
import { useFormik } from "formik";

const ConstantDialog = ({
  open,
  onCloseClickListener,
  header,
  isEditMode,
  value,
  isLeaveType = false,
  daysValue = null,
  onSubmitClickListener,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      daysPerYear: "",
    },
    validate: (values) => {
      const error = {};
      if (values.name.length === 0) {
        error.nameError = "required";
      }
      if (isLeaveType && values.daysPerYear.length === 0) {
        error.daysError = "required";
      }
      return error;
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      if (!isLeaveType) {
        delete values.daysPerYear;
      }
      onSubmitClickListener(values);
    },
    validateOnChange: true,
  });

  return (
    <div>
      <Dialog open={open} onClose={onCloseClickListener} fullWidth="lg">
        <Box py={2} px={4}>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <Grid container justifyContent="space-between" alignItems="center">
              <Typography>
                {isEditMode ? `UPDATE ${header}` : `CREATE ${header}`}
              </Typography>
              <IconButton onClick={onCloseClickListener}>
                <CancelIcon />
              </IconButton>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={value}
                  helperText={formik.errors.nameError}
                  error={formik.errors.nameError && true}
                  onChange={formik.handleChange}
                  name="name"
                />
              </Grid>
              {isLeaveType && (
                <Grid item xs={12} md={12}>
                  <TextField
                    label="Days per Year"
                    variant="outlined"
                    fullWidth
                    value={daysValue}
                    helperText={formik.errors.daysError}
                    error={formik.errors.daysError && true}
                    onChange={formik.handleChange}
                    name="daysPerYear"
                  />
                </Grid>
              )}
              <Grid item xs={12} md={12}>
                <Button type="submit" variant="contained">
                  {isEditMode ? `UPDATE` : `CREATE`}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
    </div>
  );
};

ConstantDialog.defaultPropTypes = {
  isEditMode: false,
  value: null,
  isLeaveType: false,
};

ConstantDialog.propTypes = {
  header: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onCloseClickListener: PropTypes.func.isRequired,
  value: PropTypes.string,
  isLeaveType: PropTypes.bool,
  daysValue: PropTypes.any,
};

export default ConstantDialog;
