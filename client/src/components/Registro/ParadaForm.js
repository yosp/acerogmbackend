import "moment";
import React, { useState, useContext } from "react";
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
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContex } from "../../context/GlobalState";
import {
  getMotivoFallaSubArea,
  getMotivoFallaLugarAveria,
  getMotivoFalla,
  insRegParada,
  getHeaderReg,
} from "../../context/Api";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    overflow: "scroll",
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

const ParadaForm = () => {
  const classes = useStyle();
  const [HoraInicio, setHoraInicio] = useState(new Date());
  const [HoraFin, setHoraFin] = useState(new Date());
  const [subArea, setSubArea] = useState([]);
  const [lugarFalla, setLugarFalla] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const aceroContext = useContext(GlobalContex);
  const history = useHistory();
  const {
    isLam,
    ordenes,
    fallaAreas,
    user,
    headerReg,
    loadRegPadadData,
    setHeaderRegActive,
  } = aceroContext;

  const onFormSubmit = (e) => {
    e.preventDefault();
    const {
      PlqPerd,
      PlqDesc,
      SeArea,
      SeSubArea,
      SELugarF,
      SEquipo,
      SOrden,
      Observ,
    } = e.target.elements;

    const data = {
      HeaderRegId: headerReg.id,
      OrdenProdId: SOrden.value,
      HoraI: HoraInicio,
      HoraF: HoraFin,
      AreaFallaId: SeArea.value,
      LugarAveriaId: SELugarF.value,
      subArea: SeSubArea.value,
      Motivo: SEquipo.value,
      Notas: Observ.value,
      MpPerd: PlqPerd == undefined ? 0 : PlqPerd.value,
      MpDesc: PlqDesc == undefined ? 0 : PlqDesc.value,
      UsrReg: user.CodigoEmp,
    };

    insRegParada(data, (err, res) => {
      if (err) {
        toast.error("Error al intentar guardar la parada", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        console.error(err)
      } else {
        loadRegPadadData(res);
      }
    });

    getHeaderReg(headerReg.id, (err, data) => {
      if (err) {
        toast.error("Error al cargar los datos de la cabezera", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setHeaderRegActive(data);
        history.push("/registro");
      }
    });
  };

  const onChangeArea = (e) => {
    e.preventDefault();
    let areaid = e.target.value;
    getMotivoFallaSubArea(areaid, (err, data) => {
      if (err) {
        toast.error("Error al intentar cargar las sub-areas", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setSubArea(data);
      }
    });
  };

  const onChangeSubArea = (e) => {
    e.preventDefault();
    let subAreaid = e.target.value;
    getMotivoFallaLugarAveria(subAreaid, (err, data) => {
      if (err) {
        toast.error("Error al intentar cargar el lugar de averia", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setLugarFalla(data);
      }
    });
  };

  const HandlerClose = (e) => {
    e.preventDefault();
    history.push("/registro");
  };

  const onChangeLugar = (e) => {
    e.preventDefault();
    let lugarId = e.target.value;
    getMotivoFalla(lugarId, (err, data) => {
      if (err) {
        toast.error("Error al intentar cargar el equipo", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        setEquipos(data);
      }
    });
  };

  const handleHInicioChange = (date) => {
    setHoraInicio(date);
  };

  const handleHFinChange = (date) => {
    setHoraFin(date);
  };

  let Lam = null;
  if (isLam) {
    Lam = (
      <>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Tooltip title="Solo Números" placement="right">
              <TextField
                id="PlqP"
                name="PlqPerd"
                label="PLQ Perdidos"
                type="number"
                className={classes.InputTextStyle}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          alignItems="flex-end"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Tooltip title="Solo Números" placement="right">
              <TextField
                id="Plqd"
                name="PlqDesc"
                label="PLQ Descartado"
                type="number"
                className={classes.InputTextStyle}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center"></Grid>
      </>
    );
  }
  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={10} md={6} lg={6}>
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
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="HoraH"
                        label="Hora Inicio"
                        value={HoraInicio}
                        onChange={handleHInicioChange}
                        KeyboardButtonProps={{
                          "aria-label": "Tiempo ha cambiado",
                        }}
                        className={classes.SelectStyle}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <KeyboardTimePicker
                        margin="normal"
                        id="HoraF"
                        label="Hora Fin"
                        value={HoraFin}
                        onChange={handleHFinChange}
                        KeyboardButtonProps={{
                          "aria-label": "Tiempo ha cambiado",
                        }}
                        className={classes.SelectStyle}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SlArea">Area</InputLabel>
                    <Select
                      native
                      label="SlArea"
                      id="SeArea"
                      name="SeArea"
                      className={classes.SelectStyle}
                      onChange={onChangeArea}
                    >
                      <option value="0"></option>
                      {fallaAreas.map((area) => {
                        return (
                          <option key={area.Id} value={area.Id}>
                            {area.Denominacion}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SlSubArea">SubArea</InputLabel>
                    <Select
                      native
                      label="SlSubArea"
                      id="SeSubArea"
                      name="SeSubArea"
                      className={classes.SelectStyle}
                      onChange={onChangeSubArea}
                    >
                      <option value="0"></option>
                      {subArea.map((sub) => {
                        return (
                          <option key={sub.Id} value={sub.Id}>
                            {sub.Denominacion}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SLLugarF">Lugar Falla</InputLabel>
                    <Select
                      native
                      label="SLLugarF"
                      id="SELugarF"
                      name="SELugarF"
                      className={classes.SelectStyle}
                      onChange={onChangeLugar}
                    >
                      <option value="0"></option>
                      {lugarFalla.map((Lug) => {
                        return (
                          <option key={Lug.Id} value={Lug.Id}>
                            {Lug.Denominacion}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SLEquipo">Motivo Falla</InputLabel>
                    <Select
                      native
                      label="SLEquipo"
                      id="SEquipo"
                      name="SEquipo"
                      className={classes.SelectStyle}
                    >
                      <option value="0"></option>
                      {equipos.map((eq) => {
                        return (
                          <option key={eq.Id} value={eq.Id}>
                            {eq.Denominacion}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="SOrden">Orden Producción</InputLabel>
                    <Select
                      native
                      label="Orden"
                      id="SOrden"
                      name="SOrden"
                      className={classes.SelectStyle}
                    >
                      <option value="0"> </option>
                      {ordenes.map((orden) => {
                        return (
                          <option key={orden.Id} value={orden.Id}>
                            {orden.Orden}
                          </option>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
                {Lam}
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <TextField
                      id="obs"
                      name="Observ"
                      label="Observación"
                      multiline
                      rows={2}
                      className={classes.InputTextStyle}
                    />
                  </Grid>
                </Grid>
                <p></p>
                <Grid container spacing={1} alignItems="center">
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
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ParadaForm;
