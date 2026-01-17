import SettingsEntity from './SettingsEntity';

export default interface SettingsStorage {
    getSettings(): SettingsEntity;

    setSettings(settings: SettingsEntity): void;
}
