import Memory from './Memory';
import NodeEntity from '../../../../Core/Node/NodeEntity';

describe('Infrastructure.Node.NodeStorage.Memory.Memory', function (): void {
    let memory: Memory;

    beforeEach(function (): void {
        memory = new Memory();
    });

    it('should return default for moving node', function (): void {
        expect(memory.getMovedNodeId()).toBe('');
    });

    it('should set node movement in progress', function (): void {
        memory.setMovedNodeId('test::id');

        expect(memory.getMovedNodeId()).toBe('test::id');
    });

    it('should get nodes', function (): void {
        expect(memory.getNodes()).toEqual([]);
    });

    it('should set nodes', function (): void {
        const node: NodeEntity = new NodeEntity();
        node.id = 'test::id';
        node.x = 1;
        node.y = 2;
        memory.setNodes([node]);
        expect(memory.getNodes()).toEqual([node]);
    });
});
