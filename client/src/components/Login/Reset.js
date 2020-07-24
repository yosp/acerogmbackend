import React from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import {
  AccountCircleRounded,
  VpnKeyRounded,
  CodeRounded,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

//import logo from "../../assets/logo.png";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  LogPanel: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  FormCenter: {
    padding: 0,
    margin: 0,
  },
  InputTextStyle: {
    marginBottom: "1em",
  },
  FormInputs: {
    border: "1px solid lightgray",
    padding: "1em",
  },
  ButtonArea: {
    textAlign: "center",
    margin: "1.5em",
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
}));
const Reset = ({ HandlerClose }) => {
  const classes = useStyle();
  const history = useHistory();

  function onFormSubmint(e) {
    e.preventDefault();
    history.push("/");
  }

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
          <Paper elevation={3} className={classes.LogPanel}>
            <img src={process.env.PUBLIC_URL + '/logo.png'} className={classes.LogoSize} alt="logo" />
            <Grid
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.root}
            >
              <form onSubmit={onFormSubmint}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountCircleRounded />
                  </Grid>
                  <Grid item>
                    <TextField id="rusername" name="ruser" label="Usuario" />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <CodeRounded />
                  </Grid>
                  <Grid item>
                    <Tooltip title="Solo Números" placement="right">
                      <TextField
                        id="code"
                        name="rcode"
                        label="código"
                        type="number"
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <VpnKeyRounded />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="rpassword"
                      name="rpassword"
                      type="password"
                      label="Contraseña"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <VpnKeyRounded />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="rusernamew"
                      name="rpassword2"
                      label="Confirmar Contaseña"
                      type="password"
                    />
                  </Grid>
                </Grid>
                <div className={classes.ButtonArea}>
                  <Button type="submit" className={classes.btnB}>
                    Aceptar
                  </Button>
                  <Button className={classes.btnY} onClick={HandlerClose}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Reset;
