import styled from 'styled-components';
import { theme } from '../theme';
import MenuIcon from '@material-ui/icons/Menu';

const HeaderContainer = styled.header`
  background-color: ${theme.COLORS.main};
  width: 100vw;
  height: 4vh;
  padding: 1em;
`;

const HeaderContent = styled.div`
  font-size: 1.2rem;
  line-height: 4vh;
  display: flex;
  color: ${theme.COLORS.white};
`;

const MenuButton = styled.div`
  cursor: pointer;
`;

const Title = styled.div`
  line-height: 3.5vh;
  margin-left: 1em;
`;

export const Header = ({ openDrawer }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <MenuButton onClick={openDrawer}>
          <MenuIcon fontSize='medium' />
        </MenuButton>
        <Title>Logistics</Title>
      </HeaderContent>
    </HeaderContainer>
  );
};
