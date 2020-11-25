import React, { useContext, useEffect } from 'react'

import {
    Grid,
    makeStyles,
    Paper,
    Button
} from "@material-ui/core";
import {
  ArrowBackIosRounded
} from '@material-ui/icons'
import moment from 'moment'
import { GlobalContex } from '../../context/GlobalState'


const useStyle = makeStyles(theme => ({

  formControl: {
    minWidth: 120
  },
  formStyle: {
    padding: "1em 0",
    margin: "1em 0"
  },
  GridMain: {
    margin: "2.5em",
    paddin: "1em"
  },
  PtContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "1px solid lightgray",
    margin: "2em 1em",
    padding: ".5em .2em",
    width: "30em"
  },
  grupoContainer: {
    margin: "1em 0"
  },
  PaperStyle: {
    padding: "1em"
  },
  SelectStyle: {
    width: "12em"
  },
  DatePick: {
    margin: ".8em 0",
    width: "12em"
  },
  ButtonSection: {
    margin: ".5em 0 0 -.5em"
  },
  btnB: {
    background: "#003366",
    color: "white",
    margin: "0 .5em",
    '&:hover':{
      background: "#015CB7"
    }
  },
  
  btnY: {
    background: "#FFCC00",
    color: "#003366",
    margin: "0 .5em",
    '&:hover':{
      background: "#FFE166"
    }
  }
}));

const HeaderInfo = () => {
  const classes = useStyle();
  const aceroContex = useContext(GlobalContex)
  const { RecepcionHeader, resetReception } = aceroContex

  const handlerBack = (e) => {
    e.preventDefault()
    resetReception()
}

    return (
        <>
          <Paper elevation={3} className={classes.PtContainer}>
            <Grid
              spacing={3}
              container
              justify="flex-start"
              alignContent="space-between"
              wrap="wrap"
              direction="row"
              >
              <Grid item>
                  <div><Button onClick={handlerBack}><ArrowBackIosRounded/></Button></div>
                  <div><b>Fecha:</b> {moment(RecepcionHeader.Fecha).format('L')}</div>
                  <div><b>Turno:</b> {RecepcionHeader.turno}</div>
                  <div><b>Operador:</b> {RecepcionHeader.operador}</div>   
              </Grid>
            </Grid>
          </Paper>
        </>
    )
}

export default HeaderInfo
