export type RefreshContentCallback = () => Promise<void>;

export default interface ControllerHandler {
    initialize(refreshContent: RefreshContentCallback): Promise<void>;
}
