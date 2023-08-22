import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { theme } from '../theme';
import styled from 'styled-components';
import { getItem, login } from '../utils/firebase';
import { Message } from '../components/Message';
import { FormInput } from '../components/FormInput';
import { SubmitButton } from '../components/SubmitButton';

const Background = styled.div`
  background-color: ${theme.COLORS.main};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormContainer = styled.div`
  background-color: ${theme.COLORS.white};
  width: 300px;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
`;
const InputsContainer = styled.div`
  padding: 0px 1em 1em;
`;

export const LoginPage = () => {
  const history = useHistory();
  const [message, setMessage] = useState(null);
  const { setUser } = useUser();

  const [username, setUsername] = useState({
    value: '',
    error: false,
  });
  const [password, setPassword] = useState({
    value: '',
    error: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username.value.trim()) {
      setUsername({ ...username, error: true });
    }
    if (!password.value.trim()) {
      setPassword({ ...password, error: true });
    }
    if (username.value.trim() && password.value.trim()) {
      try {
        const { user } = await login(
          username.value.trim(),
          password.value.trim()
        );
        const userData = await getItem('users', user.uid);
        setUser(userData);
        history.push('/drivers');
      } catch (err) {
        setMessage(err.message.split(': ')[1]);
      }
    }
  };

  const changeUsername = (e) => {
    setUsername({ error: false, value: e.target.value });
  };

  const changePassword = (e) => {
    setPassword({ error: false, value: e.target.value });
  };

  return (
    <Background>
      <Message
        message={message}
        open={!!message}
        onClose={() => setMessage(null)}
      />
      <FormContainer>
        <form onSubmit={submitHandler}>
          <InputsContainer>
            <FormInput
              type='email'
              onChange={changeUsername}
              value={username.value}
              error={username.error}
              id='username'
              label='username'
            />
            <FormInput
              type='password'
              onChange={changePassword}
              value={password.value}
              error={password.error}
              id='password'
              label='password'
            />
          </InputsContainer>
          <SubmitButton />
        </form>
      </FormContainer>
    </Background>
  );
};
