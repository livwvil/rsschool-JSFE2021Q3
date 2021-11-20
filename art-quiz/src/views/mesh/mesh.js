import '@/views/Mesh/style.scss';
import Card from '@/components/Card/Card';

const url = 'https://www.austenjewellers.co.uk/wp-content/uploads/2020/04/1-2.jpg';

const MeshView = () => {
  const mesh = document.createElement('div');
  mesh.classList.add('mesh');

  for (let i = 0; i < 12; i += 1) {
    mesh.append(
      Card(
        { name: 'Portrait', value: '5/10' },
        { url: Math.random() > 0.3 ? url : '', shouldFade: i > 99, highlightAnswerAs: Math.random() > 0.3 },
        {
          isActive: i > 1,
        },
      ),
    );
  }

  return mesh;
};

export default MeshView;
