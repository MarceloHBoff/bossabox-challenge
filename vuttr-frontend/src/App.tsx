import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';
import Routes from './routes';
import { GlobalStyle, AppContainer } from './styles';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContainer>
          <Routes />
        </AppContainer>
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
