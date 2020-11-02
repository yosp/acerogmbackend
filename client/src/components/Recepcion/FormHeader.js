import "moment";
import React, { useContext } from "react";
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

import {
  MuiPickersUtilsProvider,
  DatePicker 
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContex } from '../../context/GlobalState'
import { insRecepHeader, GetPosRecepcion } from '../../context/Api'

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

const FormHeader = () => {
  const classes = useStyle();
  const AceroContex = useContext(GlobalContex) 
  const { turnos, setReceptionHeader, user, setPosRecepcion, GrupoRecepcion } = AceroContex
  const [TodayDate, setTodayDate] = React.useState(new Date());
  const handlerSubmit = event => {
    event.preventDefault();
    const { TOperador, Turno, GrupoR } = event.target.elements

    const data = {
      Fecha: TodayDate,
      Operador: TOperador.value,
      StrEntrada: GrupoR.value,
      TurnoId: Turno.value,
      UsrReg: user.CodigoEmp
    }

    insRecepHeader(data, (err, resp) => {
      if(err) {
        toast.error("Error al intentar cargar los datos del header", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
      else {
        setReceptionHeader(resp)
        GetPosRecepcion(resp.Id, (err, res) => {
          if(err) {
            toast.error("Error al intentar cargar los datos de las recepciones", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          } else {
            setPosRecepcion(res)
          }
        })
      }
    })
  };

  const handleDateChange = date => {
    setTodayDate(date);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        direction="column"
        wrap="nowrap"
        className={classes.GridMain}
      >
        <Paper elevation={3} className={classes.PtContainer}>
          <form onSubmit={handlerSubmit} className={classes.formStyle}>
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker 
                  autoOk
                  name="Fecha"
                  variant="inline"
                  inputVariant="outlined"
                  label="Seleccione Fecha"
                  className={classes.DatePick}
                  value={TodayDate}
                  InputAdornmentProps={{ position: "end" }}
                  onChange={handleDateChange}
                  format='DD/MM/YYYY'
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="Lturno">Turnos</InputLabel>
                <Select
                  native
                  name="Turno"
                  label="Turnos"
                  id="Sturno"
                  className={classes.SelectStyle}
                >
                  {turnos.map(turno => {
                    return (
                      <option key={turno.id} value={turno.Id}>
                          {turno.Descripcion}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <FormControl
                  variant="outlined"
                  className={classes.grupoContainer}
                >
                <InputLabel id="SGrupoR">Grupo Recepción</InputLabel>
                <Select
                  native
                  label="Grupo Recepción"
                  name="GrupoR"
                  className={classes.SelectStyle}
                >
                  <option value="0"> </option>
                  {GrupoRecepcion.map((gr) => {
                    return (
                      <option key={gr.GrupoId} value={gr.GrupoId}>
                        {gr.Titulo}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>           
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <FormControl
                variant="outlined"
                className={classes.grupoContainer}
              >
                <TextField id="TOperador" label="Operador" variant="outlined" className={classes.SelectStyle} />
              </FormControl>
            </Grid>
            <Grid className={classes.ButtonSection}>
              <Button type="submit" className={classes.btnB}>
                Aceptar
              </Button>
              <Button type="reset" className={classes.btnY}>
                Cancelar
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default FormHeader;

