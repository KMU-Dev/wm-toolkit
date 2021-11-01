import KeyboardCommandHandler from './KeyboardCommandHandler';

export default class SetCategoryCommand extends KeyboardCommandHandler {
    readonly handle = (document: Document, event: KeyboardEvent) => {
        if (event.altKey) {
            const block: number = GM_getValue('block');
            switch (event.code) {
                case 'Digit1':
                    console.log('設定胚胎學');
                    this.setCategory(document, '4', 1, block);
                    break;
                case 'Digit2':
                    console.log('設定微生物免疫學');
                    this.setCategory(document, '4', 3, block);
                    break;
                case 'Digit3':
                    console.log('設定寄生蟲學');
                    this.setCategory(document, '4', 4, block);
                    break;
                case 'Digit4':
                    console.log('設定公共衛生學');
                    this.setCategory(document, '4', 5, block);
                    break;
                case 'Digit5':
                    console.log('設定臨床相關知識');
                    this.setCategory(document, '4', 6, block);
                    break;
                case 'Digit6':
                    console.log('設定生理學');
                    this.setCategory(document, '4', 7, block);
                    break;
                case 'Digit7':
                    console.log('設定藥理學');
                    this.setCategory(document, '4', 9, block);
                    break;
                case 'Digit8':
                    console.log('設定病理學');
                    this.setCategory(document, '4', 10, block);
                    break;
            }
        }
    };

    private readonly setCategory = (document: Document, category: string, subjectIndex: number, block: number) => {
        const mVersion = document.getElementsByName('version')[1] as HTMLSelectElement;
        const mChapter = document.getElementsByName('chapter')[1] as HTMLSelectElement;

        // set question bank
        mVersion.options[10].selected = true;
        const event = new Event('change');
        mVersion.dispatchEvent(event);

        // set category
        mChapter.value = category;

        // set subject
        const mParagraph = document.getElementsByName('paragraph')[1] as HTMLSelectElement;
        mParagraph.options[subjectIndex].selected = true;

        // set block
        const mSection = document.getElementsByName('section')[1] as HTMLSelectElement;
        mSection.options[block - 1].selected = true;
    };

    private sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
