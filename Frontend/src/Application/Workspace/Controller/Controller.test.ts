import Controller from './Controller';
import ControllerHandler from '../../../ControllerHandler';
import {PresentDataCallback} from '../../../ControllerHandler';
import Workspace from '../View/Workspace';
import WorkspaceModel from '../View/WorkspaceModel';

describe('Controller', function (): void {
    let controller: Controller,
        handler: Mocked<ControllerHandler>,
        workspaceInstance: Mocked<Workspace>
    ;

    beforeEach(function (): void {
        workspaceInstance = mock<Workspace>();
        handler = mock<ControllerHandler>();

        controller = new Controller(
            [
                handler
            ]
        );

        controller.setComponent(workspaceInstance);
    });

    it(
        'should initialize the workspace controller and create a new model in presenting of data',
        async function (): Promise<void> {
            handler.initialize.and.callFake(
                async function (presentData: PresentDataCallback): Promise<void> {
                    await presentData();
                }
            );

            workspaceInstance.model = <MockedObject>'test::oldModel';

            await controller.initialize();

            expect(handler.initialize).toHaveBeenCalled();

            const expectModel = new WorkspaceModel();
            expect(workspaceInstance.model).toEqual(expectModel);
        }
    );
});
