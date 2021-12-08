import { Loader } from './loader';

class AppLoader extends Loader {
    public constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '88c9d73f48d8415585b882260bc26516',
            // apiKey: '734b317b7e464451b55540a26ac62b65',
        });
    }
}

export default AppLoader;
