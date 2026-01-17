import LocalStorage from './LocalStorage';
import SettingsEntity from '../../../../Core/Settings/SettingsEntity';

describe('Infrastructure.Settings.SettingsClient.LocalStorage.LocalStorage', function (): void {
    let localStorage: LocalStorage,
        mockStorage: { [key: string]: string },
        mockLocalStorage: Storage;

    beforeEach(function (): void {
        mockStorage = {};

        mockLocalStorage = <Storage>{
            getItem: function (key: string): string | null {
                return mockStorage[key] || null;
            },
            setItem: function (key: string, value: string): void {
                mockStorage[key] = value;
            }
        };

        spyOn(mockLocalStorage, 'getItem').and.callThrough();
        spyOn(mockLocalStorage, 'setItem').and.callThrough();

        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true,
            configurable: true
        });

        localStorage = new LocalStorage();
    });

    it('should load default settings when storage is empty', async function (): Promise<void> {
        const settings: SettingsEntity = await localStorage.loadSettings();

        expect(settings.workingDirectory).toBe('');
        expect(mockLocalStorage.getItem).toHaveBeenCalledWith('settings');
    });

    it('should load settings from storage', async function (): Promise<void> {
        mockStorage['settings'] = JSON.stringify({
            workingDirectory: 'test::workingDirectory'
        });

        const settings: SettingsEntity = await localStorage.loadSettings();

        expect(settings.workingDirectory).toBe('test::workingDirectory');
    });

    it('should update settings in storage', async function (): Promise<void> {
        const settings: SettingsEntity = new SettingsEntity();
        settings.workingDirectory = 'test::workingDirectory';

        await localStorage.updateSettings(settings);

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            'settings',
            JSON.stringify({workingDirectory: 'test::workingDirectory'})
        );
    });
});
