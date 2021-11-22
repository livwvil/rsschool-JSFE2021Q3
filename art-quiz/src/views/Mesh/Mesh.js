import '@/views/Mesh/style.scss';
import Card from '@/components/Card/Card';

const MeshView = (cardsData, isScore = false) => {
  const mesh = document.createElement('div');
  mesh.classList.add('mesh');

  if (isScore) {
    mesh.classList.add('five-cells');
  }

  cardsData.forEach((card) => {
    mesh.append(Card(card));
  });

  return mesh;
};

export default MeshView;
