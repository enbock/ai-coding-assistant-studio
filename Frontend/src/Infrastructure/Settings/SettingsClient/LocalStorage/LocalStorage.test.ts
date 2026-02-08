import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../../test/mock';
import LocalStorage from './LocalStorage';
import SettingsEntity from '../../../../Core/Settings/SettingsEntity';

describe('Infrastructure.Settings.SettingsClient.LocalStorage.LocalStorage', function (): void {
    let localStorage: LocalStorage,
        mockStorage: { [key: string]: string },
        mockLocalStorage: Mocked<Storage>;

    beforeEach(function (): void {
        mockStorage = {};

        mockLocalStorage = mock<Storage>();
        mockLocalStorage.getItem.and.callFake(function (key: string): string | null {
            return mockStorage[key] || null;
        });
        mockLocalStorage.setItem.and.callFake(function (key: string, value: string): void {
            mockStorage[key] = value;
        });

        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true,
            configurable: true
        });

        localStorage = new LocalStorage();
    });

    it('should load default settings when storage is empty', async function (): Promise<void> {
        const settings: SettingsEntity = await localStorage.loadSettings();

        assert.strictEqual(settings.workingDirectory, '');
        assert.strictEqual(mockLocalStorage.getItem.mock.calls.length, 1);
        assert.strictEqual(mockLocalStorage.getItem.mock.calls[0].arguments[0], 'settings');
    });

    it('should load settings from storage', async function (): Promise<void> {
        mockStorage['settings'] = JSON.stringify({
            workingDirectory: 'test::workingDirectory'
        });

        const settings: SettingsEntity = await localStorage.loadSettings();

        assert.strictEqual(settings.workingDirectory, 'test::workingDirectory');
    });

    it('should update settings in storage', async function (): Promise<void> {
        const settings: SettingsEntity = new SettingsEntity();
        settings.workingDirectory = 'test::workingDirectory';

        await localStorage.updateSettings(settings);

        assert.strictEqual(mockLocalStorage.setItem.mock.calls.length, 1);
        assert.strictEqual(mockLocalStorage.setItem.mock.calls[0].arguments[0], 'settings');
        assert.strictEqual(
            mockLocalStorage.setItem.mock.calls[0].arguments[1],
            JSON.stringify({workingDirectory: 'test::workingDirectory'})
        );
    });
});


