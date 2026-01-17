import DataCollector from './DataCollector';
import SettingsUseCase from '../../../Core/Settings/SettingsUseCase/SettingsUseCase';
import ResponseCollection from './ResponseCollection';
import SettingsResponse from '../../../Core/Settings/SettingsUseCase/SettingsResponse';

describe('Application.Settings.Controller.DataCollector', function (): void {
    let dataCollector: DataCollector,
        settingsUseCase: Mocked<SettingsUseCase>;

    beforeEach(function (): void {
        settingsUseCase = mock<SettingsUseCase>();

        dataCollector = new DataCollector(settingsUseCase);
    });

    it('should collect settings data', function (): void {
        settingsUseCase.getSettings.and.callFake(function (response: SettingsResponse): void {
            response.workingDirectory = 'test::working-directory';
        });

        const result: ResponseCollection = dataCollector.collectData();

        expect(settingsUseCase.getSettings).toHaveBeenCalled();
        expect(result.workingDirectory).toBe('test::working-directory');
    });
});
