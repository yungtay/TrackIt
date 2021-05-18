import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom"
import { useState } from "react"

import LoginScreen from "./LoginScreen/LoginScreen"
import Register from "./Register/Register"

export default function App() {
    return (
      <BrowserRouter>
      <Switch>
          <Route path="/" exact>
            <LoginScreen />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
      
      </Switch>
        
      </BrowserRouter>
    );
}