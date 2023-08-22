import { Button, TableCell, TableRow } from '@material-ui/core';

export const UserRow = (props) => {
  const { authRole, onPasswordReset, name, email, role } = props;

  return (
    <TableRow>
      <TableCell align='center'>{name}</TableCell>
      <TableCell align='center'>{email}</TableCell>
      <TableCell align='center'>{role}</TableCell>
      <TableCell align='center'>
        <Button
          disabled={authRole !== 'admin'}
          onClick={() => onPasswordReset(email)}
        >
          RESET PASSWORD
        </Button>
      </TableCell>
    </TableRow>
  );
};
