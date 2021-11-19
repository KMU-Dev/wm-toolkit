import Frame from './Frame';
import Page from './Page';

export default abstract class Context {
    private static readonly contexts: Context[] = [];

    protected readonly parent?: Context;

    constructor(parent?: Context) {
        this.parent = parent;
        Context.contexts.push(this);

        this.onCreate();
    }

    /**
     * Lifecycle callback
     */
    protected onCreate() {}

    /**
     * Lifecycle callback
     */
    protected onDestroy() {}

    protected startPage(PageType: typeof Page, parent: Context, window: Window) {
        const page = new PageType(parent, window);
        Context.contexts.push(page);
        return page;
    }

    protected destroyPage(PageType: typeof Page) {
        for (let i = 0; i < Context.contexts.length; i++) {
            const page = Context.contexts[i];
            if (page instanceof PageType) {
                page.onDestroy();
                delete Context.contexts[i];
                Context.contexts.splice(i, 1);
                break;
            }
        }
    }

    protected startFrame(FrameType: typeof Frame, parent: Context, window: Window) {
        const frame = new FrameType(parent, window);
        Context.contexts.push(frame);
        return frame;
    }

    protected destroyFrame(FrameType: typeof Frame) {
        for (let i = 0; i < Context.contexts.length; i++) {
            const frame = Context.contexts[i];
            if (frame instanceof FrameType) {
                frame.onDestroy();
                delete Context.contexts[i];
                Context.contexts.splice(i, 1);
                break;
            }
        }
    }
}
