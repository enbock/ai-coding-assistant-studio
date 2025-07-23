import NodeStorage from '../../../../Core/Node/NodeStorage';
import PositionEntity from '../../../../Core/Node/PositionEntity';

export default class Memory implements NodeStorage {
    private isMoving: boolean = false;
    private position: PositionEntity = new PositionEntity();

    public getMovementInProgress(): boolean {
        return this.isMoving;
    }

    public setMovementInProgress(isMoving: boolean): void {
        this.isMoving = isMoving;
    }

    public getPosition(): PositionEntity {
        return this.position;
    }

    public setPosition(position: PositionEntity): void {
        this.position = position;
    }
}
