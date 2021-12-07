import AppController from '../controller/controller';
import { NewsResponse, SourcesResponse } from '../controller/loader';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const srcsContainer = document.querySelector('.sources') as HTMLElement;
        if (srcsContainer) {
            srcsContainer.addEventListener('click', (e) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data as NewsResponse))
            );
            this.controller.getSources((data) => this.view.drawSources(data as SourcesResponse));
        }
    }
}

export default App;
