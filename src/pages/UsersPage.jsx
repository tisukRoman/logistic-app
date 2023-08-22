import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { getListWhere, resetPassword } from '../utils/firebase';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import styled from 'styled-components';
import { theme } from '../theme';
import { CreateUserModal } from './CreateUserModal';
import { UserRow } from '../components/UserRow';
import { Message } from '../components/Message';

const TableHeader = styled.div`
  color: ${theme.COLORS.main};
  width: 97%;
  padding: 1em;
  display: flex;
  justify-content: space-between;
`;
const TableTitle = styled.h3`
  color: #000;
  padding: 0.5em;
  font-weight: 500;
  font-size: 1.4rem;
`;

export const UsersPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchUsers() {
      const list = await getListWhere('users', 'roomId', user.roomId);
      setUsers(list);
    }
    fetchUsers();
  }, [refresh, user.roomId]);

  const onPasswordReset = async (email) => {
    try {
      await resetPassword(email);
      setMessage(`List was sent on ${email}`);
    } catch (err) {
      setMessage(err.message.split(': ')[1]);
    }
  };

  return (
    <TableContainer>
      <Message
        message={message}
        open={!!message}
        onClose={() => setMessage(null)}
      />
      <CreateUserModal modal={modal} setModal={setModal} />
      <TableHeader>
        <TableTitle>Users List</TableTitle>
        <div>
          <Button
            color='inherit'
            onClick={() => setModal(true)}
            disabled={user.role !== 'admin'}
          >
            CREATE USER
          </Button>
          <Button
            style={{ marginLeft: '1em' }}
            endIcon={<RefreshIcon />}
            color='inherit'
            onClick={() => setRefresh(!refresh)}
          >
            REFRESH
          </Button>
        </div>
      </TableHeader>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>NAME</TableCell>
            <TableCell align='center'>EMAIL</TableCell>
            <TableCell align='center'>ROLE</TableCell>
            <TableCell align='center'>ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.length ? (
            users.map((u) => (
              <UserRow
                key={u.id}
                id={u.id}
                name={u.name}
                email={u.email}
                role={u.role}
                password={u.password}
                authRole={user.role}
                onPasswordReset={onPasswordReset}
              />
            ))
          ) : (
            <TableRow>
              <TableCell align='center'>NO ITEMS...</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
