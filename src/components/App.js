import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom"
import { useState } from "react"

import UserContext from "../context/UserContext"
import LoginScreen from "./LoginScreen/LoginScreen"
import Register from "./Register/Register"
import NavBar from "./NavBar/NavBar"
import Footer from "./Footer/Footer"
import Habitos from "./Habitos/Habitos"
import { Global } from "./GlobalStyle/GlobalStyle"

export default function App() {
  const [accountInformation, setAccountInformation] = useState(null)

    return (
      <BrowserRouter>
        <Switch>
          <UserContext.Provider
            value={{ accountInformation, setAccountInformation }}
          >
            <Route path="/" exact>
              <LoginScreen />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/hoje" exact>
              <NavBar />
              <Footer />
              <Global/>
              <Switch>
                <Route path="/hoje" exact>
                  <Habitos />
                </Route>
                
              </Switch>
            </Route>
          </UserContext.Provider>
        </Switch>
      </BrowserRouter>
    );


}