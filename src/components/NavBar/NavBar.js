import styled from 'styled-components';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

export default function NavBar() {
  const { accountInformation } = useContext(UserContext);

  if (!accountInformation) return 'Carregando';

  return (
    <Top>
      TrackIt
      <UserImage image={accountInformation.image} />
    </Top>
  );
}

const Top = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 70px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px;

  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  font-size: 39px;
  font-family: 'Playball', cursive;
  color: white;
`;
const UserImage = styled.div`
  width: 51px;
  height: 51px;
  border-radius: 99px;
  background-image: url(${(prop) => prop.image});
  background-size: cover;
`;
