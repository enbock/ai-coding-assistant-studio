import PositionEntity from './PositionEntity';

export default interface NodeStorage {
    getMovementInProgress(): boolean;

    setMovementInProgress(isMoving: boolean): void;

    getPosition(): PositionEntity;

    setPosition(position: PositionEntity): void;
}
