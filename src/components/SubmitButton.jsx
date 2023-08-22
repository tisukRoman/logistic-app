import styled from 'styled-components';
import { theme } from '../theme';

const Button = styled.button`
  background-color: ${theme.COLORS.main};
  color: ${theme.COLORS.white};
  display: block;
  margin: 1em auto;
  font-weight: bold;
  border: none;
  border-radius: 0.1em;
  width: 90%;
  height: 36px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: ${theme.COLORS.light_main};
  }
`;

export const SubmitButton = () => {
  return <Button type='submit'>SUBMIT</Button>;
};
