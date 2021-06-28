import React from "react";
import { Paper, Box, Grid, Typography, Button } from "@material-ui/core";

const TicketReply = (props) => {
  const onEditTicketClickListener = () => {};

  return (
      <Grid
        container
        spacing={3}
        style={{ display: "flex", width: "100%" }}
        m={2}
      >
        <Grid
          item
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Ticket Reply</Typography>
          <Button variant="contained" onClick={onEditTicketClickListener}>
            Edit
          </Button>
        </Grid>
      </Grid>
  );
};

export default TicketReply;
