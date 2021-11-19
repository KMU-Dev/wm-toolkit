import Context from './Context';
import Page from './Page';

export default abstract class Application extends Context {
    private readonly pageRegistry: Map<string, typeof Page> = new Map();

    /**
     * Start the application.
     */
    start() {
        this.onStart();

        // start page correspond to current href
        const pathname = window.location.pathname;
        const PageType = this.pageRegistry.get(pathname);
        if (PageType) {
            this.startPage(PageType, this, window);
            window.addEventListener('unload', () => {
                this.destroyPage(PageType);
            });
        }

        this.onStarted();
    }

    /**
     * Lifecycle callback.
     *
     * You should register page in this function so that Application can start Page based on href.
     */
    protected onStart() {}

    /**
     * Lifecycle callback.
     *
     * This method is fired when Application start process finish.
     */
    protected onStarted() {}

    protected registerPage(PageType: typeof Page, href: string) {
        this.pageRegistry.set(href, PageType);
    }
}
