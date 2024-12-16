import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routers/Router';
import { ThemeProvider } from '@emotion/react';
import { main } from './themes';
import GlobalStyles from './themes/global';

const App: FC = () => {
  return (
    <ThemeProvider theme={main}>
      <GlobalStyles>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </GlobalStyles>
    </ThemeProvider>
  );
};

export default App;
