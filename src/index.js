import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
