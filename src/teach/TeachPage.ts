import Page from '../lib/Page';
import ExamCreateFrame from './exam/ExamCreateFrame';
import ExamItemCreateFrame from './exam/ExamItemCreateFrame';

export default class TeachPage extends Page {
    onDOMContentLoaded() {
        const main = this.getFrameById('c_main');
        if (main) {
            this.registerFrame(ExamCreateFrame, main, '/teach/exam/exam_create.php');
            this.registerFrame(ExamItemCreateFrame, main, '/teach/exam/item_create.php');
        }
    }
}
