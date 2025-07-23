import NodeUseCase from './NodeUseCase';
import NodeMoveRequest from '../../../Application/Workspace/Controller/Handler/NodeMoveRequest';
import NodeStorage from '../NodeStorage';
import PositionEntity from '../PositionEntity';
import NodeResponse from './NodeResponse';

describe('NodeUseCase', function (): void {
    let nodeStorage: Mocked<NodeStorage>,
        useCase: NodeUseCase;

    beforeEach(function (): void {
        nodeStorage = mock<NodeStorage>();

        useCase = new NodeUseCase(nodeStorage);
    });

    it('should get current state', async function (): Promise<void> {
        const nodeResponse: NodeResponse = {
            x: 0,
            y: 0,
            isMoving: false
        };
        const position: PositionEntity = new PositionEntity();
        position.x = 1;
        position.y = -2;

        nodeStorage.getPosition.and.returnValue(position);
        nodeStorage.getMovementInProgress.and.returnValue(true);

        useCase.getState(nodeResponse);

        expect(nodeResponse.x).toBe(1);
        expect(nodeResponse.y).toBe(-2);
        expect(nodeResponse.isMoving).toBe(true);
    });

    it('should start node movement', function (): void {
        useCase.startMovement();
        expect(nodeStorage.setMovementInProgress).toHaveBeenCalledWith(true);
    });

    it('should stop node movement', function (): void {
        useCase.stopMovement();
        expect(nodeStorage.setMovementInProgress).toHaveBeenCalledWith(false);
    });

    it('should move node to given position', function (): void {
        const request = new NodeMoveRequest();
        request.x = 1;
        request.y = -2;

        useCase.moveNode(request);

        const expectedPosition = new PositionEntity();
        expectedPosition.x = 1;
        expectedPosition.y = -2;
        expect(nodeStorage.setPosition).toHaveBeenCalledWith(expectedPosition);
    });
});
