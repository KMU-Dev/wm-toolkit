import Frame from '../lib/Frame';
import { Message } from '../lib/type';
import VideoPlayerFrame from './VideoPlayerFrame';

export default class MoocHeaderFrame extends Frame {
    private readonly progressMap: Map<string, JQuery<HTMLProgressElement>> = new Map();

    onMessage(message: Message) {
        if (message.source instanceof VideoPlayerFrame) {
            switch (message.action) {
                case 'init': {
                    const url = message.value as string;
                    const progress = this.insertProgressBar();
                    this.progressMap.set(url, progress);
                    break;
                }
                case 'progress': {
                    const value = message.value as ProgressMessage;
                    const progress = this.progressMap.get(value.url);
                    progress?.val(value.progress);
                    break;
                }
                case 'finish': {
                    this.removeProgress();
                    break;
                }
            }
        }
    }

    private insertProgressBar(): JQuery<HTMLProgressElement> {
        $('ul.nav', this.document).append(`
            <li class="divider test" style=""></li>
            <li class="test"><span style="color: #707070">下載進度:</span>
                <progress id="progress" max="100" value="0"></progress>
            </li>
        `);

        return $('#progress', this.document);
    }

    private removeProgress() {
        $('.test', this.document).remove();
    }
}

interface ProgressMessage {
    readonly url: string;
    readonly progress: number;
}
