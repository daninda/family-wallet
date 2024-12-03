import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/Router';
import { ThemeProvider } from '@emotion/react';
import { main } from './themes';

const App: FC = () => {
  return (
    <ThemeProvider theme={main}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
