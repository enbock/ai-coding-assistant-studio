import ScreenConfigHandler from './ScreenConfigHandler';
import ScreenConfig from '../../../ScreenConfig';

describe('ScreenConfigHandler', function (): void {
    let handler: ScreenConfigHandler,
        window: Mocked<any>,
        screenConfig: ScreenConfig
    ;

    beforeEach(function (): void {
        window = mock<Window>();
        screenConfig = new ScreenConfig();

        handler = new ScreenConfigHandler(
            screenConfig,
            window
        );
    });

    it('should copy the window dimension to the configuration share object', async function (): Promise<void> {
        window.innerWidth = 1200;
        window.innerHeight = 800;

        await handler.initialize();

        expect(screenConfig.width).toBe(1200);
        expect(screenConfig.height).toBe(800);
    });
});
