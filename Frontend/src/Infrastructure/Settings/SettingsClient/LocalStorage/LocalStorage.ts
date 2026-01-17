import SettingsClient from '../../../../Core/Settings/SettingsClient';
import SettingsEntity from '../../../../Core/Settings/SettingsEntity';

export default class LocalStorage implements SettingsClient {
    private readonly storageKey: string = 'settings';

    public async loadSettings(): Promise<SettingsEntity> {
        const storedData: string | null = window.localStorage.getItem(this.storageKey);
        const settings: SettingsEntity = new SettingsEntity();

        if (storedData) {
            const parsed = JSON.parse(storedData);
            settings.workingDirectory = parsed.workingDirectory;
        }

        return settings;
    }

    public async updateSettings(settings: SettingsEntity): Promise<void> {
        const data = JSON.stringify({
            workingDirectory: settings.workingDirectory
        });
        window.localStorage.setItem(this.storageKey, data);
    }
}
