import React from "react";
import { Card, Typography, Grid, Button, Avatar, Box, Menu, MenuItem, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const options = [
  'Edit',
  'Delete',
];

const ITEM_HEIGHT = 48;

const UserCardView = (props) => {
    const {name, email, role} = props.user;
    const {onClickActionListener} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (option) => {
      // console.log('--option.option---', option);
      setAnchorEl(null);
      onClickActionListener && onClickActionListener(option, props.user);
    };

  return (
    <Card>
      <Grid container flexDirection="column" alignItems="center" p={3}>
        <Box alignSelf="flex-end">
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
        <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?img=36" />
        <Box my={1}>
          <Typography>{name}</Typography>
        </Box>
        <Box my={1} px={3} style={{backgroundColor: 'blue', borderRadius: 12}}>
          <Typography color="white">{role}</Typography>
        </Box>
        <Box my={1}>
          <Button variant="outlined">{email}</Button>
        </Box>
      </Grid>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={() => {handleClose(option)}}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Card>
  );
};

UserCardView.propTypes = {
    user: PropTypes.object,
    onClickActionListener: PropTypes.func,
}

export default UserCardView;
