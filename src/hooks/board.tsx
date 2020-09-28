import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import produce from 'immer';
import { uuid } from 'uuidv4';

import { useSweetAlert } from './sweetalert';

import { loadLists } from '../services/api';

interface ICardDTO {
  id: string;
  content: string;
  labels?: string[];
  user?: string;
}

type IListDTO = Array<{
  title: string;
  creatable: boolean;
  done?: boolean;
  cards: ICardDTO[];
}>;

interface IBoardState {
  lists: IListDTO | undefined;
}

interface IMoveData {
  from: number;
  fromList: number;
  to: number;
  toList: number;
}

interface IBoardContextData {
  lists: IListDTO | undefined;
  move(data: IMoveData): void;
  add(content: string): void;
  remove(data: number): void;
}

const BoardContext = createContext<IBoardContextData>({} as IBoardContextData);

const BoardProvider: React.FC = ({ children }) => {
  const { open } = useSweetAlert();
  const [data, setData] = useState<IBoardState>(() => {
    const lists = localStorage.getItem('@TagoIO/Todo:list');

    if (lists) {
      return { lists: JSON.parse(lists) };
    }

    return { lists: loadLists() } as IBoardState;
  });

  const move = useCallback(
    ({ from, fromList, to, toList }) => {
      setData(
        produce(data, draft => {
          if (draft.lists) {
            const dragged = draft.lists[fromList].cards[from];

            draft.lists[fromList].cards.splice(from, 1);
            draft.lists[toList].cards.splice(to, 0, dragged);
          }
        }),
      );
    },

    [data],
  );

  const add = useCallback(
    content => {
      const newCard = {
        id: uuid(),
        content,
        labels: [],
        user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
      };
      if (data && !!data.lists) {
        setData({
          lists: data.lists?.map((list, index) =>
            index === 0
              ? { ...list, cards: [...list.cards, newCard] }
              : { ...list },
          ),
        });
      }
    },
    [data],
  );

  const remove = useCallback(
    card_id => {
      setTimeout(
        () => open({ title: 'Success', type: 'success', timeout: 2000 }),
        200,
      );
      setData({
        lists: data.lists?.map(list => ({
          ...list,
          cards: list.cards.filter(card => card.id !== card_id),
        })),
      });
    },
    [data.lists, open],
  );

  useEffect(() => {
    localStorage.setItem('@TagoIO/Todo:list', JSON.stringify(data.lists));
  }, [data.lists]);

  return (
    <BoardContext.Provider value={{ lists: data.lists, move, add, remove }}>
      {children}
    </BoardContext.Provider>
  );
};

function useBoard(): IBoardContextData {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error('useBoard must be used within an BoardProvider');
  }

  return context;
}

export { BoardProvider, useBoard };
