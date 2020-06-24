import React from "react";
import {
  AppBar,
  Box,
  Tabs,
  Tab,
  Typography,
  makeStyles
} from "@material-ui/core";

import DataProduccion from './DatosProduccion'
import DatosParada from './DatosParada'

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
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  navTapStyle: {
    background: '#003366',
    color: "#FFCC00"
  }
}));

function DataPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navTapStyle}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label=""
        >
          <Tab label="Datos Producción" {...a11yProps(0)} />
          <Tab label="Paradas" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {DataProduccion}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {DatosParada}
      </TabPanel>
    </div>
  );
}

export default DataPanel;
