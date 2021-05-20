import styled from "styled-components"
import { useEffect, useContext, useState } from "react"
import axios from "axios"
import UserContext from "../../context/UserContext"
import CreateHabits from "./CreateHabits"
export default function Habitos() {

    const {accountInformation} = useContext(UserContext)
    const [myHabits, setMyHabits] = useState([])
    const [habitsDays, setHabitsDays] = useState({habit: "", days: []})
    const [creatingHabit, setCreatingHabit] = useState(0)
    const msgNoHabit = "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"

    useEffect(() => {
        const config = { headers : {"Authorization" : `Bearer ${accountInformation.token}`}}
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        request.then((response) => {setMyHabits(response.data)})
    }, [])

    console.log(myHabits)
    console.log(habitsDays)


    return(
        <ContainerHabitos>
            <ContainerAdicionarHabitos>
                <span>Meus hábitos</span>
                <AdicionarHabitos onClick={() => setCreatingHabit((creatingHabit+1)%2)}>+</AdicionarHabitos>
            </ContainerAdicionarHabitos>
            <CreateHabits props={{habitsDays, setHabitsDays, creatingHabit}} />

            <HabitosCadastrados>
                {myHabits.length ? myHabits.map((h) => h) : msgNoHabit}
            </HabitosCadastrados>
            
        </ContainerHabitos>
        
    )
}

const ContainerHabitos = styled.div`
  padding: 0 4.86%;
  margin-top: 98px;
`;

const ContainerAdicionarHabitos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 23px;
  color: #126BA5;

  margin-bottom: 28px;

`;

const AdicionarHabitos = styled.div`
  width: 40px;
  height: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #52b6ff;
  border-radius: 5px;

  color: white;
  font-size: 27px;
`;

const HabitosCadastrados = styled.div`
  font-size: 18px;
  color: #666666;
`;





