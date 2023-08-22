import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { deleteItem, getListWhere } from '../utils/firebase';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { theme } from '../theme';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import { DriverRow } from '../components/DriverRow';
import { Message } from '../components/Message';

const TableHeader = styled.div`
  width: 97%;
  padding: 1em;
  display: flex;
  justify-content: space-between;
`;
const TableTitle = styled.h3`
  padding: 0.5em;
  font-weight: 500;
  font-size: 1.4rem;
`;
const TableButtons = styled.div`
  width: 15em;
  display: flex;
  justify-content: space-between;
  color: ${theme.COLORS.main};
`;

export const DriversPage = () => {
  const history = useHistory();
  const { user } = useUser();
  const [refresh, setRefresh] = useState(false);
  const [message, setMessage] = useState(null);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    async function fetchDrivers() {
      const list = await getListWhere('drivers', 'roomId', user.roomId);
      list.sort((a, b) => a.id - b.id);
      setDrivers(list);
    }
    fetchDrivers();
  }, [refresh, user.roomId]);

  const deleteHandler = async (id) => {
    try {
      await deleteItem('drivers', id);
      setMessage('Driver was successfully deleted');
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
      <TableHeader>
        <TableTitle>Drivers List</TableTitle>
        <TableButtons>
          <Button
            endIcon={<AddIcon />}
            color='inherit'
            onClick={() => history.push('/drivers/create')}
          >
            CREATE
          </Button>
          <Button
            endIcon={<RefreshIcon />}
            color='inherit'
            onClick={() => setRefresh(!refresh)}
          >
            REFRESH
          </Button>
        </TableButtons>
      </TableHeader>
      <Table aria-label='customized table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>SERVICE</TableCell>
            <TableCell align='center'>ID</TableCell>
            <TableCell align='center'>OWNER</TableCell>
            <TableCell align='center'>NAME</TableCell>
            <TableCell align='center'>STATUS</TableCell>
            <TableCell align='center'>VEHICLETYPE</TableCell>
            <TableCell align='center'>PHONE</TableCell>
            <TableCell align='center'>DIMENSIONS</TableCell>
            <TableCell align='center'>CAPACITY</TableCell>
            <TableCell align='center'>COORDS.LOCATION</TableCell>
            <TableCell align='center'>NOTE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers?.length ? (
            drivers.map((d, i) => (
              <DriverRow
                key={d.id}
                index={i}
                id={d.id}
                service={d.service}
                owner={d.owner}
                name={d.name}
                status={d.status}
                vehicleType={d.vehicleType}
                phone={d.phone}
                dimensions={d.dimensions}
                capacity={d.capacity}
                location={d.location}
                note={d.note}
                deleteHandler={deleteHandler}
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
