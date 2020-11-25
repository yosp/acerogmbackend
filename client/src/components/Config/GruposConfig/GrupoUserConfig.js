import React, { useState, useContext } from "react";
import { makeStyles, 
          Paper, 
          Grid, 
          TextField, 
          Button,
				} from "@material-ui/core";
import { Search, Clear } from "@material-ui/icons";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { GlobalContex } from "../../../context/GlobalState";
import { SearchUser, SearchUserSap, GetUserRolesList, GetRolNotUser } from "../../../context/Api"

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
  CancelButton:{
    margin: '.5rem .5rem',
    background: '#9d0208',
    color: "black",
    '&:hover': {
      background: "#d00000"
    }
  },
  ResultPaper: {
    margin: '.5rem',
    padding: '0.5rem',
    width: '80rem'
  }
}));

const GrupoUserConfig = () => {
	const classes = useStyles();
  const aceroContext = useContext(GlobalContex);
  const [codEmp, setCodEmp] = useState()
  const { setUserSearch, setToggleAddMember, setToogleGrupo } = aceroContext
  
  const onFormSubmit = (e) => {
    e.preventDefault();
    SearchUser(codEmp, (err, data) => {
      if(err){
        
      } else {
        if(data == '' || data == null || data == undefined) {
          setUserSearch({CodigoEmp:"", Nombres: "", Estatus: "I"})
        } else {
          setUserSearch(data)
        }
        
      }
    })
  }

  const handlerCancel = (e) => {
    e.preventDefault()
    setToggleAddMember(false)
    setToogleGrupo(true)
  }

  return (
      <>
        <Grid>
          <Grid container direction="column" justify="center" alignItems="center" wrap="nowrap">
            <form onSubmit={onFormSubmit}>
              <Paper elevation={3} className={classes.SearchPaper}>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center" wrap="nowrap">
                  <Grid item>
                    <TextField
                      id="usr"
                      name="Codemp"
                      label="Código Usuario"
                      onChange={e => setCodEmp(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="default"
                      type="submit"
                      className={classes.SearchButton}
                      startIcon={<Search />}>
                      Buscar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={handlerCancel}
                      className={classes.CancelButton}
                      startIcon={<Clear />}>
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Grid>
        <ToastContainer/>  
      </>
    )
}

export default GrupoUserConfig
