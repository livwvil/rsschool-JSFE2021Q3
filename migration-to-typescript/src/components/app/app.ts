import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const srcsContainer: HTMLElement | null = document.querySelector('.sources');
        if (srcsContainer) {
            srcsContainer.addEventListener('click', (e: MouseEvent) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data))
            );
            this.controller.getSources((data) => this.view.drawSources(data));
            this.view.configureUI();
        }
    }
}

export default App;
