import React, {useState, useEffect} from 'react'
import {
  Grid,
  makeStyles,
  Paper,
  Button 
} from "@material-ui/core";
import Autosuggest from 'react-autosuggest';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { getOrdenCompMaterialLike } from '../../context/Api' 

const useStyle = makeStyles(theme => ({

  formControl: {
    minWidth: 120
  },
  formStyle: {
    padding: "1em 0",
    margin: "1em 0"
  },
  GridMain: {
    margin: "2.5em",
    paddin: "1em",
    position: "relative"
  },
  PtContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "1px solid lightgray",
    margin: "2em 1em",
    padding: ".5em .2em",
    width: "30em"
  },
  grupoContainer: {
    margin: "1em 0"
  },
  PaperStyle: {
    padding: "1em"
  },
  SelectStyle: {
    width: "12em"
  },
  DatePick: {
    margin: ".8em 0",
    width: "12em"
  },
  ButtonSection: {
    margin: ".5em 0 0 -.5em"
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
  }
}));
let options = [];
let filteredOptions = []

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : options.filter(mater =>
    mater.Material.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion.Material;

const renderSuggestion = suggestion => (
  <span style={{zIndex:999, backgroundColor: 'red', position: 'absolute'}}>
    {suggestion.Material}({suggestion.UndBase})
  </span>
);

const AddComponent = () => {
  const classes = useStyle();
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([])
  useEffect(()=>{
    getOrdenCompMaterialLike((err, data) =>{
      if(err) {

      } else{
        options = data
      }
    })
  },[])

  const onChange = (e, { newValue }) => {
    e.preventDefault()
    setValue(newValue)
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const inputProps = {
    placeholder: 'Componente',
    value,
    onChange
  };

  const handlerSubmit = ()=>{

  }

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
        <Paper elevation={3} className={classes.PtContainer}>
          <form onSubmit={handlerSubmit} className={classes.formStyle}>
            <Grid item xs={10} sm={10} md={8} lg={6}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
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
      <ToastContainer />
    </>
    )
}

export default AddComponent
