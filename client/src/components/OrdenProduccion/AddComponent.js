import React, { useState, useEffect, useContext } from "react";
import { Grid, makeStyles, Paper, Button } from "@material-ui/core";
import Autosuggest from "react-autosuggest";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalContex } from "../../context/GlobalState";
import { getOrdenCompMaterialLike, addComponente, getOrdenCompList } from "../../context/Api";

const useStyle = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  formStyle: {
    padding: "1em 0",
    margin: "1em 0",
  },
  GridMain: {
    height: "10em",
    margin: "2.5em",
    paddin: "1.5em",
    position: "relative",
  },
  PtContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    border: "1px solid lightgray",
    margin: "2em 1em",
    padding: ".5em .2em",
    width: "30em",
  },
  grupoContainer: {
    margin: "1em 0",
  },
  PaperStyle: {
    padding: "1em",
  },
  SelectStyle: {
    width: "12em",
  },
  DatePick: {
    margin: ".8em 0",
    width: "12em",
  },
  ButtonSection: {
    margin: ".5em 0 0 -.5em",
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
}));
let options = [];

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : options.filter(
        (mater) =>
          mater.Material.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion) =>  `${suggestion.Material} / ${suggestion.UndBase}`.trim();

const renderSuggestion = (suggestion) => (
  <span>
    {suggestion.Material} / {suggestion.UndBase}
  </span>
);

const AddComponent = ({ HandlerClose, Id }) => {
  const classes = useStyle();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const aceroContext = useContext(GlobalContex);
  const { OrdenList, setOrdenList, setOrdenCompList } = aceroContext
  useEffect(() => {
    getOrdenCompMaterialLike((err, data) => {
      if (err) {
      } else {
        options = data;
      }
    });
  }, []);

  const onChange = (e, { newValue }) => {
    e.preventDefault();
    setValue(newValue);
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Componente",
    value,
    onChange,
  };

  const handlerSubmit = () => {
    let Material = value.split('/')[0].trim()
    let UndBase = value.split('/')[1].trim()

    addComponente({Id, Material, UndBase}, (err, data) => {
      if(err){
        toast.error("Error al intentar agregar componente", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        getOrdenCompList(Id, (err, data)=> {
          if(err){
            toast.error("Error al intentar obtener los componentes de la orden", {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          } else {
            setOrdenCompList(data)
            HandlerClose()
          }
        })
      }
    })
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        justify="center"
        alignItems="center"
        direction="column"
        wrap="nowrap"
        style={{padding: "2em", margin: "2em"}}
      >
        <Paper elevation={3} className={classes.PtContainer}>
          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            direction="column"
            wrap="nowrap"
            style={{padding: "1.2em", margin: "1em"}}
          >
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
              <Button
                type="submit"
                className={classes.btnB}
                onClick={handlerSubmit}
              >
                Aceptar
              </Button>
              <Button
                type="reset"
                className={classes.btnY}
                onClick={HandlerClose}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default AddComponent;
