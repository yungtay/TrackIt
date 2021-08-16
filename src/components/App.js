import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

import UserContext from '../context/UserContext';
import LoginScreen from './loginScreen/LoginScreen';
import Register from './register/Register';
import NavBar from './navbar/NavBar';
import Footer from './footer/Footer';
import Habitos from './habitos/Habitos';
import Hoje from './hoje/Hoje';
import Historic from './historic/Historic';
import { Global } from './globalStyle/GlobalStyle';

export default function App() {
  const [accountInformation, setAccountInformation] = useState(
    JSON.parse(localStorage.getItem('user'))
  );
  const [habitsDay, setHabitsDay] = useState([]);
  const [hasUpdate, setHasUpdate] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider
          value={{
            accountInformation,
            setAccountInformation,
            habitsDay,
            setHabitsDay,
            hasUpdate,
            setHasUpdate,
          }}
        >
          <Route path="/" exact>
            <LoginScreen />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/habitos" exact>
            <NavBar />
            <Footer />
            <Global />
            <Habitos />
          </Route>
          <Route path="/hoje" exact>
            <NavBar />
            <Footer />
            <Global />
            <Hoje />
          </Route>
          <Route path="/historic" exact>
            <NavBar />
            <Footer />
            <Global />
            <Historic />
          </Route>
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}
