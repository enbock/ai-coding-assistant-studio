import SettingsEntity from './SettingsEntity';

export default interface SettingsClient {
    loadSettings(): Promise<SettingsEntity>;

    updateSettings(settings: SettingsEntity): Promise<void>;
}
