import Frame from '../../lib/Frame';

export default class ExamCreateFrame extends Frame {
    onLoad() {
        this.document.addEventListener('keydown', this.handleKeydownEvent.bind(this));
    }

    private handleKeydownEvent(event: KeyboardEvent) {
        if (!event.altKey || event.code !== 'KeyT') return;

        // set publish publish
        const mPublish = this.document.getElementById('sysRadioBtn7');
        mPublish?.click();

        // set test targets
        const mTargetEdit = this.document.getElementById('addACLbtn');
        mTargetEdit?.click();
        const mTargetTextarea = this.document.getElementById('extra_member') as HTMLTextAreaElement;
        const targets: string[] = GM_getValue('targets');
        mTargetTextarea.value = targets.join('\n');
        const mTargetName = this.document.getElementById('acl_caption[Big5]') as HTMLInputElement;
        mTargetName.value = 'block';
        const mTargetSetButton = this.document.querySelectorAll('input[value="確定"]')[1] as HTMLInputElement;
        mTargetSetButton.click();

        // set test count
        const mCount = this.document.getElementById('do_times') as HTMLInputElement;
        mCount.value = '0';

        // set announce type
        const changeEvent = new Event('change');
        const mAnnounceType = this.document.getElementById('announce_type') as HTMLSelectElement;
        mAnnounceType.options[1].selected = true;
        mAnnounceType.dispatchEvent(changeEvent);
        const mPublishType = this.document.getElementById('score_publish_type') as HTMLSelectElement;
        mPublishType.options[2].selected = true;
    }
}
