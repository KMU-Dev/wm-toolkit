import CommandHandler from "../command/CommandHandler"
import DownloadVideoCommand from "../command/DownloadVideoCommand";

export default class Application {

    start() {
        // register commands
        this.registerCommand("下載影片", DownloadVideoCommand, "v");

        // remove winlock
        this.removeWinlock();
    }

    private registerCommand(name: string, Handler: Type<CommandHandler>, accessKey: string) {
        const handler = new Handler();
        GM_registerMenuCommand(name, handler.handle, accessKey);
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
