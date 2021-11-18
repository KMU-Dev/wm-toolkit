import Page from '../lib/Page';
import ExamFrame from './ExamFrame';

export default class OfficePage extends Page {
    onCreate() {
        console.log('OfficePage create.');
    }

    onDOMContentLoaded() {
        console.log('OfficePage DOMContent loaded.');

        const main = this.getFrameById('c_main');
        if (main) {
            this.registerFrame(main, '/teach/exam/item_maintain.php', ExamFrame);
        }
    }

    onLoad() {
        console.log('OfficePage load.');
    }

    beforeUnload() {
        console.log('OfficePage before unload.');
    }

    onUnload() {
        console.log('OfficePage unload.');
    }

    onDestroy() {
        console.log('OfficePage destroy.');
    }
}
