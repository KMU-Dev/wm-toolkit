import ms from 'ms';
import yaml from 'js-yaml';

export default class RemoteConfigService {
    private configUrl: string;
    private syncInterval: number;
    private lastSync: Date | undefined;

    constructor() {
        const remote: string = GM_getValue('remote');
        this.configUrl = new URL('/configuration.yaml', remote).toString();
        this.syncInterval = ms(GM_getValue<string>('sync_interval'));
        this.lastSync = GM_getValue('last_sync') ? new Date(GM_getValue('last_sync')) : undefined;
    }

    async sync() {
        if (this.shouldSync()) {
            console.log('Start to sync remote config');

            const response = await fetch(this.configUrl);
            if (!response.ok) {
                console.error('Cannot GET configuration');
                return;
            }

            const configurationStr = await response.blob().then((blob) => blob.text());
            const configuration = yaml.load(configurationStr) as Record<string, unknown>;

            // load configuration to local storage
            for (const key in configuration) GM_setValue(key, configuration[key]);

            // set last sync date
            GM_setValue('last_sync', Date.now());

            console.log('Remote config sync successfully');
        } else console.log(`Remote config has been synced in ${this.lastSync}`);
    }

    private shouldSync() {
        const now = Date.now();
        return !this.lastSync || now - this.lastSync.getTime() > this.syncInterval;
    }
}
