import { useEffect, useContext, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import UserContext from "../../context/UserContext"
import dayjs from "dayjs"
import "dayjs/locale/pt-br";
import { FaCheckSquare } from 'react-icons/fa'


export default function Hoje() {
  const { accountInformation,habitsDay, setHabitsDay, hasUpdate, setHasUpdate } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${accountInformation.token}` },
  };

  console.log(habitsDay)

  useEffect(() => {
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    request.then((response) => {
      setHabitsDay(response.data)
      setHasUpdate(false);;
    });
  }, [hasUpdate]);

  const currentDate = dayjs().locale("pt-br").format("dddd, DD/MM");
  const percentage = (habitsDay.reduce((acc, item) => item.done ? acc += 1/habitsDay.length : acc, 0)*100);
  console.log(habitsDay);

  if (!habitsDay.length) return "Não há nenhum hábito para o dia atual";

  return (
    <ContainerToday>
      <Title>{currentDate}</Title>
      <Subtitle color={percentage}>{percentage !== 0 ? `${percentage.toFixed(0)}% dos hábitos concluídos`:"Nenhuma hábito concluído ainda"}</Subtitle>
      <HabitsToday>
        {habitsDay.map((h) => (
          <HabitToday key={h.id}>
            <HabitContainer key={h.id + '1'}>
              <HabitDescription key={h.id}>{h.name}</HabitDescription>
              <div>
                <HabitSequence key={h.id + '1'}>
                  Sequência atual: <CurrentSequence color={h.done}>{h.currentSequence} dias</CurrentSequence> 
                </HabitSequence>
                <HabitSequence key={h.id + '2'}>
                  Seu recorde: <HighestSequence color={h.highestSequence !== 0 && h.currentSequence === h.highestSequence}>{h.highestSequence} dias</HighestSequence> 
                </HabitSequence>
              </div>
            </HabitContainer>
            <FaCheckSquare key={h.id + '2'} size={66} color={h.done ? "#8FC549" :"#EBEBEB"} onClick={() => checkHabitDone(h.id, h.done)}  />
          </HabitToday>
        ))}
      </HabitsToday>
    </ContainerToday>
  );

  function checkHabitDone(id, done) {
    if(!done){
        const request = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
            {}, config
          );
          request.then((response) => {
            setHasUpdate(true);
          });
          request.then((response) => {
            console.log(response.data);
          });
    } else {
        const request = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {},
            config
          );
          request.then((response) => {
            setHasUpdate(true);
          });
          request.then((response) => {
            console.log(response.data);
          });
    }
  }
}

const ContainerToday = styled.div`
  margin: 98px 0 121px 0;
  padding: 0 4.53%;
`;

const Title = styled.div`
  font-size: 23px;
  color: #126ba5;

  margin-bottom: 5px;
`;
const Subtitle = styled.div`
  font-size: 18px;
  color: ${prop => prop.color ? "#8FC549" : "#bababa" };

  margin-bottom: 28px;
`;

const HabitsToday = styled.div`
  display: flex;
  flex-direction: column;
`;

const HabitToday = styled.div`
  height: 94px;
  display: flex;
  justify-content: space-between;

  background: white;
  border-radius: 5px;

  padding: 4.12%;
  margin-bottom: 10px;
`;

const HabitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HabitDescription = styled.div`
  font-size: 20px;
  color: #666666;
`;

const HabitSequence = styled.div`
  font-size: 13px;
  color: #666666;
`;

const CurrentSequence = styled.span`
    color: ${prop => prop.color ? "#8FC549" : "#666666"};
`;

const HighestSequence = styled.span`
    color: ${prop => prop.color ? "#8FC549" : "#666666"};
`;