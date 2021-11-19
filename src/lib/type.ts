import Context from './Context';

export type ContextType<T extends Context = Context> = new (...args: any[]) => T;
