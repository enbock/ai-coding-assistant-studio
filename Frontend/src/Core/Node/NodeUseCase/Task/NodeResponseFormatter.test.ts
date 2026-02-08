import {beforeEach, describe, it} from 'node:test';
import assert from 'node:assert';
import NodeResponseFormatter from './NodeResponseFormatter';
import NodeEntity, {NodeId} from '../../NodeEntity';
import {NodeItem} from '../NodeResponse';

describe('Core.Node.NodeUseCase.Task.NodeResponseFormatter', function (): void {
    let formatter: NodeResponseFormatter;

    beforeEach(function (): void {
        formatter = new NodeResponseFormatter();
    });

    it('should format a list of positions and mark the moving node', function (): void {
        const node1: NodeEntity = new NodeEntity();
        node1.id = <NodeId>'test::node-1';
        node1.x = 10;
        node1.y = 20;
        const node2: NodeEntity = new NodeEntity();
        node2.id = <NodeId>'test::node-2';
        node2.x = 30;
        node2.y = 40;
        const nodes: Array<NodeEntity> = [node1, node2];
        const idOfMovingNode: NodeId = <NodeId>'test::node-2';

        const result: Array<NodeItem> = formatter.formatPositions(nodes, idOfMovingNode);

        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0].x, 10);
        assert.strictEqual(result[0].y, 20);
        assert.strictEqual(result[0].isMoving, false);
        assert.strictEqual(result[1].x, 30);
        assert.strictEqual(result[1].y, 40);
        assert.strictEqual(result[1].isMoving, true);
    });

    it('should set isMoving to false if no node is moving', function (): void {
        const node: NodeEntity = new NodeEntity();
        node.id = <NodeId>'test::node-1';
        node.x = 5;
        node.y = 15;
        const result: Array<NodeItem> = formatter.formatPositions([node], <NodeId>'');
        assert.strictEqual(result[0].isMoving, false);
    });
});
