import React, { useContext } from "react";
import { makeStyles, Paper, Grid, BottomNavigation, BottomNavigationAction  } from "@material-ui/core";

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
  ResultPaper: {
    margin: '.5rem',
    padding: '0.5rem',
    width: '80rem'
  }
}));

const UserInfo = () => {
  const classes = useStyles();
  const aceroContext = useContext(GlobalContex);
  const { UserSearch } = aceroContext

  return (
    <>
      <Grid>
        <Grid container direction="column" justify="center" alignItems="center" wrap="nowrap">
          <Paper elevation={3} className={classes.SearchPaper}>
            <Grid item>
              Código: {UserSearch.CodigoEmp}
            </Grid>
            <Grid item>
              Nombre: {UserSearch.Nombres}
            </Grid>
            <Grid item>
              Estatus: {UserSearch.Estatus == 'A'? 'Activo': 'Inactivo'}
            </Grid>
            <br/>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfo;
