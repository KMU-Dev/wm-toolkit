import Context from './Context';
import Frame from './Frame';

export default abstract class AbstractWindow extends Context {
    protected readonly window: Window;
    protected readonly document: Document;
    protected readonly location: Location;

    private readonly frameRegistry: Map<HTMLFrameElement, Map<string, typeof Frame>> = new Map();

    private frames?: HTMLFrameElement[];
    private iframes?: HTMLIFrameElement[];

    constructor(parent: Context, windowRef: Window) {
        super(parent);

        this.window = windowRef;
        this.document = this.window.document;
        this.location = this.window.location;

        // listen DOM events
        if (this.document.readyState === 'loading') {
            this.window.addEventListener('DOMContentLoaded', () => {
                this.handleDOMContentLoaded();
            });
        } else if (this.document.readyState === 'complete') {
            // we cannot catch frame DOMContentLoaded and load event.
            // If readayState is complete, just fired both life cycle callback.
            this.handleDOMContentLoaded();
            this.handleLoad();
        } else {
            this.handleDOMContentLoaded();
        }

        this.window.addEventListener('load', () => {
            this.handleLoad();
        });
        this.window.addEventListener('beforeunload', () => {
            this.handleBeforeUnload();
        });
        this.window.addEventListener('unload', () => {
            this.handleUnload();
        });
    }

    /**
     * Lifecycle callback
     */
    protected onDOMContentLoaded() {}

    /**
     * Lifecycle callback
     */
    protected onLoad() {}

    /**
     * Lifecycle callback
     */
    protected beforeUnload() {}

    /**
     * Lifecycle callback
     */
    protected onUnload() {}

    protected registerFrame(FrameType: typeof Frame, frame: HTMLFrameElement, href: string) {
        let innerMap = this.frameRegistry.get(frame);
        if (!innerMap) {
            innerMap = new Map();
            this.frameRegistry.set(frame, innerMap);
        }

        innerMap.set(href, FrameType);
    }

    protected getFrameById(id: string) {
        return this.frames?.find((frame) => frame.id === id);
    }

    protected getIFrameById(id: string) {
        return this.iframes?.find((iframe) => iframe.id === id);
    }

    private handleDOMContentLoaded() {
        // get all frame like element and listen to their attribute change
        this.frames = Array.from(this.document.querySelectorAll('frame'));
        this.iframes = Array.from(this.document.querySelectorAll('iframe'));

        this.onDOMContentLoaded();

        for (const frame of this.frames) {
            // listen frame load event
            const innerMap = this.frameRegistry.get(frame);
            frame.onload = () => {
                const pathname = frame.contentWindow?.location.pathname;

                if (innerMap && pathname) {
                    // start frame if frame has been registered with corresponding element and href
                    const FrameType = innerMap.get(pathname);
                    if (FrameType) {
                        const frameWindow = frame.contentWindow;
                        this.startFrame(FrameType, this, frameWindow);

                        // listen frame window unload event to destroy frame
                        frameWindow.addEventListener('unload', () => {
                            this.destroyContext(FrameType);
                        });
                    }
                }
            };
        }
    }

    private handleLoad() {
        this.onLoad();
    }

    private handleBeforeUnload() {
        this.beforeUnload();
    }

    private handleUnload() {
        this.onUnload();
    }
}
