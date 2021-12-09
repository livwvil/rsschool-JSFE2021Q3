import './sources.css';

export interface ISource {
    id: string;
    name: string;
}

class Sources {
    draw(data: ISource[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        if (!sourceItemTemp) {
            return;
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;
            if (!sourceClone) {
                return;
            }

            const itemNameElem: HTMLTemplateElement | null = sourceClone.querySelector('.source__item-name');
            if (itemNameElem) {
                itemNameElem.textContent = item.name;
            }

            const itemElem: HTMLTemplateElement | null = sourceClone.querySelector('.source__item');
            if (itemElem) {
                itemElem.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const srcsContainer: HTMLTemplateElement | null = document.querySelector('.sources');
        if (srcsContainer) {
            srcsContainer.innerHTML = '';
            srcsContainer.appendChild(fragment);
        }
    }
}

export default Sources;
