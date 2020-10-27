import React from 'react'

import {
    Grid,
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    Paper,
    TextField,
    Button
} from "@material-ui/core";

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
    return (
        <>
            <Grid
              container
              spacing={1}
              justify="center"
              alignItems="center"
              direction="row"
              wrap="nowrap"
              className={classes.GridMain}>
                <Paper elevation={3} className={classes.PtContainer}>
                  <Grid spacing={3}>
                    <Grid item>
                      <b>Fecha</b>
                    </Grid>
                    <Grid item>
                      <b>Turno</b>
                    </Grid>
                    <Grid item>
                  <b>Operador</b>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
        </>
    )
}

export default HeaderInfo
