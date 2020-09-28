import React from 'react';
import { useBoard } from '../../hooks/board';

import List from '../../components/List';

import { Container } from './styles';

const Board: React.FC = () => {
  const { lists } = useBoard();

  return (
    <Container>
      {!!lists &&
        lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
    </Container>
  );
};

export default Board;
