export default class ChangelogService {
    private static instance: ChangelogService;

    static getInstance() {
        return this.instance || (this.instance = new this());
    }

    private constructor() {}

    showChangelog() {
        const version = GM_info.script.version;
        const lastVersion: string | undefined = GM_getValue('last_version');

        const splitVersion = version.split('-');
        if (splitVersion.length > 1 && splitVersion[1].startsWith('build')) {
            console.log('This is a dev version. Skip showing changelog.');
            return;
        }

        if (!lastVersion || version !== lastVersion) {
            const remote: string = GM_getValue('remote');
            const changelog = new URL(`/docs/changelog`, remote).toString();
            GM_openInTab(changelog, { active: true, setParent: true });

            GM_setValue('last_version', version);
        }
    }
}
