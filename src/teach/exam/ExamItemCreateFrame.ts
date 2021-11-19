import Frame from '../../lib/Frame';

export default class ExamItemCreateFrame extends Frame {
    onLoad() {
        this.document.addEventListener('keydown', this.handleKeydownEvent.bind(this));

        const createInput = this.document.evaluate(
            '/html/body/table/tbody/tr[2]/td/form[2]/table/tbody/tr[17]/td/input[2]',
            this.document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue as HTMLInputElement;
        createInput.addEventListener('click', this.handleCreateClick.bind(this));

        // restore category
        const isRepeat = this.getValue('exam.item.repeat', false);
        const record = this.getValue('exam.item.category') as CategoryRecord;
        if (isRepeat && record) {
            this.setCategory(record.version, record.volume, record.chapter, record.paragraph, record.section);
        }
    }

    private handleKeydownEvent(event: KeyboardEvent) {
        if (event.altKey) {
            const version = 10;
            const volume = 0;
            const section = GM_getValue<number>('block') - 1;
            switch (event.code) {
                case 'Digit1':
                    console.log('設定胚胎學');
                    this.setCategory(version, volume, '4', 1, section);
                    break;
                case 'Digit2':
                    console.log('設定微生物免疫學');
                    this.setCategory(version, volume, '4', 3, section);
                    break;
                case 'Digit3':
                    console.log('設定寄生蟲學');
                    this.setCategory(version, volume, '4', 4, section);
                    break;
                case 'Digit4':
                    console.log('設定公共衛生學');
                    this.setCategory(version, volume, '4', 5, section);
                    break;
                case 'Digit5':
                    console.log('設定臨床相關知識');
                    this.setCategory(version, volume, '4', 6, section);
                    break;
                case 'Digit6':
                    console.log('設定生理學');
                    this.setCategory(version, volume, '4', 7, section);
                    break;
                case 'Digit7':
                    console.log('設定藥理學');
                    this.setCategory(version, volume, '4', 9, section);
                    break;
                case 'Digit8':
                    console.log('設定病理學');
                    this.setCategory(version, volume, '4', 10, section);
                    break;
            }
        }
    }

    private handleCreateClick() {
        const mVersion = this.document.getElementsByName('version')[1] as HTMLSelectElement;
        const mVolume = this.document.getElementsByName('volume')[1] as HTMLSelectElement;
        const mChapter = this.document.getElementsByName('chapter')[1] as HTMLSelectElement;
        const mParagraph = this.document.getElementsByName('paragraph')[1] as HTMLSelectElement;
        const mSection = this.document.getElementsByName('section')[1] as HTMLSelectElement;
        const mRepeat = this.document.getElementsByName('repeat')[1] as HTMLInputElement;

        const record: CategoryRecord = {
            version: mVersion.selectedIndex,
            volume: mVolume.selectedIndex,
            chapter: mChapter.value,
            paragraph: mParagraph.selectedIndex,
            section: mSection.selectedIndex,
        };

        this.setValue('exam.item.category', record);
        this.setValue('exam.item.repeat', mRepeat.checked);
    }

    private setCategory(version: number, volume: number, category: string, paragraph: number, section: number) {
        const mVersion = this.document.getElementsByName('version')[1] as HTMLSelectElement;
        const mVolume = this.document.getElementsByName('volume')[1] as HTMLSelectElement;
        const mChapter = this.document.getElementsByName('chapter')[1] as HTMLSelectElement;

        // set question bank
        mVersion.options[version].selected = true;
        const event = new Event('change');
        mVersion.dispatchEvent(event);

        // set year
        mVolume.options[volume].selected = true;

        // set category
        mChapter.value = category;

        // set subject
        const mParagraph = this.document.getElementsByName('paragraph')[1] as HTMLSelectElement;
        mParagraph.options[paragraph].selected = true;

        // set block
        const mSection = this.document.getElementsByName('section')[1] as HTMLSelectElement;
        mSection.options[section].selected = true;
    }
}

interface CategoryRecord {
    version: number;
    volume: number;
    chapter: string;
    paragraph: number;
    section: number;
}
