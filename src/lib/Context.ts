import Frame from './Frame';
import Page from './Page';
import { ContextType } from './type';

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
        return page;
    }

    protected startFrame(FrameType: typeof Frame, parent: Context, window: Window) {
        const frame = new FrameType(parent, window);
        return frame;
    }

    protected destroyContext(ContextType: ContextType) {
        for (let i = 0; i < Context.contexts.length; i++) {
            const context = Context.contexts[i];
            if (context instanceof ContextType) {
                context.onDestroy();
                delete Context.contexts[i];
                Context.contexts.splice(i, 1);
                break;
            }
        }
    }
}
