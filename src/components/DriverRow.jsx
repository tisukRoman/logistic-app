import { useHistory } from 'react-router-dom';
import { theme } from '../theme';
import { Button, makeStyles, TableCell, TableRow } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getIconByStatus } from '../utils/render';

const useStyles = makeStyles(() => ({
  mainBackground: {
    backgroundColor: theme.COLORS.second,
  },
  main: {
    color: theme.COLORS.main,
  },
  buttons: {
    display: 'flex',
  },
}));

export const DriverRow = (props) => {
  const styles = useStyles();
  const history = useHistory();
  const {
    index,
    id,
    service,
    owner,
    name,
    status,
    vehicleType,
    phone,
    dimensions,
    capacity,
    location,
    note,
    deleteHandler,
  } = props;

  return (
    <TableRow key={id} className={index % 2 ? styles.mainBackground : null}>
      <TableCell align='center'>
        {service ? <CheckIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell align='center'>{id}</TableCell>
      <TableCell align='center'>{owner}</TableCell>
      <TableCell align='center'>{name}</TableCell>
      <TableCell align='center'>
        <img src={getIconByStatus[status]} alt={status} />
      </TableCell>
      <TableCell align='center'>{vehicleType}</TableCell>
      <TableCell align='center'>{phone}</TableCell>
      <TableCell align='center'>{dimensions}</TableCell>
      <TableCell align='center'>{capacity}</TableCell>
      <TableCell align='center'>{location}</TableCell>
      <TableCell align='center'>{note}</TableCell>
      <TableCell align='center'>
        <div className={styles.buttons}>
          <Button onClick={() => history.push(`/drivers/${id}`)}>
            <EditIcon className={styles.main} />
          </Button>
          <Button onClick={() => deleteHandler(id)}>
            <DeleteIcon className={styles.main} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
