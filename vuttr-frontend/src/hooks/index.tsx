import React from 'react';

import { AuthProvider } from './auth';
import { ModalProvider } from './modal';
import { ToolsProvider } from './tools';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ModalProvider>
      <ToolsProvider>{children}</ToolsProvider>
    </ModalProvider>
  </AuthProvider>
);

export default AppProvider;
