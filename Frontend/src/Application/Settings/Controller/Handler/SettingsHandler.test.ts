import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {createSpy, mock} from '../../../../../test/mock';
import SettingsHandler from './SettingsHandler';
import Adapter from '../Adapter';
import SettingsUseCase from '../../../../Core/Settings/SettingsUseCase/SettingsUseCase';
import SettingsRequest from '../../../../Core/Settings/SettingsUseCase/SettingsRequest';

describe('Application.Settings.Controller.Handler.SettingsHandler', function (): void {
    let handler: SettingsHandler,
        adapter: Mocked<Adapter>,
        settingsUseCase: Mocked<SettingsUseCase>,
        refreshContent: MockFunction<() => Promise<void>>;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        settingsUseCase = mock<SettingsUseCase>();
        refreshContent = createSpy<() => Promise<void>>();

        handler = new SettingsHandler(
            adapter,
            settingsUseCase
        );
    });

    it('should update working directory', async function (): Promise<void> {
        await handler.initialize(refreshContent);
        await adapter.updateWorkingDirectory('test::new-directory');

        const expectedRequest: SettingsRequest = {workingDirectory: 'test::new-directory'};

        assert.strictEqual(settingsUseCase.updateWorkingDirectory.mock.calls.length, 1);
        assert.deepStrictEqual(settingsUseCase.updateWorkingDirectory.mock.calls[0].arguments[0], expectedRequest);
        assert.strictEqual(refreshContent.mock.calls.length, 1);
    });

    it('should initial load the settings', async function (): Promise<void> {
        await handler.initialize(refreshContent);

        assert.strictEqual(settingsUseCase.loadSettings.mock.calls.length, 1);
    });
});


