import styled from "styled-components"
import Calendar from 'react-calendar'
import dayjs from "dayjs"
import { useEffect, useContext, useState } from "react"
import axios from "axios"
import UserContext from "../../context/UserContext";
import './Calendar.css'
export default function Historic() {

    const {accountInformation} = useContext(UserContext);
    const [habitsCalendar, setHabitsCalendar] = useState()

    useEffect(() => {

      const config = {
        headers: { Authorization: `Bearer ${accountInformation.token}` },
      };

      const requestHabits = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
        config
      );
      requestHabits.then((response) => {
        setHabitsCalendar(response.data);
      });

    }, []);

    if (!habitsCalendar) return "Carregando";
    const segura = habitsCalendar.map((h) => h.day)

  return (
    <ContainerHistoric>
      <Title>Histórico</Title>
      <Calendar
        locale="pt-br"
        calendarType="US"
        tileClassName={({ date }) =>
          segura.includes(dayjs(date).format("DD/MM/YYYY"))
            ? habitsCalendar[
                habitsCalendar.findIndex(
                  (d) => d.day === dayjs(date).format("DD/MM/YYYY")
                )
              ].habits.reduce((acc, d) => (!d.done ? false : acc))
              ? "react-calendar-tile-green"
              : "react-calendar-tile-red"
            : null
        }
        onClickDay={(date) =>
          segura.includes(dayjs(date).format("DD/MM/YYYY")) && ShowHabits(date)
        }
      />
      <HabitCalendarBottom>
      </HabitCalendarBottom>
    </ContainerHistoric>
  );

  function ShowHabits(date) {
    return (
      <div>
        {habitsCalendar[
          habitsCalendar.findIndex(
            (d) => d.day === dayjs(date).format("DD/MM/YYYY")
          )
        ].habits.map((h) => h.name)}
      </div>
    );
  }
}

const ContainerHistoric = styled.div`
  padding: 0 4.86%;
  margin: 98px 0 121px 0;

  font-size: 18px;
  color: #666666;
`;

const Title = styled.div`
  font-size: 23px;
  color: #126ba5;

  margin-bottom: 17px;
`;

const HabitCalendarBottom = styled.div`
margin-top: 20px;`









