import ContextManager from './ContextManager';
import Frame from './Frame';
import Page from './Page';

export default abstract class Context {
    private static readonly pages: Page[] = [];
    private static readonly frames: Frame[] = [];

    protected readonly contextManager: ContextManager;
    protected readonly parent?: Context;

    constructor(parent?: Context) {
        this.contextManager = ContextManager.bind(this);
        this.parent = parent;
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
        Context.pages.push(page);
        return page;
    }

    protected destroyPage(PageType: typeof Page) {
        for (let i = 0; i < Context.pages.length; i++) {
            const page = Context.pages[i];
            if (page instanceof PageType) {
                page.onDestroy();
                delete Context.pages[i];
                Context.pages.splice(i, 1);
                break;
            }
        }
    }

    protected startFrame(FrameType: typeof Frame, parent: Context, window: Window) {
        const frame = new FrameType(parent, window);
        Context.frames.push(frame);
        return frame;
    }

    protected destroyFrame(FrameType: typeof Frame) {
        for (let i = 0; i < Context.frames.length; i++) {
            const frame = Context.frames[i];
            if (frame instanceof FrameType) {
                frame.onDestroy();
                delete Context.frames[i];
                Context.frames.splice(i, 1);
                break;
            }
        }
    }
}
