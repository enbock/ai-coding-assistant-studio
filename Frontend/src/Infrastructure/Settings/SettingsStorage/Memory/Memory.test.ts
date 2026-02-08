import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import Memory from './Memory';
import SettingsEntity from '../../../../Core/Settings/SettingsEntity';

describe('Infrastructure.Settings.SettingsStorage.Memory.Memory', function (): void {
    let memory: Memory;

    beforeEach(function (): void {
        memory = new Memory();
    });

    it('should return default settings', function (): void {
        const settings: SettingsEntity = memory.getSettings();

        assert.strictEqual(settings.workingDirectory, '');
    });

    it('should set and get settings', function (): void {
        const settings: SettingsEntity = new SettingsEntity();
        settings.workingDirectory = 'test::workingDirectory';

        memory.setSettings(settings);

        assert.strictEqual(memory.getSettings(), settings);
    });
});


