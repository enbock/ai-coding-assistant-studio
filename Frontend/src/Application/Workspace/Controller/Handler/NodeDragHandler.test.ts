import NodeDragHandler from './NodeDragHandler';
import Adapter from '../Adapter';
import NodeUseCase from '../../../../Core/Node/NodeUseCase/NodeUseCase';
import {PresentDataCallback} from '../../../../ControllerHandler';
import NodeMoveRequest from './NodeMoveRequest';
import createSpy = jasmine.createSpy;

describe('NodeDragHandler', function (): void {
    let handler: NodeDragHandler,
        adapter: Mocked<Adapter>,
        nodeUseCase: Mocked<NodeUseCase>,
        presentData: PresentDataCallback
    ;

    beforeEach(function (): void {
        adapter = mock<Adapter>();
        nodeUseCase = mock<NodeUseCase>();
        presentData = createSpy();

        handler = new NodeDragHandler(
            adapter,
            nodeUseCase
        );
    });

    it('should start node movement', async function (): Promise<void> {
        await handler.initialize(presentData);
        adapter.startNodeDrag();

        expect(nodeUseCase.startMovement).toHaveBeenCalled();
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
        adapter.dragNode(1, 2);

        const expectedRequest = new NodeMoveRequest();
        expectedRequest.x = 1;
        expectedRequest.y = 2;
        expect(nodeUseCase.moveNode).toHaveBeenCalledWith(expectedRequest);
        expect(presentData).toHaveBeenCalled();
    });
});
