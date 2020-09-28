import "moment";
import React, { useContext } from "react";
import { useHistory } from 'react-router-dom'
import {
  Button,
  Grid,
  Paper,
  TextField,
  Select,
  makeStyles,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContex } from "../../context/GlobalState";
import { insChatarraPos } from "../../context/Api";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1)
  },
  LogoSize: {
    [theme.breakpoints.down("xs")]: {
      width: "11rem",
      heigth: "2rem",
    },
    [theme.breakpoints.down("sm")]: {
      width: "16.5rem",
      heigth: "3rem",
    },
    [theme.breakpoints.up("md")]: {
      width: "22rem",
      heigth: "4rem",
    },
    [theme.breakpoints.up("lg")]: {},
  },
  btnB: {
    background: "#003366",
    color: "white",
    margin: "0 .5em",
    "&:hover": {
      background: "#015CB7",
    },
  },
  btnY: {
    background: "#FFCC00",
    color: "#003366",
    margin: "0 .5em",
    "&:hover": {
      background: "#FFE166",
    },
  },
  SelectStyle: {
    margin: ".5rem 0",
    width: "15rem",
  },
  InputTextStyle: {
    margin: ".5rem 0",
    width: "15rem",
  },
}));

const ChatarraForm = () => {
  const classes = useStyle();
  const aceroContext = useContext(GlobalContex);
  const history = useHistory()
  const {
    userInfo,
    chatarraHeader,
    user,
    motivoChatara,
    tipoChatarra,
    SetChatarraPos,
  } = aceroContext;
  const puestos = userInfo.map((puesto) => {
    return {
      id: puesto.PuestoTrId,
      Descrit: puesto.PuestoTr,
      TypeNot: puesto.TipoNotif,
    };
  });

  const HandlerClose = (e) => {
    e.preventDefault();
    history.push("/chatarra")
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    
    const {
      puestotr,
      tipoChatarra,
      PesoEnt,
      PesoSal,
      motchatarra,
      Texto,
    } = e.target.elements;

    const data = {
      HeaderId: chatarraHeader.Id,
      PuestoTr: puestotr.value,
      PesoEntrada: PesoEnt.value,
      PesoSalida: PesoSal.value,
      PesoChatarra:parseInt(PesoSal.value) - parseInt(PesoEnt.value) ,
      TipoChatarra: tipoChatarra.value,
      MotivoChatarra: motchatarra.value,
      Texto: Texto.value,
      UsrReg: user.CodigoEmp,
      RegDate: new Date(),
      UpdDate: new Date(),
    };

    insChatarraPos(data, (err, data) => {
      if (err) {
        toast.error("Error al intentar guardar el registro de chatarra", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        SetChatarraPos(data)

        history.push("/chatarra")
      }
    });
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={10} sm={8} md={6} lg={6}>
          <Paper elevation={3}>
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.root}
            >
              <form onSubmit={onFormSubmit}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SPtr">Puesto de Trabajo</InputLabel>
                    <Select
                      native
                      label="Puesto de Trabajo"
                      name="puestotr"
                      className={classes.SelectStyle}
                    >
                      <option value="0"> </option>
                      {puestos.map((p) => {
                        return (
                          <option key={p.id} value={p.id}>
                            {p.Descrit}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="STchatarra">Tipo Chatarra</InputLabel>
                    <Select
                      native
                      label="Tipo Chatarra"
                      name="tipoChatarra"
                      className={classes.SelectStyle}
                    >
                      <option value="0"> </option>
                      {tipoChatarra.map((t) => {
                        return (
                          <option key={t.Id} value={t.Id}>
                            {t.Denominacion}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Tooltip title="Solo Números" placement="right">
                      <TextField
                        id="PesoEnt"
                        name="PesoEnt"
                        label="Peso Entrada"
                        type="number"
                        className={classes.InputTextStyle}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Tooltip title="Solo Números" placement="right">
                      <TextField
                        id="PesoSal"
                        name="PesoSal"
                        label="Peso Salida"
                        type="number"
                        className={classes.InputTextStyle}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SMChatarra">Motivo Chatarra</InputLabel>
                    <Select
                      native
                      label="Motivo Chatarra"
                      name="motchatarra"
                      className={classes.SelectStyle}
                    >
                      <option value="0"> </option>
                      {motivoChatara.map((p) => {
                        return (
                          <option key={p.Id} value={p.Id}>
                            {p.Denominacion}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <TextField
                      id="Txt"
                      name="Texto"
                      label="Texto"
                      className={classes.InputTextStyle}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      className={classes.btnB}
                      type="submit"
                    >
                      Aceptar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      className={classes.btnY}
                      type="reset"
                      onClick={HandlerClose}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ChatarraForm;
