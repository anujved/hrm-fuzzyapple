import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Divider
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { KeyboardDatePicker } from "@material-ui/pickers";

const leaveTypes = [
  { id: 1, option: "Casual Leave" },
  { id: 2, option: "Medical Leave" },
];

const LeaveActionModal = ({ open, onCloseClickListener, data }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onCloseClickListener}
        aria-labelledby="form-dialog-title"
      >
        <Box py={2} px={4}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography>Leave Action</Typography>
            <IconButton onClick={onCloseClickListener}>
              <CancelIcon />
            </IconButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} justifyContent="space-between">
              <Grid container spacing={2} paddingTop={3}>
                <Grid item xs={12} md={6}>
                  <Typography style={{ width: 400 }}>Employee</Typography>
                </Grid>
                <Grid item borderBottom={1} style={{borderBottomColor: '#EFF2F6'}} xs={12} md={6}>
                  <Typography>{data?.name}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography style={{ width: 400 }}>Leave Type</Typography>
                </Grid>
                <Grid item borderBottom={1} style={{borderBottomColor: '#EFF2F6'}} xs={12} md={6}>
                  <Typography>{data?.leaveType}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography style={{ width: 400 }}>Applied On</Typography>
                </Grid>
                <Grid item borderBottom={1} style={{borderBottomColor: '#EFF2F6'}} xs={12} md={6}>
                  <Typography>{data?.appliedOn}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography style={{ width: 400 }}>Start Date</Typography>
                </Grid>
                <Grid item borderBottom={1} style={{borderBottomColor: '#EFF2F6'}} xs={12} md={6}>
                  <Typography>{data?.startDate}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography style={{ width: 400 }}>End Date</Typography>
                </Grid>
                <Grid item borderBottom={1} style={{borderBottomColor: '#EFF2F6'}} xs={12} md={6}>
                  <Typography>{data?.endDate}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography style={{ width: 400 }}>Leave Reason</Typography>
                </Grid>
                <Grid item borderBottom={1} style={{borderBottomColor: '#EFF2F6'}} xs={12} md={6}>
                  <Typography>{data?.leaveReason}</Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography style={{ width: 400 }}>Status</Typography>
                </Grid>
                <Grid item borderBottom={1} style={{borderBottomColor: '#EFF2F6'}} xs={12} md={6}>
                  <Typography>{data?.status}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                style={{
                  marginRight: 10,
                  backgroundColor: "#35B37E",
                  color: "#FFFFFF",
                }}
              >
                Approval
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#FF5630", color: "#FFFFFF" }}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
};

export default LeaveActionModal;
