import styled from "styled-components"
import { useEffect, useContext, useState } from "react"
import axios from "axios"
import UserContext from "../../context/UserContext"
import CreateHabits, {WeekDay, Day, CreateHabit, Habit} from "./CreateHabits"
import { BsTrash } from 'react-icons/bs'
export default function Habitos() {

    const {accountInformation, hasUpdate, setHasUpdate, setHabitsDay} = useContext(UserContext)
    const [myHabits, setMyHabits] = useState([])
    const [habitsDays, setHabitsDays] = useState({name: "", days: []})
    const [creatingHabit, setCreatingHabit] = useState(false)
    const msgNoHabit = "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"
    const config = { headers : {"Authorization" : `Bearer ${accountInformation.token}`}}

    useEffect(() => {
        const requestHabits = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        requestHabits.then((response) => {setMyHabits(response.data)})
        setHasUpdate(false)

        const requestTodayHabits = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            config
          );
          requestTodayHabits.then((response) => {
            setHabitsDay(response.data)
          });

    }, [hasUpdate])
    
    if(!myHabits) return "Carregando"


    return (
      <ContainerHabitos>
        <ContainerAdicionarHabitos>
          <span>Meus hábitos</span>
          <AdicionarHabitos onClick={() => setCreatingHabit(true)}>
            +
          </AdicionarHabitos>
        </ContainerAdicionarHabitos>
        <CreateHabits
          props={{
            habitsDays,
            setHabitsDays,
            creatingHabit,
            setCreatingHabit,
            hasUpdate,
            setHasUpdate,
            accountInformation,
          }}
        />

        <HabitosCadastrados>
          {myHabits.length
            ? myHabits.map((h, i) => (
                <CreateHabit key={i}>
                  <Habit key={h.id + i}>
                    {h.name}
                    <BsTrash onClick={() => deleteHabit(h.id)} />
                  </Habit>
                  <WeekDay key={i}>
                    {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
                      <Day
                        key={i}
                        isSelected={
                          h.days.includes(i) ? "selected" : "notSelected"
                        }
                      >
                        {d}
                      </Day>
                    ))}
                  </WeekDay>
                </CreateHabit>
              ))
            : msgNoHabit}
        </HabitosCadastrados>
      </ContainerHabitos>
    );

    function deleteHabit(id) {
      if (!window.confirm('Você tem certeza que quer deletar o hábito ?')) return;
      const config = {
        headers: { Authorization: `Bearer ${accountInformation.token}` },
      };
      const request = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        config
      );
      request.then((response) => {
        alert("Você deletou esse hábito");
        setHasUpdate(true);
      });
      request.catch((response) => alert("Ocorreu um erro, tente novamente"));
    }
}

const ContainerHabitos = styled.div`
  padding: 0 4.86%;
  margin: 98px 0 121px 0;
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








