import NodeMoveRequest from './NodeMoveRequest';
import NodeStorage from '../NodeStorage';
import PositionEntity from '../PositionEntity';

export default class NodeUseCase {
    constructor(
        private nodeStorage: NodeStorage
    ) {
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
