import type { Endpoint } from './appLoader';

interface LoaderOptions {
    apiKey: string;
}

interface RequestOptions {
    sources?: string;
}

type UrlOptions = LoaderOptions & RequestOptions;

type HttpMethod = 'GET' | 'POST';

interface RequestDestination {
    endpoint: Endpoint;
    options?: RequestOptions;
}

export class Loader<IResponseShape> {
    private baseLink: string;
    private options: LoaderOptions;

    private static readonly defRespCallback = () => {
        console.error('No callback for GET response');
    };

    public constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(src: RequestDestination, callback: (data?: IResponseShape) => void): void {
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

    private makeUrl(options: RequestOptions, endpoint: Endpoint): string {
        const urlOptions: UrlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof UrlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load(
        method: HttpMethod,
        endpoint: Endpoint,
        callback: (data?: IResponseShape) => void = Loader.defRespCallback,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: IResponseShape) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}
