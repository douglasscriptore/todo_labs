import React from 'react';

import { BoardProvider } from './board';
import { SweetAlertProvider } from './sweetalert';
// import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <SweetAlertProvider>
    <BoardProvider>{children}</BoardProvider>
  </SweetAlertProvider>
);

export default AppProvider;
