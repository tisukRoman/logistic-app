import { getItem, updateItem } from '../utils/firebase';
import { getColorByType } from '../utils/render';
import { useState } from 'react';
import { Marker, Popup } from 'react-map-gl';
import RoomIcon from '@material-ui/icons/Room';

export const DriverMarker = (props) => {
  const { id, name, phone, dimensions, location, note, lat, lng, vehicleType } =
    props;

  const [popup, setPopap] = useState(false);
  const [marker, setMarker] = useState([+lat, +lng]);

  const dragMarker = (e) => {
    setMarker([e.lngLat[1], e.lngLat[0]]);
  };

  const updateCoords = async () => {
    try {
      const driver = await getItem('drivers', id);
      driver.lat = String(marker[0]);
      driver.lng = String(marker[1]);
      await updateItem('drivers', id, driver);
    } catch (err) {
      alert('Could not update coordinates');
    }
  };

  return (
    <>
      {popup && (
        <Popup
          latitude={marker[0]}
          longitude={marker[1]}
          offsetLeft={20}
          offsetTop={-10}
          anchor='bottom-left'
          closeButton
          closeOnClick
          onClose={() => setPopap(false)}
        >
          <div>
            <div>id: {id || 'unknown'}</div>
            <div>name: {name || 'unknown'}</div>
            <div>phone: {phone || 'unknown'}</div>
            <div>dimensions: {dimensions || 'unknown'}</div>
            <div>location: {location || 'unknown'}</div>
            <div>note: {note || 'unknown'}</div>
          </div>
        </Popup>
      )}
      <Marker
        anchor='center'
        latitude={marker[0]}
        longitude={marker[1]}
        onDragEnd={updateCoords}
        onDrag={dragMarker}
        //draggable
      >
        <div style={{ cursor: 'pointer' }} onClick={() => setPopap(true)}>
          <RoomIcon htmlColor={getColorByType[vehicleType]} />
        </div>
      </Marker>
    </>
  );
};
