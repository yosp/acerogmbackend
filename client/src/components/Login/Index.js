import React, { useState, useContext } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
  makeStyles,
  Modal,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import { GlobalContex } from '../../context/GlobalState'
import { LoginUser, UserInfo } from '../../context/Api'

import Reset from "./Reset";

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
  LinkArea: {
    position: "relative",
    textAlign: "center",
    margin: ".5em 0 .5em -4.5em",
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
  LogoSize: {
    [theme.breakpoints.down("xs")]: {
      width: "11em",
      heigth: "2em",
    },
    [theme.breakpoints.down("sm")]: {
      width: "16.5em",
      heigth: "3em",
    },
    [theme.breakpoints.up("md")]: {
      width: "22em",
      heigth: "4em",
    },
    [theme.breakpoints.up("lg")]: {},
  },
  modalPanel: {
    
  },
  MainModal: {
  },
}));
const Login = () => {
  const classes = useStyle();
  const AceroContext = useContext(GlobalContex)
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  function onFormSubmint(e) {
    e.preventDefault();
      const { setUserLogin, setUserInfo } = AceroContext
    const { user, password } = e.target.elements;
      LoginUser(parseInt(user.value), password.value, (error, logininfo) => {
          if (error) {
              toast.error("Error al intentar inicio", {
                  position: toast.POSITION.BOTTOM_RIGHT
              });
              console.error(error.message)
              return
          }
          if (logininfo !== "" && logininfo !== undefined && logininfo !== null || logininfo.length != 0) {
              setUserLogin(logininfo)
              UserInfo(parseInt(user.value), (error, info) => {
                  if (error) {
                      toast.error("Error al cargar roles de usuario", {
                          position: toast.POSITION.BOTTOM_RIGHT
                      });
                      console.error(error.message)
                      return
                  }
                  if (info !== "" && info !== undefined && info !== null) {
                      setUserInfo(info)
                      history.push("/dashboard")
                  } else {
                      toast.warn("No se encontro Roles asociados al usuario!", {
                          position: toast.POSITION.BOTTOM_RIGHT
                      });
                  }
              })
          } else {
              toast.warn("Verifique usuario y Contreaseña !", {
                  position: toast.POSITION.BOTTOM_RIGHT
              });
          }
        }
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
        className={classes.root}
      >
        <Grid item xs={10} sm={8} md={6} lg={6}>
          <Paper elevation={3} className={classes.LogPanel}>
                      <img src={window.location.origin + '/logo.png'} className={classes.LogoSize} alt="logo" />
            <h1>Acero Gm</h1>
            <form className={classes.FormCenter} onSubmit={onFormSubmint}>
              <Grid
                container
                spacing={1}
                direction="column"
                alignItems="center"
                justify="center"
                wrap="nowrap"
                className={classes.FormInputs}
              >
                <TextField
                  id="Username"
                  name="user"
                  label="Usuario"
                  variant="outlined"
                  className={classes.InputTextStyle}
                />
                <TextField
                  id="Password"
                  name="password"
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  className={classes.InputTextStyle}
                />
              </Grid>
              <div className={classes.LinkArea} xs={10} sm={8} md={6} lg={6}>
                <a href="!#" onClick={handleOpen}>Olvide mi Contraseña</a>
                <br />
                <Link to="">Reporte Anomalias</Link>
              </div>
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
              >
                Cancelar
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={open}
        xs={10} sm={8} md={6} lg={6}
        className={classes.MainModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modalPanel}>
          <Reset HandlerClose={handleClose}/>
        </div>
          </Modal>
          <ToastContainer />
    </>
  );
};

export default Login;
