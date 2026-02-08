import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../../test/mock';
import ScreenConfigHandler from './ScreenConfigHandler';
import ScreenConfig from '../../../ScreenConfig';

describe('Application.Workspace.Controller.Handler.ScreenConfigHandler', function (): void {
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

        assert.strictEqual(screenConfig.width, 1200);
        assert.strictEqual(screenConfig.height, 800);
    });
});
