import Memory from './Memory';
import SettingsEntity from '../../../../Core/Settings/SettingsEntity';

describe('Infrastructure.Settings.SettingsStorage.Memory.Memory', function (): void {
    let memory: Memory;

    beforeEach(function (): void {
        memory = new Memory();
    });

    it('should return default settings', function (): void {
        const settings: SettingsEntity = memory.getSettings();

        expect(settings.workingDirectory).toBe('');
    });

    it('should set and get settings', function (): void {
        const settings: SettingsEntity = new SettingsEntity();
        settings.workingDirectory = 'test::workingDirectory';

        memory.setSettings(settings);

        expect(memory.getSettings()).toBe(settings);
    });
});
