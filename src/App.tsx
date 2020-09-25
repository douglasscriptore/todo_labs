import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Header from './components/Header';
import Board from './components/Board';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <DndProvider backend={HTML5Backend}>
    <Header />
    <Board />
    <GlobalStyle />
  </DndProvider>
);

export default App;
