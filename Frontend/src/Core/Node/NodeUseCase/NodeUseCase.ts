import NodeMoveRequest from './NodeMoveRequest';
import NodeStorage from '../NodeStorage';
import PositionEntity from '../PositionEntity';
import NodeResponse from './NodeResponse';

export default class NodeUseCase {
    constructor(
        private nodeStorage: NodeStorage
    ) {
    }

    public getState(): NodeResponse {
        const position: PositionEntity = this.nodeStorage.getPosition();
        const response: NodeResponse = new NodeResponse();

        response.x = position.x;
        response.y = position.y;
        response.isMoving = this.nodeStorage.getMovementInProgress();

        return response;
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
