import SettingsHandler from './SettingsHandler';
import Adapter from '../Adapter';
import SettingsUseCase from '../../../../Core/Settings/SettingsUseCase/SettingsUseCase';
import {RefreshContentCallback} from '../../../ControllerHandler';
import SettingsRequest from '../../../../Core/Settings/SettingsUseCase/SettingsRequest';
import createSpy = jasmine.createSpy;

describe('Application.Settings.Controller.Handler.SettingsHandler', function (): void {
    let handler: SettingsHandler,
        adapter: Mocked<Adapter>,
        settingsUseCase: Mocked<SettingsUseCase>,
        refreshContent: RefreshContentCallback;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        settingsUseCase = mock<SettingsUseCase>();
        refreshContent = createSpy();

        handler = new SettingsHandler(
            adapter,
            settingsUseCase
        );
    });

    it('should update working directory', async function (): Promise<void> {
        await handler.initialize(refreshContent);
        await adapter.updateWorkingDirectory('test::new-directory');

        const expectedRequest: SettingsRequest = {workingDirectory: 'test::new-directory'};

        expect(settingsUseCase.updateWorkingDirectory).toHaveBeenCalledWith(expectedRequest);
        expect(refreshContent).toHaveBeenCalled();
    });

    it('should initial load the settings', async function (): Promise<void> {
        await handler.initialize(refreshContent);

        expect(settingsUseCase.loadSettings).toHaveBeenCalled();
    });
});
