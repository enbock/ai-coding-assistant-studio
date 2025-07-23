import NodeMoveRequest from './NodeMoveRequest';
import NodeStorage from '../NodeStorage';
import PositionEntity from '../PositionEntity';
import NodeResponse from './NodeResponse';

export default class NodeUseCase {
    constructor(
        private nodeStorage: NodeStorage
    ) {
    }

    public getState(nodeResponse: NodeResponse): void {
        const position: PositionEntity = this.nodeStorage.getPosition();

        nodeResponse.x = position.x;
        nodeResponse.y = position.y;
        nodeResponse.isMoving = this.nodeStorage.getMovementInProgress();
    }

    public startMovement(): void {
        this.nodeStorage.setMovementInProgress(true);
    }

    public stopMovement(): void {
        this.nodeStorage.setMovementInProgress(false);
    }

    public moveNode(request: NodeMoveRequest): void {
        const position: PositionEntity = new PositionEntity();
        position.x = request.x;
        position.y = request.y;

        this.nodeStorage.setPosition(position);
    }
}
