import zipcodes from "zipcodes";
import { queryObjectToStr } from "./other";

const MapToken = process.env.REACT_APP_MAP_TOKEN;
const MAP_API = "https://api.mapbox.com/directions/v5/mapbox";

const query = queryObjectToStr({
  geometries: "geojson",
  language: "en",
  overview: "simplified",
  steps: "true",
  access_token: MapToken,
});

const getRouteDataBetween = async (zip, driver) => {
  const { longitude: zipLng, latitude: zipLat } = zipcodes.lookup(zip);
  const { lng, lat } = driver;
  return fetch(`${MAP_API}/driving/${zipLng},${zipLat};${lng},${lat}?${query}`);
};

const getDistanceBetween = async (zip, driver) => {
  return getRouteDataBetween(zip, driver)
    .then((res) => res.json())
    .then((data) => data.routes[0].distance)
    .catch(() => null);
};

export const getRouteGeometryBetween = async (zip, driver) => {
  return getRouteDataBetween(zip, driver)
    .then((res) => res.json())
    .then((data) => data.routes[0].geometry)
    .catch(() => null);
};

export const getDriversByRadius = async (zipCode, drivers, radius) => {
  const nearZipCodes = zipcodes.radius(zipCode, radius);
  const nearDrivers = drivers.filter((driver) =>
    nearZipCodes.includes(driver.zipCode)
  );
  const driversWithDistance = await Promise.all(
    nearDrivers.map(async (driver) => ({
      distance: await getDistanceBetween(zipCode, driver),
      ...driver,
    }))
  );
  driversWithDistance.sort((a, b) => a.distance - b.distance);
  return driversWithDistance;
};
