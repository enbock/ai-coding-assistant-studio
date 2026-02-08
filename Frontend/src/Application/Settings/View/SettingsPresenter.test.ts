import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import ResponseCollection from '../Controller/ResponseCollection';
import SettingsModel from './SettingsModel';
import SettingsPresenter from './SettingsPresenter';

describe('Application.Settings.View.SettingsPresenter', function (): void {
    let presenter: SettingsPresenter;

    beforeEach(function (): void {
        presenter = new SettingsPresenter();
    });

    it('should create a SettingsModel from response data', function (): void {
        const data: ResponseCollection = new ResponseCollection();
        data.workingDirectory = 'test::working-directory';

        const result: SettingsModel = presenter.present(data);

        assert.strictEqual(result.workingDirectory, 'test::working-directory');
    });
});
