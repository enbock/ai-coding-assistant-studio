import NodeHandler from './NodeHandler';
import Adapter from '../Adapter';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';
import {RefreshContentCallback} from '../../../ControllerHandler';
import createSpy = jasmine.createSpy;

describe('Application.Workspace.Controller.Handler.NodeHandler', function (): void {
    let adapter: Mocked<Adapter>,
        nodeUseCase: Mocked<NodeUseCase>,
        presentData: RefreshContentCallback,
        handler: NodeHandler;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        nodeUseCase = mock<NodeUseCase>();
        presentData = createSpy();

        handler = new NodeHandler(adapter, nodeUseCase);
    });

    it('should handle of adding node', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.addNode();

        expect(nodeUseCase.addNode).toHaveBeenCalled();
        expect(presentData).toHaveBeenCalled();
    });
});
