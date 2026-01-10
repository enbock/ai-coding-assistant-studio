import NodeDragHandler from './NodeDragHandler';
import Adapter from '../Adapter';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';
import {RefreshContentCallback} from '../../../ControllerHandler';
import ScreenConfig from '../../../ScreenConfig';
import createSpy = jasmine.createSpy;

describe('Application.Workspace.Controller.Handler.NodeDragHandler', function (): void {
    let handler: NodeDragHandler,
        adapter: Mocked<Adapter>,
        nodeUseCase: Mocked<NodeUseCase>,
        presentData: RefreshContentCallback,
        screenConfig: ScreenConfig
    ;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        nodeUseCase = mock<NodeUseCase>();
        presentData = createSpy();
        screenConfig = new ScreenConfig();
        screenConfig.width = 1200;
        screenConfig.height = 800;

        handler = new NodeDragHandler(
            adapter,
            nodeUseCase,
            screenConfig
        );
    });

    it('should start node movement', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.startNodeDrag('test::id');

        expect(nodeUseCase.startMovement).toHaveBeenCalledWith({nodeId: 'test::id'});
        expect(presentData).toHaveBeenCalled();
    });

    it('should stop node movement', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.stopNodeDrag();

        expect(nodeUseCase.stopMovement).toHaveBeenCalled();
        expect(presentData).toHaveBeenCalled();
    });

    it('should move the node', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.dragNode(300, 500);

        expect(nodeUseCase.moveNode).toHaveBeenCalledWith({x: -0.5, y: 0.25});
        expect(presentData).toHaveBeenCalled();
    });
});
