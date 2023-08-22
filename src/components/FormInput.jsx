import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { theme } from '../theme';

const InputContainer = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const useStyles = makeStyles(() => ({
  input: {
    marginTop: '1.5em',
    width: '100%',
  },
  error: {
    width: '100%',
    borderColor: theme.COLORS.danger,
  },
}));

export const FormInput = (props) => {
  const { name, type, value, onChange, id, label, placeholder, error, disabled } = props;
  const styles = useStyles();

  return (
    <>
      <InputContainer>
        <TextField
          className={error ? styles.error : styles.input}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          id={id}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={error && 'required'}
          disabled={disabled}
          {...props}
        />
      </InputContainer>
    </>
  );
};
