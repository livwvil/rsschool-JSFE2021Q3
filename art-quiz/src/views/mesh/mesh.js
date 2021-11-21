import '@/views/Mesh/style.scss';
import Card from '@/components/Card/Card';

const MeshView = (cardsData) => {
  const mesh = document.createElement('div');
  mesh.classList.add('mesh');

  cardsData.forEach((card) => {
    mesh.append(Card(card));
  });

  return mesh;
};

export default MeshView;
