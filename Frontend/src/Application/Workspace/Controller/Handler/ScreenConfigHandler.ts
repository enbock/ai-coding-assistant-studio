import ControllerHandler from '../../../ControllerHandler';
import ScreenConfig from '../../../ScreenConfig';

export default class ScreenConfigHandler implements ControllerHandler {
    constructor(
        private screenConfig: ScreenConfig,
        private window: Window
    ) {
    }

    async initialize(): Promise<void> {
        this.screenConfig.width = this.window.innerWidth;
        this.screenConfig.height = this.window.innerHeight;
    }
}
