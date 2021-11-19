import Frame from './Frame';
import Page from './Page';
import { ContextType, Message } from './type';
import set from 'lodash/set';
import get from 'lodash/get';

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

    /**
     * Callback method fired when this context recieve a message.
     * @param source The context that sends the brodcast this message
     * @param message The message body
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected onMessage(message: Message) {}

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

    /**
     * Broadcast message to target Context.
     * @param ContextTypes Valid value includes special character '*' or an array containing target Context
     * @param action The action of the message.
     * @param value The message body. Object, string, number, boolean is allowed.
     */
    protected broadcastMessage(ContextTypes: string | ContextType[], action: string, value?: unknown) {
        // get target contexts
        let targets: Context[];
        if (typeof ContextTypes === 'string') {
            if (ContextTypes !== '*') throw new Error('Only special character * or Context type list is allowed.');
            targets = Context.contexts;
        } else {
            targets = [];
            for (const ContextType of ContextTypes) {
                const context = Context.contexts.find((v) => v instanceof ContextType);
                if (context) targets.push(context);
            }
        }

        // broadcaset message to all targets
        const message: Message = { source: this, action, value };
        for (const target of targets) target.onMessage(message);
    }

    protected setValue(name: string, value: unknown) {
        const keys = name.split('.');
        if (keys.length === 1) {
            GM_setValue(name, value);
            return;
        }

        const realname = keys[0];
        const originalValue = GM_getValue(realname, {});

        const object = set(originalValue, keys.slice(1), value);
        GM_setValue(realname, object);
    }

    protected getValue<T>(name: string, defaultValue?: T): unknown | undefined {
        const keys = name.split('.');
        const value = GM_getValue(keys[0], defaultValue);
        if (keys.length === 1) return value;

        return get(value, keys.slice(1), defaultValue);
    }
}
