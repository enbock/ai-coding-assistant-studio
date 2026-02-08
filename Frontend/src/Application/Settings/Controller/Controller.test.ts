import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../test/mock';
import Controller from './Controller';
import ControllerHandler from '../../ControllerHandler';
import {RefreshContentCallback} from '../../ControllerHandler';
import Settings from '../View/Settings';
import DataCollector from './DataCollector';
import SettingsPresenter from '../View/SettingsPresenter';

describe('Application.Settings.Controller.Controller', function (): void {
    let controller: Controller,
        handler: Mocked<ControllerHandler>,
        settingsInstance: Mocked<Settings>,
        dataCollector: Mocked<DataCollector>,
        presenter: Mocked<SettingsPresenter>;

    beforeEach(function (): void {
        settingsInstance = mock<Settings>();
        handler = mock<ControllerHandler>();
        dataCollector = mock<DataCollector>();
        presenter = mock<SettingsPresenter>();

        controller = new Controller(
            [
                handler
            ],
            dataCollector,
            presenter
        );
    });

    it(
        'should initialize the settings controller and create a new model in presenting of data',
        async function (): Promise<void> {
            handler.initialize.and.callFake(
                async function (refreshContent: RefreshContentCallback): Promise<void> {
                    await refreshContent();
                }
            );
            dataCollector.collectData.and.returnValue(<MockedObject>'test::data');
            presenter.present.and.returnValue(<MockedObject>'test::presentedModel');

            settingsInstance.model = <MockedObject>'test::oldModel';

            await controller.initialize();
            controller.setComponent(settingsInstance);

            assert.strictEqual(handler.initialize.mock.calls.length, 1);
            assert.strictEqual(dataCollector.collectData.mock.calls.length, 3);
            assert.strictEqual(presenter.present.mock.calls.length, 3);
            assert.deepStrictEqual(presenter.present.mock.calls[0].arguments[0], <MockedObject>'test::data');
            assert.strictEqual(settingsInstance.model, <MockedObject>'test::presentedModel');
        }
    );
});


