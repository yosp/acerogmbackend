import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import DrawerMenu from "./DrawerMenu";

//import logo from "../../assets/logo.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: '#ffcc00',
    color: '#003366'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  logoStyles: { 
    width: '11em',
    height: '2em',
    marginRight: '.5em',
    marginLeft: '-1.5em'
  }
}));
const NavBar = () => {
  const classes = useStyles();
  const [draw, setDraw] = useState(false);
  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (open === undefined) {
      setDraw(true);
    } else {
      setDraw(open);
    }
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer()}
        >
          <MenuIcon />
        </IconButton>
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" className={classes.logoStyles} />
        <Typography variant="h6" className={classes.title}>
          AceroGm
        </Typography>
      </Toolbar>
      <DrawerMenu draw={draw} onToggle={toggleDrawer} />
    </AppBar>
  );
};

export default NavBar;
