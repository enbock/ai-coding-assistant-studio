import SettingsRequest from './SettingsRequest';
import SettingsResponse from './SettingsResponse';
import SettingsStorage from '../SettingsStorage';
import SettingsClient from '../SettingsClient';
import SettingsEntity from '../SettingsEntity';

export default class SettingsUseCase {
    constructor(
        private settingsStorage: SettingsStorage,
        private settingsClient: SettingsClient
    ) {
    }

    public async loadSettings(): Promise<void> {
        const settings: SettingsEntity = await this.settingsClient.loadSettings();
        this.settingsStorage.setSettings(settings);
    }

    public getSettings(response: SettingsResponse): void {
        const settings: SettingsEntity = this.settingsStorage.getSettings();

        response.workingDirectory = settings.workingDirectory;
    }

    public async updateWorkingDirectory(request: SettingsRequest): Promise<void> {
        const settings: SettingsEntity = this.settingsStorage.getSettings();
        settings.workingDirectory = request.workingDirectory;

        await this.settingsClient.updateSettings(settings);
        this.settingsStorage.setSettings(settings);
    }
}
