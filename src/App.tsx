import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';

import Header from './components/Header';
import SweetAlert from './components/SweetAlert';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Routes />
        <SweetAlert />
        <GlobalStyle />
      </DndProvider>
    </AppProvider>
  </BrowserRouter>
);

export default App;
