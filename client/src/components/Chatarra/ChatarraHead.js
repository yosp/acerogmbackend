import React, { useContext, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";
import { GlobalContex } from "../../context/GlobalState";
import { insChatarraHeader, getChatarraPos } from '../../context/Api'

const useStyle = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  formStyle: {
    padding: "1em 0",
    margin: "1em 0",
  },
  GridMain: {
    margin: "2.5em",
    paddin: "1em",
  },
  PtContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "1px solid lightgray",
    margin: "2em 1em",
    padding: ".5em .2em",
    width: "30em",
  },
  grupoContainer: {
    margin: "1em 0",
  },
  PaperStyle: {
    padding: "1em",
  },
  SelectStyle: {
    width: "12em",
  },
  InputTextStyle: {
    width: "12em",
    margin: "1em 0",
  },
  DatePick: {
    margin: ".8em 0",
    width: "12em",
  },
  ButtonSection: {
    margin: ".5em 0 0 -.5em",
  },
  btnB: {
    background: "#003366",
    color: "white",
    margin: "1rem .5em",
    "&:hover": {
      background: "#015CB7",
    },
  },

  btnY: {
    background: "#FFCC00",
    color: "#003366",
    margin: "1rem .5em",
    "&:hover": {
      background: "#FFE166",
    },
  },
}));

const ChatarraHead = () => {
  const classes = useStyle();
  const AceroContex = useContext(GlobalContex);
  const { SetChatarraPos, turnos, user, LoadChataraHeader } = AceroContex;
  const [TodayDate, setTodayDate] = React.useState(new Date());

  const handlerSubmit = (event) => {
    event.preventDefault();
    const {Fecha,Turno, UserC,  } = event.target.elements

    const data = {
      Fecha: Fecha.value,
      Turno: parseInt(Turno.value),
      Operador: parseInt(UserC.value),
      Estatus: 'A',
      UsrReg: user.CodigoEmp,
      RegDate: new Date()
    }
    insChatarraHeader(data, (err, data)=>{
      if(err){

      }else {
        LoadChataraHeader(data)
        getChatarraPos(data.Id,(err, data)=> {
            if(err) {

            } else {
              if(data.length>0){
                SetChatarraPos(data)
              }
            }
        })
      }
    })
  };

  const handleDateChange = (date) => {
    setTodayDate(date);
  };

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
        <h2>Chatarra</h2>
        <Paper elevation={3} className={classes.PtContainer}>
          <form onSubmit={handlerSubmit} className={classes.formStyle}>
            <Grid item xs={10} sm={10} md={8} lg={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    autoOk
                    name="Fecha"
                    variant="inline"
                    inputVariant="outlined"
                    label="Seleccione Fecha"
                    format="MM/DD/YYYY"
                    className={classes.DatePick}
                    value={TodayDate}
                    InputAdornmentProps={{ position: "end" }}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
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
                    {turnos.map((turno) => {
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
              <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    id="usr"
                    name="UserC"
                    label="Operador"
                    variant="outlined"
                    className={classes.InputTextStyle}
                  />
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
    </>
  );
};

export default ChatarraHead;
