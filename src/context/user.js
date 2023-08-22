import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export const UserContext = createContext();

const pathes = ['/login', '/drivers/create', '/drivers', '/users', '/map'];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const currentPath = history.location.pathname;
    if (!pathes.includes(currentPath)) {
      history.push('/');
    } else if (!user && pathes.includes(currentPath)) {
      history.push('/login');
    }
  }, [user, history]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
