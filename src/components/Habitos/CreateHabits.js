import styled from "styled-components"
export default function CreateHabits({props}) {
  const {habitsDays, setHabitsDays, creatingHabit} = props

    if(!creatingHabit) return ""
    return (
      <CreateHabit>
        <input type="text" value={habitsDays.habit} onChange={(e) => setHabitsDays({...habitsDays, habit:e.target.value})} placeholder="nome do hábito"></input>
        <WeekDay>
          {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
            <Day
              key={i+1}
              isSelected={habitsDays.days.includes(i+1) ? "selected" : "notSelected"}
              onClick={() => selectDay(i+1)}
            >
              {d}
            </Day>
          ))}
        </WeekDay>
        <CancelSave>
          <Button botao="cancel">Cancelar</Button> 
          <Button botao="save">Salvar</Button>
        </CancelSave>
      </CreateHabit>
    );

    function selectDay(d) {
      if(habitsDays.days.includes(d)){
          setHabitsDays({...habitsDays, days: habitsDays.days.filter((h) => h !== d)})
          return
      }
      setHabitsDays({...habitsDays, days: [...habitsDays.days, d]})
  }

}

const CreateHabit = styled.div`
    height: 180px;
  
    border-radius: 5px;
    background: white;
  
    padding: 18px;
    margin-bottom: 29px;
  
    input {
      width: 100%;
      height: 45px;
  
      padding: 11px;
      margin-bottom: 8px;
  
      border: 1px solid #D5D5D5;
      border-radius: 5px;
  
      font-size: 20px;
    }
  
    input::placeholder{
        color: #DBDBDB;
    }
  `;

  const WeekDay = styled.div`
  display: flex;
  margin-bottom: 29px
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
  background: ${(prop) => (prop.botao === "cancel" ? "white" : "#52B6FF")};

  font-size: 16px;
  color: ${(prop) => (prop.botao === "save" ? "white" : "#52B6FF")};
`;