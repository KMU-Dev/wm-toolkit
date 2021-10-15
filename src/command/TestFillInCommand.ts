import KeyboardCommandHandler from "./KeyboardCommandHandler";

export default class TestFillInCommand extends KeyboardCommandHandler {
    readonly handle = (document: Document, event: KeyboardEvent) => {
        if (!event.altKey || event.code !== 'KeyT') return;

        // set publish publish
        const mPublish = document.getElementById('sysRadioBtn7');
        mPublish?.click();

        // set test targets
        const mTargetEdit = document.getElementById('addACLbtn');
        mTargetEdit?.click();
        const mTargetTextarea = document.getElementById('extra_member') as HTMLTextAreaElement;
        const targets: string[] = GM_getValue('targets');
        mTargetTextarea.value = targets.join('\n');
        const mTargetName = document.getElementById('acl_caption[Big5]') as HTMLInputElement;
        mTargetName.value = 'block';
        const mTargetSetButton = document.querySelectorAll('input[value="確定"]')[1] as HTMLInputElement;
        mTargetSetButton.click();

        // set test count
        const mCount = document.getElementById('do_times') as HTMLInputElement;
        mCount.value = '0';

        // set announce type
        const changeEvent = new Event('change');
        const mAnnounceType = document.getElementById('announce_type') as HTMLSelectElement;
        mAnnounceType.options[1].selected = true;
        mAnnounceType.dispatchEvent(changeEvent);
        const mPublishType = document.getElementById('score_publish_type') as HTMLSelectElement;
        mPublishType.options[2].selected = true;
    }
}
