import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../test/mock';
import SettingsUseCase from './SettingsUseCase';
import SettingsStorage from '../SettingsStorage';
import SettingsClient from '../SettingsClient';
import SettingsEntity from '../SettingsEntity';
import SettingsResponse from './SettingsResponse';
import SettingsRequest from './SettingsRequest';

describe('Core.Settings.SettingsUseCase.SettingsUseCase', function (): void {
    let settingsStorage: Mocked<SettingsStorage>,
        settingsClient: Mocked<SettingsClient>,
        useCase: SettingsUseCase;

    beforeEach(function (): void {
        settingsStorage = mock<SettingsStorage>();
        settingsClient = mock<SettingsClient>();

        useCase = new SettingsUseCase(settingsStorage, settingsClient);
    });

    it('should load settings from client and store them', async function (): Promise<void> {
        const settings: SettingsEntity = new SettingsEntity();
        settings.workingDirectory = 'test::workingDirectory';

        settingsClient.loadSettings.and.returnValue(Promise.resolve(settings));

        await useCase.loadSettings();

        assert.strictEqual(settingsClient.loadSettings.mock.calls.length, 1);
        assert.strictEqual(settingsStorage.setSettings.mock.calls.length, 1);
        assert.deepStrictEqual(settingsStorage.setSettings.mock.calls[0].arguments[0], settings);
    });

    it('should get current settings', function (): void {
        const settings: SettingsEntity = new SettingsEntity();
        settings.workingDirectory = 'test::working-directory';

        settingsStorage.getSettings.and.returnValue(settings);

        const response: SettingsResponse = new SettingsResponse();
        useCase.getSettings(response);

        assert.strictEqual(response.workingDirectory, 'test::working-directory');
    });

    it('should update working directory', async function (): Promise<void> {
        const settings: SettingsEntity = new SettingsEntity();
        settings.workingDirectory = 'test::oldDirectory';
        const request: SettingsRequest = {
            workingDirectory: 'test::new-directory'
        };

        settingsStorage.getSettings.and.returnValue(settings);
        settingsClient.updateSettings.and.returnValue(Promise.resolve());

        await useCase.updateWorkingDirectory(request);

        assert.strictEqual(settingsStorage.getSettings.mock.calls.length, 1);
        assert.strictEqual(settings.workingDirectory, 'test::new-directory');
        assert.strictEqual(settingsClient.updateSettings.mock.calls.length, 1);
        assert.deepStrictEqual(settingsClient.updateSettings.mock.calls[0].arguments[0], settings);
        assert.strictEqual(settingsStorage.setSettings.mock.calls.length, 1);
        assert.deepStrictEqual(settingsStorage.setSettings.mock.calls[0].arguments[0], settings);
    });
});


