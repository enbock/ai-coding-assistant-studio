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

        expect(result.length).toBe(2);
        expect(result[0].x).toBe(10);
        expect(result[0].y).toBe(20);
        expect(result[0].isMoving).toBe(false);
        expect(result[1].x).toBe(30);
        expect(result[1].y).toBe(40);
        expect(result[1].isMoving).toBe(true);
    });

    it('should set isMoving to false if no node is moving', function (): void {
        const node: NodeEntity = new NodeEntity();
        node.id = <NodeId>'test::node-1';
        node.x = 5;
        node.y = 15;
        const result: Array<NodeItem> = formatter.formatPositions([node], <NodeId>'');
        expect(result[0].isMoving).toBe(false);
    });
});
