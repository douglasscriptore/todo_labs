import React, { useRef } from 'react';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';

import { Container, Label } from './styles';

interface ICardDTO {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

interface CardProps {
  data: ICardDTO;
  index: number;
}

interface IHoverProps extends DragObjectWithType {
  id: number;
  index: number;
}

const Card: React.FC<CardProps> = ({ data, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, dragRef] = useDrag({
    item: { id: data.id, index, type: 'CARD' },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item: IHoverProps, monitor) => {
      const draggedIndex = item.index;
      const targetIndex = index;
      if (draggedIndex === targetIndex) return;

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

        console.log(draggetTop);
      }
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels.map((label, index) => (
          <Label key={index} color={label} />
        ))}
      </header>

      <p>{data.content}</p>
      {!!data.user && <img src={data.user} alt="avatar" />}
    </Container>
  );
};

export default Card;
