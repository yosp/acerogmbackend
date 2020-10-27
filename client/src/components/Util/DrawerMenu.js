import React, { useContext, useEffect } from "react";
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
import { Note, 
          NextWeek, 
          AccountCircle, 
          PowerSettingsNew, 
          AccessTime, 
          SaveAlt,
          Dashboard,
          NotificationsActive,
          LocalShipping } from "@material-ui/icons";
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

    useEffect(()=>{
      
    },[])

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
                      Codigo: {user.CodigoEmp}
                  </Grid>
                  <Grid item>
                      Nombre: {user.Nombres}
                  </Grid>
              </Grid>
          </Grid>
          <List>
              <Link to='/dashboard' className={classes.linkStyle}>
            <ListItem button>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
      </List>
      <Divider /> 
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
      <list>
        <Link to='/recepcion' className={classes.linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <SaveAlt/>
            </ListItemIcon>
            <ListItemText primary="Recepcion"/>
          </ListItem>
        </Link>
      </list>
      <Divider/>
      <List>
              <Link to="/chatarra" className={classes.linkStyle}> 
            <ListItem button>
              <ListItemIcon>
                <LocalShipping />
              </ListItemIcon>
              <ListItemText primary="Chatarra" />
            </ListItem>
        </Link>
          </List>
      <Divider />
      <List>
              <Link to="/demora" className={classes.linkStyle}> 
            <ListItem button>
              <ListItemIcon>
                <AccessTime />
              </ListItemIcon>
              <ListItemText primary="Demora" />
            </ListItem>
        </Link>
          </List>
      <Divider />
      <List>
              <Link to="/notif" className={classes.linkStyle}> 
            <ListItem button>
              <ListItemIcon>
                <NotificationsActive />
              </ListItemIcon>
              <ListItemText primary="Notificaciones" />
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
