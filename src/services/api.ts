interface ICardDTO {
  id: number;
  content: string;
  labels: string[];
  user?: string;
}

type IListDTO = Array<{
  title: string;
  creatable: boolean;
  done?: boolean;
  cards: ICardDTO[];
}>;

export function loadLists(): IListDTO {
  return [
    {
      title: 'Tasks',
      creatable: true,
      cards: [
        {
          id: 1,
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          labels: ['#7159c1'],
          user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
        },
        {
          id: 2,
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget nisi pellentesqu.',
          labels: ['#7159c1'],
          user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
        },
        {
          id: 3,
          content: 'Fusce non bibendum lectus',
          labels: ['#7159c1'],
          user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
        },
        {
          id: 4,
          content: 'Suspendisse pharetra massa ut enim dignissim cursus.',
          labels: ['#54e1f7'],
          user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
        },
        {
          id: 5,
          content: 'Suspendisse pharetra massa ut enim dignissim cursus.',

          labels: ['#54e1f7'],
          user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
        },
      ],
    },
    {
      title: 'Doing',
      creatable: false,
      cards: [
        {
          id: 6,
          content:
            'Fusce non bibendum lectus. Cras et mauris mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris viverra sem lectus, at tincidunt justo mollis quis',
          labels: [],
          user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
        },
      ],
    },
    {
      title: 'Paused',
      creatable: false,
      cards: [
        {
          id: 7,
          content: ' Nam non laoreet felis. ',
          labels: ['#7159c1'],
          user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
        },
        {
          id: 8,
          content:
            ' Cras laoreet ac lacus sed consequat. Donec pellentesque urna purus',
          labels: ['#54e1f7'],
          user: 'https://api.adorable.io/avatars/216/abott@adorable.png',
        },
        {
          id: 9,
          content: 'Cras et interdum arcu',
          labels: [],
        },
      ],
    },
    {
      title: 'Finished',
      creatable: false,
      done: true,
      cards: [
        {
          id: 10,
          content: 'Nunc maximus massa ac tellus consequat rutrum',
          labels: [],
        },
        {
          id: 12,
          content: 'Phasellus aliquam eros at semper tempus',
          labels: ['#54e1f7'],
        },
        {
          id: 13,
          content:
            'Donec orci odio, mattis ut erat quis, luctus varius sapien. Etiam eu malesuada urna',
          labels: ['#7159c1'],
        },
      ],
    },
  ];
}
