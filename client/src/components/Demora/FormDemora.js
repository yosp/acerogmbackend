import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  makeStyles,
  InputLabel,
  TextField,
  Select,
  Paper,
  Button
} from "@material-ui/core";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContex } from '../../context/GlobalState'
import { getGatillos, updDemoras } from '../../context/Api'

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
    width: "40em"
  },
  grupoContainer: {
    margin: "1em 0"
  },
  PaperStyle: {
    padding: "1em"
  },
  InputTextStyle: {
    width: "17em",
    margin: "0.5em 0"
  },
  SelectStyle: {
    width: "17em",
    margin: "0.5em 0"
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

const FormDemora = () => {
    const classes = useStyle();
    const [gatillos, setGatillos] = useState([])
    const AceroContext = useContext(GlobalContex)
    const { ActiveDemora, setToggleDemora, setActiveDemora} = AceroContext

    const handlerSubmit = (e) => {
      e.preventDefault()
      const { STrig, SRtf, TComment } = e.target
      updDemoras({Id: parseInt(ActiveDemora), gatillo: parseInt(STrig.value), Estado: parseInt(SRtf.value), comentario: TComment.value}, (err, data) => {
        if(err) {

        } else {
          setToggleDemora(false)
          setActiveDemora(null)
        }
      })
      
    }

    const handlerCancel = (e) => {
      e.preventDefault()
      setToggleDemora(false)
      setActiveDemora(null)
    }
    useEffect(()=> {  
      getGatillos((err, data) => {
        if(err) {

        } else {
          setGatillos(data)
        }
      })
    },[])


    return (
        <>
          <Grid
            container
            spacing={1}
            justify="center"
            alignItems="center"
            direction="column"
            wrap="nowrap"
            className={classes.GridMain}
          >
            <Paper elevation={3} className={classes.PtContainer}>
              <form onSubmit={handlerSubmit} className={classes.formStyle}>
                <Grid item>
                  <InputLabel id="Trig">Gatillo</InputLabel>
                      <Select
                        name="STrig"
                        native
                        label="Gatillo"
                        className={classes.SelectStyle}
                      >
                        {gatillos.map(g => {
                          return (
                            <option
                              key={g.Id}
                              value={g.Id}
                            >
                              {g.Descripcion}
                            </option>
                          );
                        }) }
                      </Select>
                </Grid>
                <Grid item>
                  <InputLabel id="Rtf">Realizar TF</InputLabel>
                      <Select
                        name="SRtf"
                        native
                        label="Realizar TF"
                        className={classes.SelectStyle}
                      >
                        <option value="0">No</option>
                        <option value="1">Si</option>
                      </Select>
                </Grid>
                <Grid item >
                    <TextField
                      name="TComment"
                      label="Comentario demora"
                      multiline
                      rows={4}
                      className={classes.InputTextStyle}
                      variant="outlined"
                    />    
                </Grid>
                <Grid className={classes.ButtonSection}>
                  <Button type="submit" className={classes.btnB}>
                    Aceptar
                  </Button>
                  <Button type="reset" onClick={handlerCancel} className={classes.btnY}>
                    Cancelar
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>  
          <ToastContainer/>
        </>
    )
}

export default FormDemora
