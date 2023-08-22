import { updateItem } from './firebase';

export const setRoomIdforUsers = async (users, roomId) => {
  return Promise.all(
    users.map(async (user) => {
      await updateItem('users', user.id, { ...user, roomId });
    })
  )
};

export const setRoomIdforDrivers = async (drivers, roomId) => {
  return Promise.all(
    drivers.map(async (driver) => {
      await updateItem('drivers', driver.id, { ...driver, roomId });
    })
  )
};
