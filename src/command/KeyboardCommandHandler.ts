export default abstract class KeyboardCommandHandler {
    abstract handle(document: Document, event: KeyboardEvent): void;
}