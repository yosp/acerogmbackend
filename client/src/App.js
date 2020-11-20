import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalState";

import PublicRoute from './components/Util/PublicRoute'
import PrivateRoute from './components/Util/PrivateRoute'

import Login from "./components/Login/Index";
import Dashboard from "./components/Dashboard/Index";
import Registro from "./components/Registro/Index";
import ProdForm from "./components/Registro/ProdForm"
import ProdFormEdit from "./components/Registro/ProdFormEdit"
import ProdCompForm from "./components/Registro/DataCompForm"
import ParadaForm from "./components/Registro/ParadaForm"
import ParadaFormEdit from "./components/Registro/ParadaFormEdit"
import OrdenProduccion from "./components/OrdenProduccion/Index";
import Chatarra from "./components/Chatarra/index"
import ChatarraForm from "./components/Chatarra/ChatarraForm"
import Demora from "./components/Demora/Index"
import Notif from "./components/Notif/Index"
import Recepcion from './components/Recepcion/index'
import FormPosRecepcion from './components/Recepcion/FormPosRecepcion'
import Config from './components/Config'

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div>
            <Switch>
                <PublicRoute restricted={false} component={Login} exact path="/" />
                <PrivateRoute component={Dashboard} exact path="/dashboard" />
                <PrivateRoute component={Registro} exact path="/registro" />
                <PrivateRoute component={ProdForm} exact path="/registro/prodreg"/>
                <PrivateRoute component={ProdFormEdit} exact path="/registro/prodreg/edit"/>
                <PrivateRoute component={ProdCompForm} exact path="/registro/prodcomp"/>
                <PrivateRoute component={ParadaForm} exact path="/registro/paradreg" />
                <PrivateRoute component={ParadaFormEdit} exact path="/registro/paradreg/Edit" />
                <PrivateRoute component={OrdenProduccion} exact path="/ordenprod" />
                <PrivateRoute component={Chatarra} exact path="/chatarra"/>
                <PrivateRoute component={ChatarraForm} exact path="/chatarra/chatarForm"/>
                <PrivateRoute component={Demora} exact path="/demora"/>
                <PrivateRoute component={Notif} exact path="/notif" />
                <PrivateRoute component={Recepcion} exact path="/Recepcion" />
                <PrivateRoute component={FormPosRecepcion} exact path="/Recepcion/FormPosRecep" />
                <PrivateRoute component={Config} exact path="/config" />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
