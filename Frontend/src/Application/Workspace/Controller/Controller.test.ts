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

            expect(handler.initialize).toHaveBeenCalled();
            expect(dataCollector.collectData).toHaveBeenCalled();
            expect(presenter.present).toHaveBeenCalledWith(<MockedObject>'test::data');
            expect(presenter.present).toHaveBeenCalledTimes(2);
            expect(workspaceInstance.model).toEqual(<MockedObject>'test::presentedModel');
        }
    );
});
