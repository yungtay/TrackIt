import styled from "styled-components"
import { useEffect, useState } from "react"
import Loader from "react-loader-spinner";
import axios from "axios"
export default function CreateHabits({props}) {
  const {habitsDays, setHabitsDays, creatingHabit,setCreatingHabit, hasUpdate, setHasUpdate, accountInformation } = props
  const [isLoading, setIsLoading] = useState(false)

    if(!creatingHabit) return ""
    return (
      <form onSubmit={submitHabit}>
        <CreateHabit loading={isLoading}>
          <input
            type="text"
            value={habitsDays.name}
            required
            onChange={(e) =>
              setHabitsDays({ ...habitsDays, name: e.target.value })
            }
            placeholder="nome do hábito"
          ></input>
          <WeekDay>
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
              <Day
                key={i}
  
                isSelected={
                  habitsDays.days.includes(i) ? "selected" : "notSelected"
                }
                onClick={() => selectDay(i)}
              >
                {d}
              </Day>
            ))}
          </WeekDay>
          <CancelSave>
            <Button loading={isLoading} type="reset" botao="cancel" onClick={() => setCreatingHabit(false) }>Cancelar</Button>
            <Button loading={isLoading} type="submit" botao="save">{" "}
          {isLoading ? (
            <Loader type="ThreeDots" color="white" height={35} width={40} />
          ) : (
            "Salvar"
          )}</Button>
          </CancelSave>
        </CreateHabit>
      </form>
    );

    function selectDay(d) {
      if(habitsDays.days.includes(d)){
          setHabitsDays({...habitsDays, days: habitsDays.days.filter((h) => h !== d)})
          return
      }
      setHabitsDays({...habitsDays, days: [...habitsDays.days, d]})
    }

    function submitHabit(e) {
      e.preventDefault();

      if(habitsDays.days.length === 0){
        alert('Escolha pelo menos 1 dias')
        return
      }

      setIsLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${accountInformation.token}` },
      };
      
      const request = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        habitsDays,
        config
      );
      request.then((response) => {
        alert("O hábito foi adicionado com sucesso !");
        setIsLoading(false);
        setHabitsDays({ name: "", days: [] });
        setCreatingHabit(false)
        setHasUpdate(true)
      });
      request.catch((response) => {
        alert("O hábito não foi adicionado tente novamente !")
        setIsLoading(false);
      });
    }

}

const CreateHabit = styled.div`
  
    border-radius: 5px;
    background: white;
  
    padding: 4.6%;
    margin-bottom: 29px;
  
    input {
      width: 100%;
      height: 45px;
  
      padding: 11px;
      margin-bottom: 8px;
  
      border: 1px solid #D5D5D5;
      border-radius: 5px;
      background: ${prop => prop.loading ? "#F2F2F2" : "white"};
      pointer-events: ${prop => prop.loading ? "none" : "initial"};
      opacity: ${prop => prop.loading ? 0.35 : 1};
  
      font-size: 20px;
    }
  
    input::placeholder{
        color: #DBDBDB;
    }
  `;

const Day = styled.div`
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #d4d4d4;
  border-radius: 5px;
  background: ${(prop) =>
    prop.isSelected === "selected" ? "#DBDBDB" : "white"};
  pointer-events: ${prop => prop.loading ? "none" : "initial"};

  margin-right: 4px;

  font-size: 20px;
  color: ${(prop) => (prop.isSelected === "selected" ? "white" : "#DBDBDB")};
`;

const CancelSave = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 84px;
  height: 35px;

  border-radius: 5px;
  border: 0 solid;
  opacity: ${prop => prop.loading ? 0.35 : 1};
  background: ${(prop) => (prop.botao === "cancel" ? "white" : "#52B6FF")};

  font-size: 16px;
  color: ${(prop) => (prop.botao === "save" ? "white" : "#52B6FF")};
`;

const Habit = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WeekDay = styled.div`
  display: flex;
  margin-bottom: 20px;

  ${Habit} + & {
      margin: 8px 0 0 0;
    }

`;

export {WeekDay, Day, CreateHabit, Habit} ;