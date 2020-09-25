import React, { BaseHTMLAttributes } from 'react';

import { MdAdd } from 'react-icons/md';
import Card from '../Card';

import { Container } from './styles';

interface ICardDTO {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

type IListDTO = {
  title: string;
  creatable: boolean;
  done?: boolean;
  cards: ICardDTO[];
};

interface ListProps {
  key: string;
  data: IListDTO;
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} index={index} data={card} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
