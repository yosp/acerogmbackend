import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

import { GlobalContex } from "../../context/GlobalState";
import { getOdenenComp, insRegProd, getTipoComb } from "../../context/Api";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    overflow: "scroll",
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

const DataCompForm = ({ Id }) => {
  const classes = useStyle();
  const [mprima, setMprima] = useState([]);
  const aceroContext = useContext(GlobalContex);
  const { ordenes } = aceroContext;
  const history = useHistory();

  const onChangeOrden = (e) => {
    e.preventDefault();
    let index = e.nativeEvent.target.selectedIndex;
    let label = e.nativeEvent.target[index].text;

    getOdenenComp(label, (err, data) => {
      if (err) {
      } else {
        setMprima(data);
      }
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const {
      orden,
      mprima,
      Lote,
      MpUme,
      MpFactor,
      MpUmb,
    } = e.target.elements;

    let torden = ordenes.filter((o) => {
      return o.Id == orden.value;
    });

    const data = {
      PosProdId: Id,
      CodComponentes: mprima,
      
    };

    insRegProd(data, (err, res) => {
      
      history.push("/registro");
    });
  };

  const HandlerClose = (e) => {
    e.preventDefault();
    history.push("/registro");
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
                    <InputLabel id="SOrden">Orden Producción</InputLabel>
                    <Select
                      native
                      label="Orden"
                      name="orden"
                      className={classes.SelectStyle}
                      onChange={onChangeOrden}
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
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <InputLabel id="Smateria">Materia Prima</InputLabel>
                    <Select
                      native
                      label="Materia Prima"
                      name="mprima"
                      className={classes.SelectStyle}
                    >
                      <option value="0"> </option>
                      {mprima.map((prima) => {
                        return (
                          <option key={prima.Id} value={prima.Id}>
                            {prima.Componente}
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
                        id="Lote"
                        name="Lote"
                        label="Lote"
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
                        id="MpUme"
                        name="MpUme"
                        label="Consumo Acumulado"
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
                        id="MpFactor"
                        name="MpFactor"
                        label="Factor"
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
                        id="MpUmb"
                        name="MpUmb"
                        label="UMB"
                        type="number"
                        className={classes.InputTextStyle}
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      className={classes.btnB}
                      type="submit"
                    >
                      Guardar
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
    </>
  );
};

export default DataCompForm;
