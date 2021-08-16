import styled from 'styled-components';
import logo from '../../image/logo.png';
import { Link, useHistory } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import UserContext from '../../context/UserContext';
export default function LoginScreen() {
  const [loginInformation, setLoginInformation] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { setAccountInformation } = useContext(UserContext);

  if (isLoading === null) return 'Carregando';

  return (
    <LoginRegistrationContainer isLoading={isLoading}>
      <form onSubmit={logIn}>
        <img src={logo} alt="logo" />
        <input
          type="email"
          placeholder="email"
          required
          onChange={(e) =>
            setLoginInformation({
              ...loginInformation,
              email: e.target.value,
            })
          }
        ></input>
        <input
          type="password"
          placeholder="senha"
          required
          onChange={(e) =>
            setLoginInformation({
              ...loginInformation,
              password: e.target.value,
            })
          }
        ></input>
        <button type="submit">
          {' '}
          {isLoading ? (
            <Loader type="ThreeDots" color="white" height={20} />
          ) : (
            'Entrar'
          )}
        </button>
        <LinkContainer>
          <Link to="/register">Não tem uma conta? Cadastra-se!</Link>
        </LinkContainer>
      </form>
    </LoginRegistrationContainer>
  );

  function logIn(e) {
    e.preventDefault();
    setIsLoading(true);
    const request = axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      loginInformation
    );
    request.then(logInSucess);
    request.catch(logInFail);
  }

  function logInSucess(response) {
    localStorage.setItem('user', JSON.stringify(response.data));
    setAccountInformation(response.data);
    setIsLoading(false);
    history.push('/habitos');
  }

  function logInFail(response) {
    alert(`O email ou senha são inválidos, erro: ${response.response.status}`);
    setIsLoading(false);
  }
}

const LoginRegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 9.6%;
  input,
  button {
    width: 100%;
    height: 45px;
    padding: 11px;
    margin-bottom: 8px;

    font-size: 20px;
    opacity: ${(prop) => (prop.isLoading ? 0.35 : 1)};
    background: ${(prop) => (prop.isLoading ? '#F2F2F2' : 'white')};
    pointer-events: ${(prop) => (prop.isLoading ? 'none' : 'initial')};

    border: 1px solid #d5d5d5;
    border-radius: 5px;
  }
  input::placeholder {
    color: #bdbdbd;
  }
  button {
    margin-bottom: 25px;

    font-size: 21px;
    color: white;
    background: #52b6ff;
  }
  img {
    width: 180px;
    height: 180px;

    margin: 64px auto 33px auto;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const LinkContainer = styled.div`
  color: #52b6ff;
  font-size: 14px;
`;

export { LoginRegistrationContainer, LinkContainer };
