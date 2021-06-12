import CommandHandler from "../command/CommandHandler"
import DownloadVideoCommand from "../command/DownloadVideoCommand";

export default class Application {

    start() {
        // register commands
        this.registerCommand("下載影片", DownloadVideoCommand, "v");
    }

    private registerCommand(name: string, Handler: Type<CommandHandler>, accessKey: string) {
        const handler = new Handler();
        console.log(handler);
        GM_registerMenuCommand(name, handler.handle, accessKey);
    }
}

type Type<T extends CommandHandler> = {
    new (): T
};
