import React from "react";
import {
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  linkStyle: {
    color: "inherit",
    textDecoration: "none",
  },
  userPanel: {
    height: "8rem",
    background: "#003366",
    color: "#FFCC00",
  },
  userSection: {
    margin: "0 .5em",
  },
  BtnLogout: {
    background: "red",
    color: "white",
    margin: "0 .5em",
    "&:hover": {
      background: "lightred",
    },
  },
});

const DrawItem = ({ToLink, TextToShow, Icon}) => {
  const classes = useStyles();

  return (
    <>
    <List>
      <Link to={ToLink} className={classes.linkStyle}>
        <ListItem button>
          <ListItemIcon>
            <Icon/>
          </ListItemIcon>
          <ListItemText primary={TextToShow} />
        </ListItem>
      </Link>
    </List>
    <Divider /> 
    </>
  );
};

export default DrawItem;
