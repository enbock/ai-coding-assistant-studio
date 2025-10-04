import Memory from './Memory';
import PositionEntity from '../../../../Core/Node/PositionEntity';

describe('Infrastructure.Node.NodeStorage.Memory.Memory', function (): void {
    let memory: Memory;

    beforeEach(function (): void {
        memory = new Memory();
    });

    it('should return false for movement in progress by default', function (): void {
        expect(memory.getMovementInProgress()).toBe(false);
    });

    it('should set movement in progress', function (): void {
        memory.setMovementInProgress(true);

        expect(memory.getMovementInProgress()).toBe(true);
    });

    it('should return default position', function (): void {
        expect(memory.getPosition()).toEqual(new PositionEntity());
    });

    it('should set position', function (): void {
        const position = new PositionEntity();
        position.x = 1;
        position.y = 2;

        memory.setPosition(position);

        expect(memory.getPosition()).toEqual(position);
    });
});
