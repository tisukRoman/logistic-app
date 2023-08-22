import zipcodes from 'zipcodes';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import styled from 'styled-components';
import { theme } from '../theme';
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@material-ui/core';
import { ErrorMessage } from '../components/ErrorMessage';
import { FormInput } from '../components/FormInput';
import { getItem, updateItem } from '../utils/firebase';
import { validateEditDriver } from '../utils/other';
import ListIcon from '@material-ui/icons/List';
import SaveIcon from '@material-ui/icons/Save';

const Header = styled.div`
  color: ${theme.COLORS.main};
  width: 97%;
  padding: 1em;
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h3`
  color: #000;
  padding: 0.5em;
  font-weight: 500;
  font-size: 1.4rem;
`;
const Container = styled.div`
  margin: 1em 0 3em 0;
  display: block;
  margin-left: 1.5em;
  max-width: 16em;
  border: 1px solid rgba(255, 255, 255);
`;
const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const useStyles = makeStyles(() => ({
  textField: {
    marginTop: '1.5em',
    width: '100%',
  },
  formControl: {
    marginTop: '1.5em',
    width: '100%',
  },
  save: {
    color: theme.COLORS.main,
  },
}));

export const EditDriverPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const driverId = useParams().id;
  const { user } = useUser();
  const [message, setMessage] = useState(null);
  const [driver, setDriver] = useState({
    service: false,
    roomId: user.roomId,
    id: '',
    dateav: '2022-04-14',
    owner: '',
    name: '',
    phone: '',
    vehicleType: '',
    dimensions: '',
    capacity: '',
    information: '',
    status: '',
    canada: '',
    email: '',
    home: '',
    zipCode: '',
    location: '',
    lat: '',
    lng: '',
    note: '',
  });

  useEffect(() => {
    getItem('drivers', driverId).then((data) => setDriver(data));
  }, [driverId]);

  const updateDriverForm = (e) => {
    setDriver({ ...driver, [e.target.name]: e.target.value });
  };

  const saveHandler = async () => {
    const error = validateEditDriver(driver);
    if (error) {
      setMessage(error);
      return;
    }
    await updateItem('drivers', driverId, driver);
    history.push('/drivers');
  };

  const getLocationByZip = (e) => {
    if (e.key === 'Enter') {
      const info = zipcodes.lookup(driver.zipCode);
      if (!info) {
        setMessage('ZipCode not found');
        return;
      }
      setDriver({
        ...driver,
        location: `${info.city}, ${info.state}, ${info.zip}`,
        lat: info.latitude,
        lng: info.longitude,
      });
    }
  };

  const onCloseMessage = () => {
    setMessage(null);
  };

  return (
    <>
      <ErrorMessage message={message} onClose={onCloseMessage} />
      <Header>
        <Title>Edit Driver</Title>
        <Button
          color='inherit'
          startIcon={<ListIcon />}
          onClick={() => history.push('/drivers')}
        >
          list
        </Button>
      </Header>
      <Container>
        <SwitchWrapper>
          <div>Service</div>
          <Switch
            color='primary'
            name='service'
            id='service_input'
            checked={driver.service}
            onChange={(e) =>
              setDriver({ ...driver, service: e.target.checked })
            }
          />
        </SwitchWrapper>
        <TextField
          className={classes.textField}
          name='id'
          id='id'
          label='Driver ID'
          type='text'
          value={driver.id}
          onChange={updateDriverForm}
        />
        <TextField
          className={classes.textField}
          name='dateav'
          id='date_input'
          label='Dateav'
          type='date'
          value={driver.dateav}
          onChange={updateDriverForm}
        />
        <FormInput
          className={classes.textField}
          name='owner'
          type='text'
          value={driver.owner}
          onChange={updateDriverForm}
          id='owner_input'
          label='Owner'
          error={false}
        />
        <FormInput
          className={classes.textField}
          name='name'
          type='text'
          value={driver.name}
          onChange={updateDriverForm}
          id='name_input'
          label='Name'
          error={false}
        />
        <FormInput
          className={classes.textField}
          name='phone'
          type='text'
          value={driver.phone}
          onChange={updateDriverForm}
          id='phone_input'
          label='Phone'
          error={false}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='vehicle-type'>Vehicle Type</InputLabel>
          <Select
            labelId='vehicle-type'
            id='vehicle_type_input'
            name='vehicleType'
            value={driver.vehicleType}
            onChange={updateDriverForm}
          >
            <MenuItem value={'Box Truck'}>Box Truck</MenuItem>
            <MenuItem value={'Large Straight'}>Large Straight</MenuItem>
            <MenuItem value={'Sprinter'}>Sprinter</MenuItem>
          </Select>
        </FormControl>
        <FormInput
          className={classes.textField}
          name='dimensions'
          type='text'
          value={driver.dimensions}
          onChange={updateDriverForm}
          id='dimensions_input'
          label='Dimensions'
          error={false}
        />
        <FormInput
          className={classes.textField}
          name='capacity'
          type='text'
          value={driver.capacity}
          onChange={updateDriverForm}
          id='capacity_input'
          label='Capacity'
          error={false}
        />
        <FormInput
          className={classes.textField}
          name='information'
          type='text'
          value={driver.information}
          onChange={updateDriverForm}
          id='information_input'
          label='Information'
          error={false}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id='status'>Status</InputLabel>
          <Select
            labelId='status'
            id='status_input'
            name='status'
            value={driver.status}
            onChange={updateDriverForm}
          >
            <MenuItem value={'No Border'}>No Border</MenuItem>
            <MenuItem value={'Green Card'}>Green Card</MenuItem>
            <MenuItem value={'Work authorisation'}>Work authorisation</MenuItem>
            <MenuItem value={'US Citizen'}>US Citizen</MenuItem>
          </Select>
        </FormControl>
        <FormInput
          className={classes.textField}
          name='canada'
          type='text'
          value={driver.canada}
          onChange={updateDriverForm}
          id='canada_input'
          label='Canada'
          error={false}
        />
        <FormInput
          className={classes.textField}
          name='email'
          type='email'
          value={driver.email}
          onChange={updateDriverForm}
          id='email_input'
          label='Email'
          error={false}
        />
        <FormInput
          className={classes.textField}
          name='home'
          type='text'
          value={driver.home}
          onChange={updateDriverForm}
          id='home_input'
          label='Home'
          error={false}
        />
        <FormInput
          className={classes.textField}
          onKeyPress={getLocationByZip}
          name='zipCode'
          type='text'
          value={driver.zipCode}
          onChange={updateDriverForm}
          id='zip_input'
          label='ZIP code'
          error={false}
        />
        <FormInput
          className={classes.textField}
          name='location'
          type='text'
          value={driver.location}
          onChange={updateDriverForm}
          id='location_input'
          label='Coords.location'
          error={false}
          disabled={user.role !== 'admin'}
        />
        <FormInput
          className={classes.textField}
          name='lat'
          type='text'
          value={driver.lat}
          onChange={updateDriverForm}
          id='lat_input'
          label='Coords.lat'
          error={false}
          disabled={user.role !== 'admin'}
        />
        <FormInput
          className={classes.textField}
          name='lng'
          type='text'
          value={driver.lng}
          onChange={updateDriverForm}
          id='lng_input'
          label='Coords.lng'
          error={false}
          disabled={user.role !== 'admin'}
        />
        <FormInput
          className={classes.textField}
          name='note'
          type='text'
          value={driver.note}
          onChange={updateDriverForm}
          id='note_input'
          label='Note'
          error={false}
        />
        <br />
        <br />
        <Button
          variant='outlined'
          className={classes.save}
          startIcon={<SaveIcon />}
          onClick={saveHandler}
        >
          SAVE
        </Button>
      </Container>
    </>
  );
};
