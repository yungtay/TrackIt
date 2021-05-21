import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../../context/UserContext"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Footer(){

    const {habitsDay} = useContext(UserContext)
    const percentage = (habitsDay.reduce((acc, item) => item.done ? acc += 1/habitsDay.length : acc, 0)*100);

    return (
      <ContainerFooter>
        <Link to="/habitos">Hábitos</Link>
        <Link to="/hoje">
          <ContainerCircularProgressbar>
            <CircularProgressbar
              value={percentage}
              text={`Hoje`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#52B6FF",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent",
              })}
            />
          </ContainerCircularProgressbar>
        </Link>
        <Link to="/historic">Histórico</Link>
      </ContainerFooter>
    );
}

const ContainerFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 70px;
  background: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  color: #52B6FF;

`;

const ContainerCircularProgressbar = styled.div`
    width: 91px;
    height: 141px;
`


