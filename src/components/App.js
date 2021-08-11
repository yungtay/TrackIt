import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';

import UserContext from '../context/UserContext';
import LoginScreen from './LoginScreen/LoginScreen';
import Register from './Register/Register';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Habitos from './Habitos/Habitos';
import Hoje from './Hoje/Hoje';
import Historic from './Historic/Historic';
import { Global } from './GlobalStyle/GlobalStyle';

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
