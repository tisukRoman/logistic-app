import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { theme } from './theme';
import styled from 'styled-components';
import { MapPage } from './pages/MapPage';
import { LoginPage } from './pages/LoginPage';
import { UsersPage } from './pages/UsersPage';
import { DriversPage } from './pages/DriversPage';
import { CreateDriverPage } from './pages/CreateDriverPage';
import { EditDriverPage } from './pages/EditDriverPage';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/ErrorBoudary';
import { Header } from './components/Header';
import { Drawer } from './components/Drawer';

const Main = styled.main`
  background-color: ${theme.COLORS.grey};
  min-height: 96vh;
  display: flex;
`;

const Wrapper = styled.div`
  background-color: ${theme.COLORS.white};
  box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.1);
  min-width: 90%;
  height: 100%;
  margin: 1.5em auto;
`;

export const App = () => {
  const [drawer, setDrawer] = useState(false);

  const openDrawer = () => {
    setDrawer(true);
  };

  const closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <Switch>
      <Route exact path='/' component={NotFound} />
      <Route path='/login' component={LoginPage} />
      <Route>
        <ErrorBoundary>
          <Header openDrawer={openDrawer} />
          <Main onClick={closeDrawer}>
            <Drawer drawer={drawer} />
            <Wrapper>
              <Switch>
                <Route path='/drivers/create' component={CreateDriverPage} />
                <Route path='/drivers/:id' component={EditDriverPage} />
                <Route path='/drivers' component={DriversPage} />
                <Route path='/users' component={UsersPage} />
                <Route path='/map' component={MapPage} />
              </Switch>
            </Wrapper>
          </Main>
        </ErrorBoundary>
      </Route>
    </Switch>
  );
};
