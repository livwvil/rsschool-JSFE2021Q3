import AppLoader from './appLoader';
import { ResponseCallback } from './loader';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    public getNews(e: MouseEvent, callback: ResponseCallback): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer && target !== null && newsContainer !== null) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
