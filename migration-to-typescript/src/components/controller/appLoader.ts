import { Loader } from './loader';

class AppLoader extends Loader {
    public constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '734b317b7e464451b55540a26ac62b65',
        });
    }
}

export default AppLoader;
