import { Link, useHistory} from 'react-router-dom';
import { useState } from 'react'
import axios from "axios"
import Loader from "react-loader-spinner";
import logo from '../../image/logo.png';

import { LoginRegistrationContainer } from '../LoginScreen/LoginScreen'

export default function Register() {
    const [loginInformation, setLoginInformation] = useState({email:"", password:"", name:"", image:""})
    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()

    if(isLoading === null) return "Carregando"

    return (
      <LoginRegistrationContainer loading={isLoading}>
        <img src={logo} alt="logo"/>
        <input
          type="text"
          placeholder="email"
          onChange={(e) =>
            setLoginInformation({ ...loginInformation, email: e.target.value })
          }
        ></input>
        <input
          type="password"
          placeholder="senha"
          onChange={(e) =>
            setLoginInformation({
              ...loginInformation,
              password: e.target.value,
            })
          }
        ></input>
        <input
          type="text"
          placeholder="nome"
          onChange={(e) =>
            setLoginInformation({ ...loginInformation, name: e.target.value })
          }
        ></input>
        <input
          type="text"
          placeholder="foto"
          onChange={(e) =>
            setLoginInformation({ ...loginInformation, image: e.target.value })
          }
        ></input>
        <button onClick={registerAccount}>
          {" "}
          {isLoading ? (
            <Loader type="ThreeDots" color="white" height={20} />
          ) : (
            "Cadastrar"
          )}
        </button>
        <Link to="/">Já tem uma conta? Faça login!</Link>
      </LoginRegistrationContainer>
    );

    function filledAll(){
        for (const key in loginInformation) {
          if (loginInformation[key].length === 0) {
            return false;
          }
        }
        return true;
      }

    function registerAccount() {
      if(!filledAll()){
        alert("Preencha todos os campos !");
      } else {
        setIsLoading(true)
        console.log(loginInformation)
        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", loginInformation)
        request.then((response) => {
          alert(`O email: ${response.data.email} foi cadastrado com sucesso`);
          setIsLoading(false);
          history.push("/");
        });
        request.catch((response) => {alert(`Houve um erro: ${response.response.status}, tente novamente`);
        setIsLoading(false);
      })
      }

    }
}

