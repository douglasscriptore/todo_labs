import React, { useRef, useCallback } from 'react';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';

import { MdRemove } from 'react-icons/md';
import { useBoard } from '../../hooks/board';
import { useSweetAlert } from '../../hooks/sweetalert';

import { Container, Label, Button } from './styles';

interface ICardDTO {
  id: string;
  content: string;
  labels?: string[];
  user?: string;
}

interface CardProps {
  data: ICardDTO;
  index: number;
  listIndex: number;
}

interface IHoverProps extends DragObjectWithType {
  id: number;
  index: number;
  listIndex: number;
}

const Card: React.FC<CardProps> = ({ data, index, listIndex }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { move, remove } = useBoard();
  const { open } = useSweetAlert();

  const [{ isDragging }, dragRef] = useDrag({
    item: { id: data.id, index, listIndex, type: 'CARD' },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item: IHoverProps, monitor) => {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      if (ref.current) {
        const targetSize = ref.current.getBoundingClientRect();

        const tagetCenter = (targetSize.bottom - targetSize.top) / 2;

        const draggedOffset = monitor.getClientOffset() || { y: 0 };

        const draggetTop = draggedOffset.y - targetSize.top;

        if (draggedIndex < targetIndex && draggetTop < tagetCenter) {
          return;
        }

        if (draggedIndex > targetIndex && draggetTop > tagetCenter) {
          // eslint-disable-next-line no-useless-return
          return;
        }

        move({
          from: draggedIndex,
          fromList: draggedListIndex,
          to: targetIndex,
          toList: targetListIndex,
        });

        item.index = targetIndex;
        item.listIndex = targetListIndex;
      }
    },
  });

  const handleRemove = useCallback(
    card_id => {
      open({
        type: 'warning',
        title: 'Remove this Card?',
        confirmBtnText: 'Yes',
        cancelBtnText: 'No',
        callback: {
          info: card_id,
          func: remove,
        },
      });
    },
    [open, remove],
  );

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels && data.labels.length > 0 ? (
          data.labels.map((label, indexData) => (
            <Label key={indexData} color={label} />
          ))
        ) : (
            <span />
          )}
        <Button onClick={() => handleRemove(data.id)}>
          <MdRemove fill="#fff" size="20px" />
        </Button>
      </header>

      <p>{data.content}</p>
      {!!data.user && <img src={data.user} alt="avatar" />}
    </Container>
  );
};

export default Card;
