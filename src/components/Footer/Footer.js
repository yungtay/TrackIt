import styled from "styled-components"
import { Link } from "react-router-dom"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Footer(){

    const percentage = 65;
    return (
      <ContainerFooter>
        <Link>Hábitos</Link>
        <Link>
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
        <Link>Histórico</Link>
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
`;

const ContainerCircularProgressbar = styled.div`
    width: 91px;
    height: 141px;
`


