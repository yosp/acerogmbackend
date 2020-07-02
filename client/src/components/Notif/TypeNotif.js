import React, { useContext, useEffect } from 'react'
import {
  Paper,
  makeStyles,

} from "@material-ui/core";
import { GlobalContex } from '../../context/GlobalState' 


const useStyles = makeStyles((theme) => ({
  PaperSite: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: "2rem",
    margin: "2rem",
    height: "4rem",
    [theme.breakpoints.down("xs")]: {
      overflow: "scroll",
    },
    [theme.breakpoints.down("sm")]: {
      overflow: "scroll",
    },
    [theme.breakpoints.up("md")]: {
      overflow: "hiden",
    },
    [theme.breakpoints.up("lg")]: {
      overflow: "hiden",
    },
    [theme.breakpoints.up("xl")]: {
      overflow: "hiden",
    },
  },
  DatePick: {},
  formStyle: {
    padding: "1em 0",
    margin: "1em 0",
  },
  SelectStyle: {
    width: "12em",
  },
  GridContainer: {},
  GridSections: {
    padding: "2rem",
    margin: "2rem",
  },
  GridSideTable: {},
  dividerStyle: {
    margin: ".3rem",
  },

  ButtonSection: {
    bottom: "0",
    left: "39rem",
  },
  btnB: {
    background: "red",
    color: "white",
    margin: "0 .5em",
    marginBottom: "-5rm",
    "&:hover": {
      color: "black",
      background: " #ffcccb",
    },
  },
  buttonSearch: {
    marginTop: "0.2rem",
  },
}));

const TypeNotif = () => {
    const classes = useStyles();
    const AceroContex = useContext(GlobalContex);
    const { ActiveTypeNotif } = AceroContex;
    let pnotif = <></>

    if(ActiveTypeNotif === "1") {
      pnotif = <Paper elevation={4} className={classes.PaperSite}>
        <h3>Notificacion CO11N</h3>
      </Paper>
    } else if (ActiveTypeNotif === "2") {
      pnotif = <Paper elevation={4} className={classes.PaperSite}>
        <h3>Notificacion MFBF</h3>
      </Paper>
    } else {
      pnotif = <Paper elevation={4} className={classes.PaperSite}>
      </Paper>
    }

    return (
        <>
          {pnotif}
        </>
    )
}

export default TypeNotif
