import { getItem } from './firebase';

export const queryObjectToStr = (obj) => {
  const entries = Object.entries(obj);
  return entries
    .reduce((acc, [key, value]) => {
      return acc + `${key}=${value}&`;
    }, '')
    .slice(0, -1);
};

export const validateCreateDriver = async (driver) => {
  if (!driver.id) {
    return 'Id field is required';
  }
  if (!driver.zipCode) {
    return 'ZipCode is required';
  }

  const isDriver = await getItem('drivers', driver.id);

  if (isDriver) {
    return 'Driver with such Id already exists';
  }

  return null; // No Errors
};

export const validateEditDriver = (driver) => {
  if (!driver.id) {
    return 'Id field is required';
  }
  if (!driver.zipCode) {
    return 'ZipCode is required';
  }
  return null;
};
