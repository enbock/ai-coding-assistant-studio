import SettingsStorage from '../../../../Core/Settings/SettingsStorage';
import SettingsEntity from '../../../../Core/Settings/SettingsEntity';

export default class Memory implements SettingsStorage {
    private settings: SettingsEntity = new SettingsEntity();

    public getSettings(): SettingsEntity {
        return this.settings;
    }

    public setSettings(settings: SettingsEntity): void {
        this.settings = settings;
    }
}
