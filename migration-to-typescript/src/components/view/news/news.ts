import './news.css';

export interface IArticle {
    url: string;
    description: string;
    title: string;
    publishedAt: string;
    author: string;
    sourceName: string;
    urlToImage: string;
}

class News {
    draw(data: IArticle[]) {
        const news: IArticle[] = data.length >= 10 ? data.filter((_, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (!newsItemTemp) {
            return;
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            if (!newsClone) {
                return;
            }

            const newsItemElem: HTMLTemplateElement | null = newsClone.querySelector('.news__item');
            if (newsItemElem && idx % 2) {
                newsItemElem.classList.add('alt');
            }

            const metaPhotoElem: HTMLTemplateElement | null = newsClone.querySelector('.news__meta-photo');
            if (metaPhotoElem) {
                const img =
                    item.urlToImage && item.urlToImage !== 'null'
                        ? item.urlToImage
                        : 'assets/pic/no-image-available.jpeg';
                metaPhotoElem.style.backgroundImage = `url(${img})`;
            }

            const metaAuthorElem: HTMLTemplateElement | null = newsClone.querySelector('.news__meta-author');
            if (metaAuthorElem) {
                metaAuthorElem.textContent = item.author || item.sourceName;
            }

            const metaDateElem: HTMLTemplateElement | null = newsClone.querySelector('.news__meta-date');
            if (metaDateElem) {
                metaDateElem.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const descTitleElem: HTMLTemplateElement | null = newsClone.querySelector('.news__description-title');
            if (descTitleElem) {
                descTitleElem.textContent = item.title;
            }

            const descSourceElem: HTMLTemplateElement | null = newsClone.querySelector('.news__description-source');
            if (descSourceElem) {
                descSourceElem.textContent = item.sourceName;
            }

            const descContentElem: HTMLTemplateElement | null = newsClone.querySelector('.news__description-content');
            if (descContentElem) {
                descContentElem.textContent = item.description;
            }

            const readMoreElem: HTMLTemplateElement | null = newsClone.querySelector('.news__read-more a');
            if (readMoreElem) {
                readMoreElem.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer: HTMLTemplateElement | null = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
