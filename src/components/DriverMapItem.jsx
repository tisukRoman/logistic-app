import { useState } from 'react';
import {
  getColorByType,
  getIconByStatus,
  metersToMiles,
} from '../utils/render';
import { getItem, updateItem } from '../utils/firebase';
import { Button, TextField } from '@material-ui/core';
import { theme } from '../theme';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

const Container = styled.div`
  width: 100%;
  padding: 1em;
  font-size: 0.9rem;
  border: 1px solid ${theme.COLORS.grey};
  position: relative;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: ${theme.COLORS.grey};
  }
`;
const Flex = styled.div`
  display: flex;
`;
const Table = styled.table`
  margin-top: 1em;
`;
const Row = styled.tr`
  line-height: 1.5em;
`;
const Value = styled.td`
  padding-left: 1.5em;
`;
const EditableRow = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 0.1em;
  line-height: 1.5em;
  margin-right: 2em;
`;
const Info = styled.div`
  font-size: 0.8rem;
  position: absolute;
  top: 50%;
  right: 5em;
  transform: translateY(-50%);
  width: 8em;
  height: 2em;
  font-weight: bold;
  text-align: center;
  line-height: 2em;
  color: #000;
`;
const VehicleType = styled.div`
  border-radius: 1em;
  background-color: ${({ vehicleType }) => getColorByType[vehicleType]};
  color: #fff;
`;

export const DriverMapItem = (props) => {
  const {
    id,
    name,
    location,
    dimensions,
    capacity,
    phone,
    note,
    vehicleType,
    distance,
    status,
    information,
    onClick,
    onRefresh,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [noteValue, setNoteValue] = useState(note);

  const onSave = async (e) => {
    if (e.type === 'click' || e.key === 'Enter') {
      try {
        const driver = await getItem('drivers', id);
        driver.note = noteValue;
        await updateItem('drivers', id, driver);
      } catch (err) {
        alert('Could not update driver note');
      }
      onRefresh();
      setEditMode(false);
    }
  };

  return (
    <Container onClick={onClick}>
      <h4>
        {id} {name}
      </h4>
      <Table>
        <tbody>
          <Row>
            <td>location:</td>
            <Value>{location || 'unkown'}</Value>
          </Row>
          <Row>
            <td>dimensions:</td>
            <Value>{dimensions || 'unkown'}</Value>
          </Row>
          <Row>
            <td>capacity:</td>
            <Value>{capacity || 'unkown'}</Value>
          </Row>
          <Row>
            <td>phone:</td>
            <Value>{phone || 'unkown'}</Value>
          </Row>
          <Row>
            <td>status:</td>
            <Value>
              {status ? (
                <img src={getIconByStatus[status]} alt={status} />
              ) : (
                'unkown'
              )}
            </Value>
          </Row>
          <Row>
            <td>information:</td>
            <Value>{information || 'unkown'}</Value>
          </Row>
          <Row>
            <td>note:</td>
            <Value>
              {!editMode ? (
                <EditableRow>
                  {noteValue || 'unknown'}{' '}
                  <Button onClick={() => setEditMode(true)}>
                    <EditIcon />
                  </Button>
                </EditableRow>
              ) : (
                <Flex>
                  <TextField
                    id='note'
                    type='text'
                    value={noteValue}
                    onChange={(e) => setNoteValue(e.target.value)}
                    onKeyPress={onSave}
                  />
                  <Button onClick={onSave}>
                    <CheckIcon />
                  </Button>
                </Flex>
              )}
            </Value>
          </Row>
        </tbody>
      </Table>
      <Info>
        <div>{metersToMiles(distance) || 0} mi</div>
        <VehicleType vehicleType={vehicleType}>
          {vehicleType || 'unknown'}
        </VehicleType>
      </Info>
    </Container>
  );
};
