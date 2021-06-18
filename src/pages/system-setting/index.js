import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Paper,
} from "@material-ui/core";
import TabPanel from "./TabPanel";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CompanySetting from './CompanySetting';
import PusherSetting from './PusherSetting';
import EmailSetting from "./EmailSetting";

const settings = [
  "Site Setting",
  "Company Setting",
  "System Setting",
  "Email Setting",
  "Pusher Setting",
  "Email Notification Setting",
  "Ip Restrict Setting",
];

const SystemSetting = (props) => {
  const [value, setValue] = React.useState(0);
  const [settingType, setSettingType] = React.useState(settings[0]);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
      console.log('---newValue--', newValue);
    setValue(newValue);
  };

  React.useEffect(()=> {
      setSettingType(settings[value]);
  },[value]);

  return (
    <React.Fragment>
      <Helmet>Training List</Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Box p={3}>
          <Typography>Settings</Typography>
        </Box>
        <Box m={2} borderRadius={4}>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollButtons="auto"
              indicatorColor="primary"
              variant="scrollable"
            >
              {settings.map(setting => <Tab label={setting} />)}
            </Tabs>
          </Paper>
        </Box>
        <Box p={3}>
          <Typography>{settingType}</Typography>
        </Box>
        <Box px={3}>
        <Paper>
          <Box>
            <TabPanel value={value} index={0} dir={theme.direction}>
              Item One
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <CompanySetting />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
              <EmailSetting/>
            </TabPanel>
            <TabPanel value={value} index={4} dir={theme.direction}>
              <PusherSetting />
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={6} dir={theme.direction}>
              Item Three
            </TabPanel>
          </Box>
        </Paper>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SystemSetting;
