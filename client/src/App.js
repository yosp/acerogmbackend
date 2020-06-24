import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalState";

import PublicRoute from './components/Util/PublicRoute'
import PrivateRoute from './components/Util/PrivateRoute'

import Login from "./components/Login/Index";
import Test from "./components/Util/DrawerMenu";
import Dashboard from "./components/Dashboard/Index";
import Registro from "./components/Registro/Index";
import ProdForm from "./components/Registro/ProdForm"
import ProdCompForm from "./components/Registro/DataCompForm"
import ParadaForm from "./components/Registro/ParadaForm"
import OrdenProduccion from "./components/OrdenProduccion/Index";
import Chatarra from "./components/Chatarra/index"
import ChatarraForm from "./components/Chatarra/ChatarraForm"
import Demora from "./components/Demora/Index"
import Notif from "./components/Notif/Index"

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div>
            <Switch>
                <PublicRoute restricted={false} component={Login} exact path="/" />
                <Route exact path="/test">
                  <Test />
                </Route>
                <PrivateRoute component={Dashboard} exact path="/dashboard" />
                <PrivateRoute component={Registro} exact path="/registro" />
                <PrivateRoute component={ProdForm} exact path="/registro/prodreg"/>
                <PrivateRoute component={ProdCompForm} exact path="/registro/prodcomp"/>
                <PrivateRoute component={ParadaForm} exact path="/registro/paradreg" />
                <PrivateRoute component={OrdenProduccion} exact path="/ordenprod" />
                <PrivateRoute component={Chatarra} exact path="/chatarra"/>
                <PrivateRoute component={ChatarraForm} exact path="/chatarra/chatarForm"/>
                <PrivateRoute component={Demora} exact path="/demora"/>
                <PrivateRoute component={Notif} exact path="/notif" />
          </Switch>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
