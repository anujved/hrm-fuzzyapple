import React from "react";
import {
  Grid,
  Divider,
  IconButton,
  Typography,
  Tooltip,
} from "@material-ui/core";
import PropTypes from "prop-types";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";

const CardHeader = (props) => {
  const { title, onClickListener } = props;

  return (
    <React.Fragment>
      <Grid container alignItems="center" justifyContent="space-between" px={2}>
        <Grid item>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item>
          <Tooltip title={`Create ${title}`} placement="top" arrow>
            <IconButton onClick={onClickListener}>
              <AddCircleRoundedIcon style={{ color: "blue" }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider />
    </React.Fragment>
  );
};

CardHeader.propTypes = {
  title: PropTypes.string,
  onClickListener: PropTypes.func,
};

export default CardHeader;
