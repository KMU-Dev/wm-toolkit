import Application from '../lib/Application';
import OfficePage from './OfficePage';

export default class WMToolkit extends Application {
    onStart() {
        // register pages
        this.registerPage(OfficePage, '/teach/index.php');
    }

    onStarted() {
        this.initStorage();
    }

    private initStorage() {
        GM_getValue('remote') || GM_setValue('remote', 'https://wm.kmu.webzyno.com');
        GM_getValue('sync_interval') || GM_setValue('sync_interval', '30m');
        console.log('Storage initialized');
    }
}
