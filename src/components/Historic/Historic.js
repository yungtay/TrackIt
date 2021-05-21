import styled from "styled-components"
export default function Historic() {
    return(
        <ContainerHistoric>
           <Title>Histórico</Title>
           Em breve você poderá ver o histórico dos seus hábitos aqui!
        </ContainerHistoric>
        
    )
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
