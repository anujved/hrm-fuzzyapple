import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const Header = (props) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={12} md={6}>
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        {props.showActionButton && <Button
          style={{ float: "right" }}
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={props.onClickListener}
        >
          {props.buttonText}
        </Button>}
      </Grid>
    </Grid>
  );
};

Header.defaultProps = {
  showActionButton: true,
}

Header.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onClickListener: PropTypes.func,
  showActionButton: PropTypes.bool,
};

export default Header;
