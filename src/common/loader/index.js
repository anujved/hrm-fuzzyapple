import React from "react";
import { CircularProgress, Box } from "@material-ui/core";
import PropTypes from "prop-types";

const Progress = (props) => {
  if (props.loading) {
    return (
      <Box
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <CircularProgress style={{ margin: "auto" }} />
      </Box>
    );
  }
  return null;
};

Progress.defaultProps = {
  loading: false,
};

Progress.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Progress;
