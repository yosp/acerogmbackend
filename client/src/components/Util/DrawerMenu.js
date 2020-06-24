import React, { useContext } from "react";
import {
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Drawer
} from "@material-ui/core";
import { Note, NextWeek, AccountCircle, PowerSettingsNew } from "@material-ui/icons";
import { GlobalContex } from '../../context/GlobalState'

import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
    },
    linkStyle: {
        color: "inherit",
        textDecoration: "none"
    },
    userPanel: {
        height: "8rem",
        background: '#003366',
        color: '#FFCC00'
    },
    userSection: {
        margin: "0 .5em",

    },
    BtnLogout: {
        background: "red",
        color: "white",
        margin: "0 .5em",
        '&:hover': {
            background: "lightred"
        }
    },
});

const DrawerMenu = ({ draw, onToggle }) => {
    const classes = useStyles();
    const AceroContext = useContext(GlobalContex)
    const { user, LogoutUser } = AceroContext

    const onHandlerLogout = (e) => {
        e.preventDefault()
        LogoutUser()
    }

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={onToggle(false)}
      onKeyDown={onToggle(false)}
      >
          <Grid container direction="row" justify="center" alignItems="center" spacing={2} className={classes.userPanel}>
              <Grid item>
                  <AccountCircle/>
              </Grid>
              <Grid container direction="column" spacing={1} className={classes.userSection}>
                  <Grid item>
                      Codigo: {user.codigoEmp}
                  </Grid>
                  <Grid item>
                      Nombre: {user.nombres}
                  </Grid>
              </Grid>
          </Grid>
          <List>
              <Link to='/registro' className={classes.linkStyle}>
            <ListItem button>
              <ListItemIcon>
                <Note />
              </ListItemIcon>
              <ListItemText primary="Registro" />
            </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
              <Link to="/chatarra" className={classes.linkStyle}> 
            <ListItem button>
              <ListItemIcon>
                <NextWeek />
              </ListItemIcon>
              <ListItemText primary="chatarra" />
            </ListItem>
        </Link>
          </List>
      <Divider />
      <List>
              <Link to="/ordenprod" className={classes.linkStyle}> 
            <ListItem button>
              <ListItemIcon>
                <NextWeek />
              </ListItemIcon>
              <ListItemText primary="Ordenes de Produccion" />
            </ListItem>
        </Link>
          </List>
          <Grid container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}>
            <Grid item>
                  
                <Button
                    variant="contained"
                    onClick={onHandlerLogout}
                    className={classes.BtnLogout}
                    startIcon={<PowerSettingsNew />}
                >
                    Logout
                </Button>
            </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Drawer
        open={draw}
        onClose={onToggle(false)}
      >
        {sideList("left")}
      </Drawer>
    </div>
  );
};

export default DrawerMenu;
