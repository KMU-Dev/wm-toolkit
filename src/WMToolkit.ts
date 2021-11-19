import LeanPage from './learn/LearnPage';
import Application from './lib/Application';
import ChangelogService from './service/changelog.service';
import RemoteConfigService from './service/remote-config.service';
import TeachPage from './teach/TeachPage';

export default class WMToolkit extends Application {
    private readonly remoteConfigService = RemoteConfigService.getInstance();
    private readonly changelogService = ChangelogService.getInstance();

    onStart() {
        // register pages
        this.registerPage(TeachPage, '/teach/index.php');
        this.registerPage(LeanPage, '/learn/index.php');
    }

    async onStarted() {
        this.initStorage();

        await this.remoteConfigService.sync();
        this.changelogService.showChangelog();
    }

    private initStorage() {
        GM_getValue('remote') || GM_setValue('remote', 'https://wm.kmu.webzyno.com');
        GM_getValue('sync_interval') || GM_setValue('sync_interval', '30m');
        console.log('Storage initialized');
    }
}
