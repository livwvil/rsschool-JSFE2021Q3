import type { IArticle } from 'components/view/news/news';
import type { ISource } from 'components/view/sources/sources';
import AppLoader, { Endpoint, INewsResponse, ISourcesResponse } from './appLoader';

class AppController {
    private newsLoader: AppLoader<INewsResponse>;
    private sourcesLoader: AppLoader<ISourcesResponse>;

    public constructor() {
        this.newsLoader = new AppLoader<INewsResponse>();
        this.sourcesLoader = new AppLoader<ISourcesResponse>();
    }

    public getSources(callback: (data?: ISource[]) => void): void {
        this.sourcesLoader.getResp({ endpoint: Endpoint.Sources }, (data) => {
            const srcs: ISource[] | undefined = data?.sources.map((src) => ({
                id: src.id,
                name: src.name,
            }));
            callback(srcs);
        });
    }

    public getNews(e: MouseEvent, callback: (data?: IArticle[]) => void): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer && target !== null && newsContainer !== null) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    this.newsLoader.getResp(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        (data) => {
                            const articles: IArticle[] | undefined = data?.articles.map((article) => ({
                                url: article.url,
                                description: article.description,
                                title: article.title,
                                publishedAt: article.publishedAt,
                                author: article.author,
                                sourceName: article.source.name,
                                urlToImage: article.urlToImage,
                            }));
                            callback(articles);
                        }
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
