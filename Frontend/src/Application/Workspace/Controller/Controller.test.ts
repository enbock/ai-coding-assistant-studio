import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import {mock} from '../../../../test/mock';
import Controller from './Controller';
import ControllerHandler from '../../ControllerHandler';
import {RefreshContentCallback} from '../../ControllerHandler';
import Workspace from '../View/Workspace';
import DataCollector from './DataCollector';
import WorkspacePresenter from '../View/WorkspacePresenter';

describe('Application.Workspace.Controller.Controller', function (): void {
    let controller: Controller,
        handler: Mocked<ControllerHandler>,
        workspaceInstance: Mocked<Workspace>,
        dataCollector: Mocked<DataCollector>,
        presenter: Mocked<WorkspacePresenter>
    ;

    beforeEach(function (): void {
        workspaceInstance = mock<Workspace>();
        handler = mock<ControllerHandler>();
        dataCollector = mock<DataCollector>();
        presenter = mock<WorkspacePresenter>();

        controller = new Controller(
            [
                handler
            ],
            dataCollector,
            presenter
        );
    });

    it(
        'should initialize the workspace controller and create a new model in presenting of data',
        async function (): Promise<void> {
            handler.initialize.and.callFake(
                async function (presentData: RefreshContentCallback): Promise<void> {
                    await presentData();
                }
            );
            dataCollector.collectData.and.returnValue(<MockedObject>'test::data');
            presenter.present.and.returnValue(<MockedObject>'test::presentedModel');

            workspaceInstance.model = <MockedObject>'test::oldModel';

            await controller.initialize();
            controller.setComponent(workspaceInstance);

            assert.strictEqual(handler.initialize.mock.calls.length, 1);
            assert.strictEqual(dataCollector.collectData.mock.calls.length, 2);
            assert.strictEqual(presenter.present.mock.calls.length, 2);
            assert.deepStrictEqual(presenter.present.mock.calls[0].arguments[0], <MockedObject>'test::data');
            assert.strictEqual(workspaceInstance.model, <MockedObject>'test::presentedModel');
        }
    );
});


