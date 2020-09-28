import React, { useCallback, useEffect } from 'react';

import { MdAdd } from 'react-icons/md';
import { useSweetAlert } from '../../hooks/sweetalert';
import { useBoard } from '../../hooks/board';

import Card from '../Card';

import { Container } from './styles';

interface ICardDTO {
  id: string;
  content: string;
  labels?: string[];
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
  index: number;
  data: IListDTO;
}

const List: React.FC<ListProps> = ({ data, index: listIndex }) => {
  const { open } = useSweetAlert();
  const { add } = useBoard();
  const handleAdd = useCallback(() => {
    open({
      input: true,
      title: 'Add new card',
      cancelBtnText: 'Cancel',
      confirmBtnText: 'Save',
      callback: {
        info: listIndex,
        func: add,
      },
    });
  }, [add, listIndex, open]);

  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button" onClick={() => handleAdd()}>
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card, index) => (
          <Card key={card.id} index={index} listIndex={listIndex} data={card} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
