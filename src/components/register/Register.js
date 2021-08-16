import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import logo from '../../image/logo.png';

import {
  LoginRegistrationContainer,
  LinkContainer,
} from '../loginScreen/LoginScreen';

export default function Register() {
  const [registerInformation, setRegisterInformation] = useState({
    email: '',
    password: '',
    name: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  if (isLoading === null) return 'Carregando';

  return (
    <LoginRegistrationContainer loading={isLoading}>
      <form onSubmit={registerAccount}>
        <img src={logo} alt="logo" />
        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) =>
            setRegisterInformation({
              ...registerInformation,
              email: e.target.value,
            })
          }
        ></input>
        <input
          type="password"
          placeholder="senha"
          required
          onChange={(e) =>
            setRegisterInformation({
              ...registerInformation,
              password: e.target.value,
            })
          }
        ></input>
        <input
          type="text"
          placeholder="nome"
          required
          onChange={(e) =>
            setRegisterInformation({
              ...registerInformation,
              name: e.target.value,
            })
          }
        ></input>
        <input
          type="url"
          placeholder="foto"
          required
          onChange={(e) =>
            setRegisterInformation({
              ...registerInformation,
              image: e.target.value,
            })
          }
        ></input>
        <button type="submit">
          {' '}
          {isLoading ? (
            <Loader type="ThreeDots" color="white" height={20} />
          ) : (
            'Cadastrar'
          )}
        </button>
        <LinkContainer>
          <Link to="/">Já tem uma conta? Faça login!</Link>
        </LinkContainer>
      </form>
    </LoginRegistrationContainer>
  );

  function registerAccount(e) {
    e.preventDefault();
    setIsLoading(true);
    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/sign-up`,
      registerInformation
    );
    request.then((response) => registerAccountSucess(response));
    request.catch((response) => registerAccountFail(response));
  }

  function registerAccountSucess(response) {
    alert(`O email: ${response.data.email} foi cadastrado com sucesso`);
    setIsLoading(false);
    history.push('/');
  }

  function registerAccountFail(response) {
    alert(`O email: ${response.data.email} foi cadastrado com sucesso`);
    setIsLoading(false);
    history.push('/');
  }
}
