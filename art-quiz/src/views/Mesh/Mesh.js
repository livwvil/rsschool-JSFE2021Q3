import '@/views/Mesh/style.scss';
import Card from '@/components/Card/Card';

const MeshView = (cardsData, settingsManager, isScore = false) => {
  const mesh = document.createElement('div');
  mesh.classList.add('mesh');

  if (isScore) {
    mesh.classList.add('five-cells');
  }

  cardsData.forEach((card) => {
    const cardElem = Card(card);
    cardElem.addEventListener('mouseup', () => settingsManager.playSound('/assets/audio/click.wav'));
    mesh.append(cardElem);
  });

  return mesh;
};

export default MeshView;
