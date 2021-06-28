import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import CreateEventModal from "./CreateEvent";
import { Box, Button, Paper } from "@material-ui/core";

const Event = (props) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const onClickListener = () => {
    setOpenDialog(true);
  };

  const onDialogCloseClickListener = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box m={2}>
        <Button variant="contained" onClick={onClickListener}>
          New Event
        </Button>
      </Box>
      <Paper style={{padding: 5, margin: 5}}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: "event 1", start: "2021-06-29", end: "2021-06-29" },
            { title: "event 2", start: "2021-06-29", end: "2021-06-29" },
          ]}
        />
      </Paper>
      <CreateEventModal
        open={openDialog}
        onCloseClickListener={onDialogCloseClickListener}
      />
    </>
  );
};

export default Event;
