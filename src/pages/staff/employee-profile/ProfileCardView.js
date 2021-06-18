import React from "react";
import { Card, Typography, Grid, Button, Avatar, Box } from "@material-ui/core";
import PropTypes from 'prop-types';

const ProfileCardView = (props) => {
    const {name, designation, empId} = props.profile;
  return (
    <Card>
      <Grid container flexDirection="column" alignItems="center" p={3}>
        <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?img=36" />
        <Box my={1}>
          <Typography>{name}</Typography>
        </Box>
        <Box my={1} px={3} style={{backgroundColor: 'blue', borderRadius: 12}}>
          <Typography color="white">{designation}</Typography>
        </Box>
        <Box my={1}>
          <Button variant="outlined">{empId}</Button>
        </Box>
      </Grid>
    </Card>
  );
};

ProfileCardView.propTypes = {
    profile: PropTypes.object,
}

export default ProfileCardView;
