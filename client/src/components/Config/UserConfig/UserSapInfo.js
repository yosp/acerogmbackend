import React, { useContext } from "react";
import { makeStyles, Paper, Grid, Button } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";

import { GlobalContex } from "../../../context/GlobalState";

const useStyles = makeStyles(theme => ({
  rootContainer: {},
  SearchPaper: {
    margin: "1rem 0 .5rem 0",
    padding: '.5rem',
    width: "50rem"
  },
  SearchImput: {
    width: "20rem"
  },
  SearchButton: {
    margin: '.5rem .5rem',
    background: '#FFCC00',
    color: "#003366",
    '&:hover': {
      background: "#FFE166"
    }
  },
  AddButton: {
    margin: '.5rem .5rem',
    background: '#FFCC00',
    color: "#003366",
    '&:hover': {
      background: "#FFE166"
    }
  },
  ResultPaper: {
    margin: '.5rem',
    padding: '0.5rem',
    width: '80rem'
  }, 
  FabStyle: {
    position: "absolute",
    background: "#FFCC00",
    color: "#003366",
    right: "0",
    top: "-4rem",
    zIndex: "999",
    "&:hover": {
      background: "#FFE166",
    },
  }
}));

const UserSapInfo = () => {
  const classes = useStyles();
  const aceroContext = useContext(GlobalContex);
  const { UserSearchSap, setToggleSapPass } = aceroContext

  const onSapAdd = (e) => {
    e.preventDefault();
    
    setToggleSapPass(true)
  }

  return (
    <>
      <Grid>
        <Grid container direction="column" justify="center" alignItems="center" wrap="nowrap">
          <Paper elevation={3} className={classes.SearchPaper}>
            <Grid item>
              Código: {UserSearchSap.Codigoemp}
            </Grid>
            <Grid item>
              Nombre: {UserSearchSap.nombre}
            </Grid>
            <Grid item>
              Posicion: {UserSearchSap.DesCodPosicion}
            </Grid>
            <Grid item>
              Departamento: {UserSearchSap.DesCUniOrga}
            </Grid>
            <Grid>
              <br/>
              <Button className={classes.AddButton} onClick={onSapAdd}>Guardar</Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default UserSapInfo;
