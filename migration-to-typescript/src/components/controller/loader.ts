type LoaderOptions = {
    apiKey: string;
};

type RequestOptions = {
    sources?: string;
};

type OptionsMerged = LoaderOptions & RequestOptions;

type RequestSource = {
    endpoint: string;
    options?: RequestOptions;
};

type NewsSource = {
    id: string;
    name: string;
};

export type Article = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: NewsSource;
    title: string;
    url: string;
    urlToImage: string;
};

export type NewsResponse = {
    articles: Article[];
    status: string;
    totalResults: number;
};

export type SourceDesc = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type SourcesResponse = {
    sources: SourceDesc[];
    status: string;
};

type HttpMathod = 'GET' | 'POST';

export type ResponseCallback = (data?: NewsResponse | SourcesResponse) => string | void;

export class Loader {
    private baseLink: string;
    private options: LoaderOptions;
    private static defRespCallback = () => {
        console.error('No callback for GET response');
    };

    public constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(src: RequestSource, callback: ResponseCallback = Loader.defRespCallback): void {
        this.load('GET', src.endpoint, callback, src.options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: OptionsMerged = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof OptionsMerged]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: HttpMathod, endpoint: string, callback: ResponseCallback, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}
