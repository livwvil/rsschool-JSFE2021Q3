import News, { IArticle } from './news/news';
import Sources, { ISource } from './sources/sources';

export class AppView {
    private news: News;
    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public configureUI() {
        const burgerBtn: HTMLElement | null = document.querySelector('.burger');
        const sourcesMenu: HTMLElement | null = document.querySelector('.sources');

        if (burgerBtn && sourcesMenu) {
            const sourcerMenuToggler = (e: MouseEvent) => {
                burgerBtn.classList.toggle('active');
                sourcesMenu.classList.toggle('active');
                e.stopPropagation();
            };

            sourcesMenu.addEventListener('click', sourcerMenuToggler);
            burgerBtn.addEventListener('click', sourcerMenuToggler);
        }
    }

    public drawNews(articles: IArticle[] | undefined) {
        const values: IArticle[] = articles || [];
        this.news.draw(values);
    }

    public drawSources(sources: ISource[] | undefined) {
        const values: ISource[] = sources || [];
        this.sources.draw(values);
    }
}

export default AppView;
