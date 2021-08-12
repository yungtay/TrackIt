import { useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { FaCheckSquare } from 'react-icons/fa';

export default function Hoje() {
  const {
    accountInformation,
    habitsDay,
    setHabitsDay,
    hasUpdate,
    setHasUpdate,
  } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${accountInformation.token}` },
  };

  useEffect(() => {
    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/habits/today`,
      config
    );
    request.then((response) => {
      setHabitsDay(response.data);
      setHasUpdate(false);
    });
  }, [hasUpdate]);

  const currentDate = dayjs().locale('pt-br').format('dddd, DD/MM');
  const percentage =
    habitsDay.reduce(
      (acc, item) => (item.done ? (acc += 1 / habitsDay.length) : acc),
      0
    ) * 100;

  return (
    <ContainerToday>
      <Title>{currentDate}</Title>
      <Subtitle colorbool={percentage}>
        {habitsDay.length
          ? percentage !== 0
            ? `${percentage.toFixed(0)}% dos hábitos concluídos`
            : 'Nenhuma hábito concluído ainda'
          : 'Não há habitos para o dia atual'}
      </Subtitle>
      <HabitsToday>
        {habitsDay.map((h, index) => (
          <HabitToday key={index}>
            <HabitContainer key={index}>
              <HabitDescription key={index}>{h.name}</HabitDescription>
              <div>
                <HabitSequence key={index + '1'}>
                  Sequência atual:{' '}
                  <CurrentSequence colorbool={h.done}>
                    {h.currentSequence} dias
                  </CurrentSequence>
                </HabitSequence>
                <HabitSequence key={index + '2'}>
                  Seu recorde:{' '}
                  <HighestSequence
                    colorbool={
                      h.highestSequence !== 0 &&
                      h.currentSequence === h.highestSequence
                    }
                  >
                    {h.highestSequence} dias
                  </HighestSequence>
                </HabitSequence>
              </div>
            </HabitContainer>
            <FaCheckSquare
              key={h.id + '2'}
              size={66}
              color={h.done ? '#8FC549' : '#EBEBEB'}
              onClick={() => checkHabitDone(h.id, h.done)}
            />
          </HabitToday>
        ))}
      </HabitsToday>
    </ContainerToday>
  );

  function checkHabitDone(id, done) {
    if (!done) {
      habitDoneUndone(
        `${process.env.REACT_APP_API_BASE_URL}/habits/${id}/check`,
        'Houve um erro ao colocar como feito'
      );
    } else {
      habitDoneUndone(
        `${process.env.REACT_APP_API_BASE_URL}/habits/${id}/uncheck`,
        'Houve um erro ao colocar como não feito'
      );
    }
  }

  function habitDoneUndone(url, msg) {
    const request = axios.post(url, {}, config);
    request.then(() => {
      setHasUpdate(true);
    });
    request.catch(() => {
      alert(msg);
    });
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
  color: ${(prop) => (prop.colorbool ? '#8FC549' : '#bababa')};

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
  color: ${(prop) => (prop.colorbool ? '#8FC549' : '#666666')};
`;

const HighestSequence = styled.span`
  color: ${(prop) => (prop.colorbool ? '#8FC549' : '#666666')};
`;
