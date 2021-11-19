import Context from './Context';

export type ContextType<T extends Context = Context> = new (...args: any[]) => T;

export interface Message {
    readonly source: Context;
    readonly action: string;
    readonly value?: unknown;
}
