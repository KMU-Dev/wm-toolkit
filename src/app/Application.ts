import CommandHandler from "../command/CommandHandler"
import DownloadVideoCommand from "../command/DownloadVideoCommand";
import KeyboardCommandHandler from "../command/KeyboardCommandHandler";
import SetCategoryCommand from "../command/SetCategoryCommand";
import TestFillInCommand from "../command/TestFillInCommand";
import RemoteConfigService from "../service/remote-config.service";

export default class Application {

    private readonly remoteConfigService: RemoteConfigService;

    constructor() {
        // init storage
        this.initStorage();
        
        this.remoteConfigService = new RemoteConfigService();
    }

    async start() {
        // sync remote config
        await this.remoteConfigService.sync();

        // register commands
        this.registerCommand("下載影片", DownloadVideoCommand, "v");

        // register keyboard commands
        this.registerKeyboardCommandInCMain(SetCategoryCommand, TestFillInCommand);

        // remove winlock
        this.removeWinlock();
    }

    private initStorage() {
        GM_getValue('remote') || GM_setValue('remote', 'https://wm.kmu.webzyno.com');
        GM_getValue('sync_interval') || GM_setValue('sync_interval', '30m');
        console.log('Storage initialized');
    }

    private registerCommand(name: string, Handler: Type<CommandHandler>, accessKey: string) {
        const handler = new Handler();
        GM_registerMenuCommand(name, handler.handle, accessKey);
    }

    private registerKeyboardCommandInCMain(...Handlers: KeyboardCommandType[]) {
        const frame = document.getElementById('c_main') as HTMLFrameElement;
        if (!frame) {
            console.warn('Cannot find c_main frame');
            return;
        }

        frame.addEventListener('load', () => {
            const frameDocument = frame.contentWindow?.document;
            if (!frameDocument) {
                console.warn('Cannot get c_main document');
                return;
            }

            frameDocument.addEventListener('keydown', (event) => {
                for (const Handler of Handlers) {
                    const handler = new Handler();
                    handler.handle(frameDocument, event);
                }
            })
        });
    }

    private removeWinlock() {
        if (window.location.pathname === "/learn/exam/exam_start.php") {
            console.log("Exam started.");

            new MutationObserver((_, observer) => {
                const winlockScript = document.querySelector('script[src*="winlock"]');
                if (winlockScript) {
                    winlockScript.remove();
                    observer.disconnect();
                }
            }).observe(document, { childList: true, subtree: true});
        }
    }
}

type Type<T extends CommandHandler> = {
    new (): T
};

type KeyboardCommandType<T extends KeyboardCommandHandler = KeyboardCommandHandler> = {
    new (): T
};
