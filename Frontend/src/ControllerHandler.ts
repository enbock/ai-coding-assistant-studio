export type PresentDataCallback = () => Promise<void>;

export default interface ControllerHandler {
    initialize(presentData: PresentDataCallback): Promise<void>;
}
