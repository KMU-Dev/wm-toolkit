import Context from './Context';

export default class ContextManager {
    private static instance: ContextManager;

    private readonly contexts: Context[] = [];

    private constructor() {}

    static bind(context: Context): ContextManager {
        const instance = this.instance || (this.instance = new this());
        instance.contexts.push(context);
        return instance;
    }
}
