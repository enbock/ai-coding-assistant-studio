import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import Memory from './Memory';
import NodeEntity from '../../../../Core/Node/NodeEntity';

describe('Infrastructure.Node.NodeStorage.Memory.Memory', function (): void {
    let memory: Memory;

    beforeEach(function (): void {
        memory = new Memory();
    });

    it('should return default for moving node', function (): void {
        assert.strictEqual(memory.getMovedNodeId(), '');
    });

    it('should set node movement in progress', function (): void {
        memory.setMovedNodeId('test::id');

        assert.strictEqual(memory.getMovedNodeId(), 'test::id');
    });

    it('should get nodes', function (): void {
        assert.deepStrictEqual(memory.getNodes(), []);
    });

    it('should set nodes', function (): void {
        const node: NodeEntity = new NodeEntity();
        node.id = 'test::id';
        node.x = 1;
        node.y = 2;
        memory.setNodes([node]);
        assert.deepStrictEqual(memory.getNodes(), [node]);
    });
});
