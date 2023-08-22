import { useState, useRef, useEffect } from 'react';
import Map, { Layer, Source } from 'react-map-gl';
import styled from 'styled-components';
import { theme } from './../theme';
import { getDriversByRadius, getRouteGeometryBetween } from '../utils/mapbox';
import { getListWhere } from '../utils/firebase';
import { TextField, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { DriverMapItem } from '../components/DriverMapItem';
import { DriverMarker } from '../components/DriverMarker';
import { ErrorMessage } from '../components/ErrorMessage';
import { SkeletonLoader } from '../components/Skeleton';
import { useUser } from '../hooks/useUser';

const Container = styled.div`
  background-color: ${theme.COLORS.grey};
  width: 100%;
  display: flex;
  height: 48em;
  justify-content: space-between;
`;
const ZipContainer = styled.div`
  background-color: ${theme.COLORS.white};
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1);
  width: 29%;
  height: 100%;
  overflow: hidden;
`;
const InputWrapper = styled.div`
  background-color: ${theme.COLORS.grey};
  width: 100%;
  height: 3em;
  padding: 0.5em;
  display: flex;
`;
const MapContainer = styled.div`
  background-color: ${theme.COLORS.main};
  box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.1);
  width: 70%;
  height: 100%;
`;
const DriversList = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 100%; ;
`;
const Space = styled.div`
  height: 60px;
`;

export const MapPage = () => {
  const mapRef = useRef();
  const [refresh, setResfresh] = useState(false);
  const [zip, setZip] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [searchedDrivers, setSearchedDrivers] = useState([]);
  const [geometry, setGeometry] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function fetchDrivers() {
      const list = await getListWhere('drivers', 'roomId', user.roomId);
      setDrivers(list);
    }
    fetchDrivers();
  }, [user.roomId, refresh]);

  const onSearch = async (e) => {
    if (zip && (e.key === 'Enter' || e.type === 'click')) {
      setSearchedDrivers([]);
      setLoading(true);
      const searchedDrivers = await getDriversByRadius(zip, drivers, 250);
      if (searchedDrivers?.length) {
        setSearchedDrivers(searchedDrivers);
      } else {
        setMessage(`Drivers not found`);
      }
      setLoading(false);
    }
  };

  const onSelect = async (driver) => {
    const geo = await getRouteGeometryBetween(zip, driver);
    mapRef?.current?.getMap().flyTo({
      center: [driver.lng, driver.lat],
      duration: 1000,
      zoom: 12,
    });
    setGeometry(geo);
  };

  const onClear = () => {
    setZip('');
    setGeometry(null);
    setSearchedDrivers([]);
    mapRef?.current?.getMap().flyTo({
      center: [-100.4376, 37.7577],
      duration: 2000,
      zoom: 3,
    });
  };

  const onCloseMessage = () => {
    setMessage(null);
  };

  return (
    <Container>
      <ErrorMessage message={message} onClose={onCloseMessage} />
      <ZipContainer>
        <InputWrapper>
          <TextField
            onKeyPress={onSearch}
            onChange={(e) => setZip(e.target.value)}
            value={zip}
            label='ZIP code'
            fullWidth
          />
          <Button onClick={onSearch}>
            <SearchIcon />
          </Button>
          <Button onClick={onClear}>
            <ClearIcon />
          </Button>
        </InputWrapper>
        <DriversList>
          {loading && <SkeletonLoader />}
          {searchedDrivers
            .filter((d) => d.service === true)
            .map((d) => (
              <DriverMapItem
                onClick={() => onSelect(d)}
                onRefresh={() => setResfresh(!refresh)}
                key={d?.id}
                id={d?.id}
                name={d?.name}
                location={d?.location}
                dimensions={d?.dimensions}
                capacity={d?.capacity}
                phone={d?.phone}
                status={d?.status}
                information={d?.information}
                note={d?.note}
                vehicleType={d?.vehicleType}
                distance={d?.distance}
              />
            ))}
          <Space />
        </DriversList>
      </ZipContainer>
      <MapContainer>
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: 37.7577,
            longitude: -100.4376,
            zoom: 3,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        >
          {drivers
            .filter((d) => d.service === true)
            .map((d) => (
              <DriverMarker
                key={d.id}
                id={d?.id}
                name={d?.name}
                phone={d?.phone}
                dimensions={d?.dimensions}
                location={d?.location}
                lat={d?.lat}
                lng={d?.lng}
                note={d?.note}
                vehicleType={d?.vehicleType}
              />
            ))}
          {
            <Source
              id='polylineLayer'
              type='geojson'
              data={{
                type: 'Feature',
                properties: {},
                geometry: geometry,
              }}
            >
              <Layer
                id='lineLayer'
                type='line'
                source='my-data'
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': '#f00',
                  'line-width': 5,
                }}
              />
            </Source>
          }
        </Map>
      </MapContainer>
    </Container>
  );
};
