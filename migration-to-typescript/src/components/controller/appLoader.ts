import { Loader } from './loader';

const NEWS_HOST = 'https://nodenews.herokuapp.com/';
const API_KEY = 'f4ef15da807845a4af2d94f84ed69045';

interface IAPIArticleSrc {
    id: string;
    name: string;
}

interface IAPIArticle {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: IAPIArticleSrc;
    title: string;
    url: string;
    urlToImage: string;
}

interface IAPISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface INewsResponse {
    articles: IAPIArticle[];
    status: string;
    totalResults: number;
}
export interface ISourcesResponse {
    sources: IAPISource[];
    status: string;
}

export enum Endpoint {
    Everything = 'everything',
    Sources = 'sources',
}

class AppLoader<T> extends Loader<T> {
    public constructor() {
        super(NEWS_HOST, { apiKey: API_KEY });
    }
}

export default AppLoader;
