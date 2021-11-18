import Frame from '../lib/Frame';

export default class ExamFrame extends Frame {
    onCreate() {
        console.log('ExamFrame create.');
    }

    onDOMContentLoaded() {
        console.log('ExamFrame DOMContent loaded.');
        console.log(this.location);
    }

    onLoad() {
        console.log('ExamFrame load.');
    }

    beforeUnload() {
        console.log('ExamFrame before unload.');
    }

    onUnload() {
        console.log('ExamFrame unload.');
    }

    onDestroy() {
        console.log('ExamFrame destroy.');
    }
}
