import styled from "styled-components"
export default function Habitos() {
    return(
        <ContainerHabitos>
            <ContainerAdicionarHabitos>
                <span>Meus hábitos</span>
                <AdicionarHabitos>+</AdicionarHabitos>
            </ContainerAdicionarHabitos>
            <HabitosCadastrados>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </HabitosCadastrados>
            
        </ContainerHabitos>
        
    )
}

const ContainerHabitos = styled.div`
  padding: 0 20px;
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