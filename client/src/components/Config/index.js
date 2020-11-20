import React, { useState } from "react";
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { SettingsApplications, GolfCourse } from "@material-ui/icons";

import NavigationBar from "../Util/NavBar";
import UserConfig from "./UserConfig";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  navTapStyle: {
    background: "#003366",
    color: "#FFCC00",
  },
}));

const Config = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <NavigationBar />
      <div className={classes.root}>
        <AppBar position="static" className={classes.navTapStyle}>
          <Tabs value={value} onChange={handleChange} aria-label="">
            <Tab
              label="Configuracion de Usuarios"
              icon={<SettingsApplications />}
              {...a11yProps(0)}
            />
            <Tab label="Otros" icon={<GolfCourse/>} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {UserConfig}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>Otras configuraciones</div>
        </TabPanel>
      </div>
    </div>
  );
};

export default Config;
