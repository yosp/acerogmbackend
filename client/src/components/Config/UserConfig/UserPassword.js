import React, { useState, useContext } from "react";
import {
  Grid,
  makeStyles,
  Paper,
  InputLabel,
  Button,
  TextField,
} from "@material-ui/core";

import { GlobalContex } from "../../../context/GlobalState";

import { CheckCircle, Cancel } from "@material-ui/icons";

import { SearchUser, addNewUser } from "../../../context/Api"

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
  CheckGreen: {
    color: "green"
  },
  CrossRed: {
    color: "red"
  },
  LabelPassword: {
    color: "green",
    margin: ".5rem 0",
    width: "15rem",
  },
  LabelPasswordError: {
    color: "red",
    margin: ".5rem 0",
    width: "15rem",
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
  },
  InputTextStyle: {
    margin: ".5rem 0",
    width: "15rem",
  }
}));

const UserPassword = () => {
  const classes = useStyle();
  const [Passw, setPassw] = useState(null)
  const [Passw2, setPassw2] = useState(null)
  const aceroContext = useContext(GlobalContex);
  const { setToggleSapPass, ActiveConfUser, setUserSearch, setUserSearchSap } = aceroContext

  let ElLabel = null

  if(Passw != null && Passw2 != null) {
    console.log(Passw.length)
    if(Passw.length >= 5 && Passw2.length >= 5){
      if(Passw === Passw2) {
        ElLabel = <InputLabel className={classes.LabelPassword}><CheckCircle className={classes.CheckGreen}/></InputLabel>
      } else {
        ElLabel = <InputLabel className={classes.LabelPasswordError}><Cancel className={classes.CrossRed} /> La contraseña no coincide</InputLabel>
      }
    } else {
      ElLabel = <InputLabel className={classes.LabelPasswordError}><Cancel className={classes.CrossRed} /> La contraseña debe tener mas de 5 caracteres</InputLabel>
    }
    
  } else {
    ElLabel = null
  }

  const HandlerClose = (e) => {
    e.preventDefault();
    setPassw(null)
    setPassw2(null)
    setToggleSapPass(false)
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log("Entro")
    if(Passw === Passw2) {
      addNewUser({codigoEmp: ActiveConfUser, password: Passw}, (err, data) => {
        if(err) {

        }else {
          SearchUser(ActiveConfUser, (err, data) => {
            if(err) {

            } else {
              setUserSearch(data)
              setUserSearchSap(null)
              setToggleSapPass(false)
            }
          })
        }
      })
    } else {
      return 
    }
  }

  return (<Grid
              container
              spacing={1}
              justify="center"
              alignItems="center"
              direction="column"
              wrap="nowrap"
              className={classes.GridMain}>
            <Paper elevation={3} className={classes.PtContainer}>
              <form onSubmit={handlerSubmit} className={classes.formStyle}>
                <Grid item xs={10} sm={10} md={8} lg={6}>
                  <TextField
                          id="Password"
                          name="Password"
                          label="Contraseña"
                          type="Password"
                          value={Passw}
                          onChange={(e) => setPassw(e.target.value)}
                          className={classes.InputTextStyle}
                        />
                </Grid>
                <Grid item xs={10} sm={10} md={8} lg={6}>
                  <TextField
                          id="Password2"
                          name="Password2"
                          label="Repita Contraseña"
                          type="Password"
                          value={Passw2}
                          onChange={(e) => setPassw2(e.target.value)}
                          className={classes.InputTextStyle}
                          
                        />
                </Grid>
                <Grid item xs={10} sm={10} md={8} lg={6}>
                    {ElLabel}
                    <br/>
                </Grid>
                <Grid className={classes.ButtonSection}>
                  <Button
                    variant="contained"
                    className={classes.btnB}
                    type="submit"
                  >
                    Aceptar
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.btnY}
                    type="reset"
                    onClick={HandlerClose}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
  );
};

export default UserPassword;
