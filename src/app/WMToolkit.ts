import Application from '../lib/Application';
import OfficePage from './OfficePage';

export default class WMToolkit extends Application {
    onCreate() {
        console.log('Application created.');
    }

    onStart() {
        console.log('Application started.');

        // register pages
        this.registerPage(OfficePage, '/teach/index.php');
    }
}
