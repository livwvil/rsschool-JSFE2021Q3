import '@/views/Mesh/style.scss';
import Card from '@/components/Card/Card';

const cards = [
  {
    caption: null,
    image: {
      url: '/assets/img/77.jpg',
      shouldFade: false,
    },
    popup: {
      desc: {
        title: 'Girl with a Pearl Earring',
        text: 'Johannes Vermeer, 1665',
      },
    },
    href: null,
  },
  {
    caption: null,
    image: {
      url: '/assets/img/4.jpg',
      shouldFade: true,
    },
    popup: {
      desc: {
        title: 'Girl with a Pearl Earring',
        text: 'Johannes Vermeer, 1665',
      },
    },
    href: null,
  },
];
const MeshView = (cardsData, isScore = false) => {
  const mesh = document.createElement('div');
  mesh.classList.add('mesh');

  if (isScore) {
    mesh.classList.add('five-cells');
    cardsData.forEach((card) => {
      mesh.append(Card({
        caption: null,
        image: {
          url: card.href,
          shouldFade: !card.guessed,
        },
        popup: {
          desc: {
            title: card.name,
            text: `${card.author}, ${card.year}`,
          },
        },
        href: null,
      }));
    });
  } else {
    cardsData.forEach((card) => {
      mesh.append(Card(card));
    });
  }

  return mesh;
};

export default MeshView;
