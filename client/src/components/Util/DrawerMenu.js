import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Button,
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
          LocalShipping, 
          Chat} from "@material-ui/icons";
import { GlobalContex } from '../../context/GlobalState'

import { Link } from 'react-router-dom'
import DrawItem from './DrawItem'


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
    const { user, LogoutUser, userRol } = AceroContext
    const [Produccion, SetProduccion] = useState()
    const [Recepcion, SetRecepcion] = useState()
    const [Chatarra, SetChatarra] = useState()
    const [Demora, SetDemora] = useState()
    const [Ordenes, SetOrdenes] = useState()
    const [Notif, SetNotif] = useState()

    const onHandlerLogout = (e) => {
        e.preventDefault()
        LogoutUser()
    }

    let regProduccion
    let regChatarra
    let regRecepcion
    let regDemora
    let regNotif
    let regOrden

    if(Produccion != null || Produccion != undefined ) {
      if( Produccion.length > 0) {
        regProduccion =  <DrawItem ToLink="/registro" TextToShow="Registro" Icon={Note}/>
      }
      else {
        regProduccion = null  
      }
    } else {
      regProduccion = null
    }

    if(Recepcion != null || Recepcion != undefined ) {
      if(Recepcion.length > 0) {
        regRecepcion = <DrawItem ToLink="/recepcion" TextToShow="Recepcion" Icon={SaveAlt}/>
      } else {
        regRecepcion = null
      }
      
    } else {
      regRecepcion = null
    }

    if(Chatarra != null || Chatarra != undefined) {
      if(Chatarra.length > 0) {
        regChatarra = <DrawItem ToLink="/chatarra" TextToShow="Chatarra" Icon={LocalShipping}/>
      }
      else {
        regChatarra = null
      }
    } else {
      regChatarra = null
    }

    if(Demora != null || Demora != undefined) {
      if(Demora.length > 0) {
        regDemora = <DrawItem ToLink="/demora" TextToShow="Demora" Icon={AccessTime}/>
      }
      else {
        regChatarra = null
      }
    } else {
      regDemora = null
    }

    
    if(Notif != null || Notif != undefined) {
      if(Notif.length > 0) {
        regNotif = <DrawItem ToLink="/notif" TextToShow="Notificaciones" Icon={NotificationsActive}/>
      }
      else {
        regNotif = null
      }
    } else {
      regNotif = null
    }

    if(Ordenes != null || Ordenes != undefined) {
      if(Ordenes.length > 0) {
        regOrden = <DrawItem ToLink="/ordenprod" TextToShow="Ordenes de Produccion" Icon={NextWeek}/>
      }
      else {
        regOrden = null
      }
    } else {
      regOrden = null
    }

    useEffect(()=>{
      if(userRol != null) {
        let prod = userRol.filter(r => {return r.IdRol === 1})
        let rec = userRol.filter(r => {return r.IdRol === 2})
        let chat = userRol.filter(r => {return r.IdRol === 3})
        let dem = userRol.filter(r => {return r.IdRol === 4})
        let notif = userRol.filter(r => {return r.IdRol === 5})
        let ord = userRol.filter(r => {return r.IdRol === 6})
        SetProduccion(prod)
        SetRecepcion(rec)
        SetChatarra(chat)
        SetDemora(dem)
        SetNotif(notif)
        SetOrdenes(ord)
      }
    },[userRol])

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
      <DrawItem ToLink="/dashboard" TextToShow="Dashboard" Icon={Dashboard}/>
      {regProduccion}
      {regRecepcion}
      {regChatarra}
      {regDemora}
      {regNotif}
      {regOrden}
      <br/>
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
              startIcon={<PowerSettingsNew />}>
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
