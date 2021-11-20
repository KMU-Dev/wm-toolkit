import Page from '../lib/Page';
import MoocHeaderFrame from './MoocHeaderFrame';
import VideoPlayerFrame from './VideoPlayerFrame';

export default class LeanPage extends Page {
    onDOMContentLoaded() {
        const sysbar = this.getFrameById('s_sysbar');
        const main = this.getFrameById('s_main');

        if (sysbar) {
            this.registerFrame(MoocHeaderFrame, sysbar, '/learn/mooc_header.php');
        }

        if (main) {
            this.registerFrame(VideoPlayerFrame, main, '/learn/path/player.php');
        }
    }
}
