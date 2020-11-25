import React, { useContext } from "react";
import { makeStyles, Paper, Grid, Button  } from "@material-ui/core";
import { Accessibility } from "@material-ui/icons";

import { GlobalContex } from "../../../context/GlobalState";

import { addGrupoMember } from '../../../context/Api'

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
  addButton: {
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

const GrupoUserInfo = () => {
  const classes = useStyles();
  const aceroContext = useContext(GlobalContex);
  const { UserSearch, ActiveGrupoId, GrupoPtrId, setToogleGrupo, setToggleAddMember } = aceroContext

  const handleAddMember = (e) => {
    e.preventDefault()
    addGrupoMember({GrupoId: ActiveGrupoId , PuestoTr: GrupoPtrId , CodigoEmp: UserSearch.CodigoEmp}, (err, data) => {
      if(err) {

      } else {
        setToggleAddMember(false)
        setToogleGrupo(true)
      }
    })
  }

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
            <Grid item>
              <Button className={classes.addButton} onClick={handleAddMember}><Accessibility/> Agregar</Button>
            </Grid>
            <br/>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default GrupoUserInfo;
